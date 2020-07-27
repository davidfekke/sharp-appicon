const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
//const cluster  = require('cluster');
const ProgressBar = require('progress');
const getfilelist = require('./getfilelist');

const contents = require(path.join(__dirname, '../Contents.json'));
const filelist = getfilelist();

/**
 * @param {Type}
 * @return {Type}
 */
module.exports = function(source) {
    const filepath = path.join(__dirname, source);
    const contentFile = path.join(__dirname, '../Contents.json');
    const androidPath = path.join(__dirname, '../android.json');
    const workingdir = process.cwd();
    const androidArray = require(androidPath);

    for (let i = 0; i < androidArray.length; i++) {
        const filename = androidArray[i].filename;
        createDirectoryTree(filename);
    }

    // let bar = new ProgressBar('Processing images [:bar] :rate/bps :percent :etas', {
    //     total: filelist.length,
    //     complete: '=',
    //     incomplete: ' ',
    //     width: 20,
    // });

    fs.mkdir('Icons', () => {
        fs.mkdir('Icons/AppIcon.appiconset', () => {
            fs.createReadStream(contentFile).pipe(fs.createWriteStream('Icons/AppIcon.appiconset/Contents.json'));
            for (var i = 0; i < filelist.length; i++) {
                const count = i + 1;
                const width = filelist[count - 1].size.split('x')[0];
                const scale = filelist[count - 1].scale.charAt(0);
                const scaledSize = width * scale;
                //bar.tick(i - 1);
                const filepath = path.join(workingdir, '/' + filelist[count - 1].filename);
                resizeAndSaveIcon(source, filepath, scaledSize);    
            }
        });
    });
    return true;
}

function resizeAndSaveIcon(filename, name, size) {
    sharp(filename)
        .resize(size)
        .toFile(name, (err, info) => {
            if (err) console.error(err);
        });
}

function createDirectoryTree(path) {
    const dirs = path.split('/');
    var currentPath = '.';
    const dirsArray = dirs.splice(0, dirs.length - 1);
    for (let i = 0; i < dirsArray.length; i++) {
        const directory = dirsArray[i]; 
        currentPath = currentPath + '/' + directory;
        //console.log(`Current directory: ${currentPath}`);
        checkDirectory(currentPath, errorHdl);
    }
}

function errorHdl(err) {
    //console.log('errorHdl:');
    //console.error(err);
}

function checkDirectory(directory, callback) {
    const myPath = directory + '/';
    if (!fs.existsSync(myPath)) {
        fs.mkdirSync(directory); // , callback
        //console.log(`Creating directory ${directory}`);
    }
    // fs.stat(myPath, function(err, stats) {
    //     if (err && err.errno === -2) {
    //         fs.mkdir(directory, callback);
    //     } else {
    //         if (err !== null) {
    //             callback(err);
    //         }
    //     }
    // });
}