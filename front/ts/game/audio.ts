import { Howl } from "howler";
import { randomArray } from "../../../common/helpers/object";

function loadSound(url: string, options = {}): Howl {
    return new Howl($.extend(options, {
        src: [url]
    }));
}

class Clips {
    bobadlelelele = loadSound('/audio/bobadlelelele.mp3')
    batman = loadSound('/audio/im-batman.mp3')
    ironman = loadSound('/audio/ironman.mp3')
    thor = loadSound('/audio/thor.mp3')
    pikachu = loadSound('/audio/pikachu.mp3')
    bulbasaur = loadSound('/audio/bulbasaur.mp3')
    hulk = loadSound('/audio/hulk.mp3')
    questionMark = loadSound('/audio/question-mark.mp3')
    wrong = loadSound('/audio/wrong.mp3')
    found = loadSound('/audio/found.wav')
    moo = [
        loadSound('/audio/moo-1.mp3'),
        loadSound('/audio/moo-2.mp3'),
        loadSound('/audio/moo-3.mp3'),
        loadSound('/audio/moo-4.mp3'),
        loadSound('/audio/moo-5.mp3'),
        loadSound('/audio/moo-6.mp3'),
        loadSound('/audio/moo-7.mp3'),
        loadSound('/audio/moo-8.mp3'),
    ]
    spyMusic = loadSound('/audio/spy-music.mp3', {
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
