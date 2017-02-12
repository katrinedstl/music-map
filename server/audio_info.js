// Generate an object to read audio-information from
class AudioInfoGenerator {

    // Loop through files to find folder name and file path
    readFiles() {
    	const audiofiles = {};

        const fs = require('fs');
        const startfolder = './public/assets/audio/';
        const folders = fs.readdirSync(startfolder);

        folders.forEach(folder => {
        	let subfolder = startfolder + folder;

        	audiofiles[folder] = {
        		name: folder,
        		files: []
        	}

        	const files = fs.readdirSync(subfolder);
            
            files.forEach(file => {
            	audiofiles[folder].files.push('/assets/audio/' + folder + '/' + file);
            });
        });

        return audiofiles;
    }

    generateInfo() {
        return this.readFiles();
    }
}


module.exports = new AudioInfoGenerator();