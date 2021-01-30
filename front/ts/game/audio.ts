import { Howl } from "howler";
import { randomArray } from "../../../common/helpers/object";

function loadSound(url: string, options = {}): Howl {
    return new Howl($.extend(options, {
        src: [url]
    }));
}

class Clips {
    bobadlelelele = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/bobadlelelele.mp3')
    batman = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/im-batman.mp3')
    questionMark = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/question-mark.mp3')
    wrong = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/wrong.mp3')
    found = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/found.wav')
    moo = [
        loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/moo-1.mp3'),
        loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/moo-2.mp3'),
        loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/moo-3.mp3'),
        loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/moo-4.mp3'),
        loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/moo-5.mp3'),
        loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/moo-6.mp3'),
        loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/moo-7.mp3'),
        loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/moo-8.mp3'),
    ]
    spyMusic = loadSound('http://192.168.1.9:81/per/ispy/front/public/audio/spy-music.mp3', {
        loop: true,
        volume: 0.1,
    })
}

const clips = new Clips();

class AudioManager {
    public play(clip: keyof Clips) {
        console.log('Play sound', clip, clips[clip])
        if (clips[clip]) {
            if (Array.isArray(clips[clip])) {
                console.log('Play sound', clip, clips[clip], randomArray(clips[clip] as Howl[]))
                randomArray(clips[clip] as Howl[]).play();
            } else {
                (clips[clip] as Howl).play();
            }
        }
    }
}

export const audio = new AudioManager();
