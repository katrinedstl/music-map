import * as u from './utilities.js';
import { audio } from './audio_context.js';

// Generate audio for user
export class AudioGenerator {
    constructor(userId, voice, localUserPos, externalUserPos) {
        this.userId = userId;
        this.voice = voice;
        this.localUserPos = localUserPos;
        this.externalUserPos = externalUserPos;
        this.proceed = true;
    }

    // Set "pitch", how fast the sound is played, based on distance between users
    getPlaybackRate() {
        const dist = u.distance(this.externalUserPos.lng, 
                                this.externalUserPos.lat, 
                                this.localUserPos.lng, 
                                this.localUserPos.lat);

        if(dist > 0.1) return 0.1;

        return u.scaleBetween(dist, 1.9, 0.1, 0, 0.1);
    }

    playSound(randomSoundBuffer) {
        const sound = audio.context.createBufferSource();
        sound.buffer = randomSoundBuffer;
        sound.playbackRate.value = this.getPlaybackRate();
        
        sound.connect(audio.context.destination);

        sound.start(0);
        sound._playing = true;

        return sound;
    }

    updateSound(localUserPos, externalUserPos) {
        this.localUserPos = localUserPos;
        this.externalUserPos = externalUserPos;
    }

    play() {
        if(this.proceed) {
            const randomSoundBuffer = u.randomItem(audio[this.voice].buffer);

            this.playSound(randomSoundBuffer).onended = (function() {
                this.play();
            }).bind(this);
        }
    }

    stop() {
        this.proceed = false;
    }

}