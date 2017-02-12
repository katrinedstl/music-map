// Keep loaded audio-files in a single object
export const audio = {
    source_loop: {},
    sample: undefined,
};

function isSamplePlaying(callback) {
    if(audio.sample && audio.sample._playing) {
        audio.sample.stop(0);
        audio.sample._playing = false;
    }

    callback();
}

export function playSample(voice) {
    isSamplePlaying(function() {
        audio.sample = audio.context.createBufferSource();
        audio.sample.buffer = audio[voice].buffer[0];
        
        audio.sample.connect(audio.context.destination);

        audio.sample.start(0);
        audio.sample._playing = true;
    });
}

// Initialize audio context when app starts
export function initAudioContext(data) {

    // Check if Web Audio API is available
    const contextClass = (window.AudioContext || 
        window.webkitAudioContext || 
        window.mozAudioContext || 
        window.oAudioContext || 
        window.msAudioContext);

    if (contextClass) {
        // Web Audio API is available, create context
        audio.context = new contextClass();

        loadAudioFiles(data);
    } else {
        alert('AudioContext not supported.');
    }
}

// Loop through every object in data, and make on bufferstream for every voice
function loadAudioFiles(data) {
    for(let voice in data) {
        audio[voice] = {
            buffer: [],
        };

        for(let a in data[voice].files) {
            const i = parseInt(a);

            const req = new XMLHttpRequest();
            req.open('GET', data[voice].files[i], true);
            req.responseType = 'arraybuffer';

            req.onload = function() {
                audio.context.decodeAudioData(
                    req.response,
                    function(buffer) {
                        audio[voice].buffer[i] = buffer;
                    },
                    function() {
                        console.log('Error decoding audio "' + data[voice].files[i] + '".');
                    }
                );
            };
            req.send();
        }
    }
}