import { Howl } from "howler";

function loadSound(url: string, options = {}): Howl {
    return new Howl($.extend(options, {
        src: [url]
    }));
}

class Clips {
    bobadlelelele = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/bobadlelelele.mp3')
    imBatman = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/im-batman.mp3')
    questionMark = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/question-mark.mp3')
    wrong = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/wrong.mp3')
    found = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/found.wav')
    spyMusic = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/spy-music.mp3', {
        loop: true,
        volume: 0.1,
    })
}

const clips = new Clips();

class AudioManager {
    public play(clip: keyof Clips) {
        if (clips[clip]) {
            clips[clip].play();
        }
    }
}

export const audio = new AudioManager();
