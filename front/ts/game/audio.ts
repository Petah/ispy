import { Howl } from "howler";

class Clips {
    bobadlelelele = new Howl({
        src: ['http://192.168.1.9:81/per/ispy/front/public/audio/bobadlelelele.mp3']
    });
}

const clips = new Clips();

class AudioManager {
    public play(clip: keyof Clips) {
        clips[clip].play();
    }
}

export const audio = new AudioManager();
