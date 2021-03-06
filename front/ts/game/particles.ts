class ParticleImage {
    public width: number;
    public height: number;

    constructor(
        public url: string,
        public image: HTMLImageElement,
    ) { }
}

function loadImage(url: string) {
    const image = new Image();
    const particleImage = new ParticleImage(url, image);
    image.onload = function () {
        particleImage.width = (this as any).naturalWidth;
        particleImage.height = (this as any).naturalHeight;
    }
    image.src = url;
    return particleImage;
}

class Types {
    questionMark = loadImage('/images/question-mark.png')
    cross = loadImage('/images/cross.png')
    yes1 = loadImage('/images/yes-1.png')
    yes2 = loadImage('/images/yes-2.png')
    yes3 = loadImage('/images/yes-3.png')
    dupe = loadImage('/images/dupe.png')
}

const types = new Types();

class Particles {
    burst(type: keyof Types, x: number, y: number, animation: 'wobble' | 'grow-shrink' = null) {
        if (types[type]) {
            const image = $('<img>')
                .attr({
                    src: types[type].url,
                })
                .css({
                    top: y - (types[type].height / 2),
                    left: x - (types[type].width / 2),
                })
                .addClass(animation ? `g-${animation}` : '')
                .appendTo('#g-particles');
            setTimeout(() => {
                image.fadeOut();
            }, 1000);
        }
    }
}

export const particles = new Particles();