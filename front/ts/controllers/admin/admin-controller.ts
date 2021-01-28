import { IScope } from "angular";
import { IController } from "../controller";

interface IAdminControllerScope extends IScope {
    message: string,
}

export class AdminController implements IController {
    public inject = [
        '$scope',
    ];

    public controller(
        $scope: IAdminControllerScope,
    ) {
        $scope.message = 'Test';
        console.log('admin', $('#gp-image-wrapper'));

        const mouse = {
            isDown: false,
            x: null,
            y: null
        };

        let path: {
            x: number,
            y: number,
        }[] = [];

        const svg = $('#gp-image-wrapper svg');
        const image = $('#gp-image-wrapper img');
        const svgPath = $('#gp-image-wrapper svg path');
        image.on('load', () => {
            svg.width(image.width());
            svg.height(image.height());
            console.log(image.width());
        })

        $('#gp-image-wrapper svg').on('mousemove', (event: MouseMoveEvent) => {
            // if (event.buttons !== undefined && event.buttons !== 1 && event.type != 'touchmove') {
            //     mouse.isDown = false;
            // }
            if (event.buttons !== undefined && event.buttons !== 1) {
                mouse.isDown = false;
            }

            if (mouse.isDown) {
                const parentOffset = $('#gp-image-wrapper svg').parent().offset();
                const x = (event.clientX || event.originalEvent.touches[0].clientX) - parentOffset.left;
                const y = (event.clientY || event.originalEvent.touches[0].clientY) - parentOffset.top;
                path.push({ x, y });
                const d: string[] = [];
                for (const p of path) {
                    if (d.length === 0) {
                        d.push(`M ${p.x}, ${p.y}`);
                    } else {
                        d.push(`L ${p.x}, ${p.y}`);
                    }
                }
                d.push('Z');
                const dString = d.join(' ');
                svgPath.attr('d', dString);
            }
        });

        $('#gp-image-wrapper svg').on('mousedown', (event: any) => {
            event.preventDefault()
            mouse.isDown = true;
            const parentOffset = $('#gp-image-wrapper svg').parent().offset();
            const x = (event.clientX || event.originalEvent.touches[0].clientX) - parentOffset.left;
            const y = (event.clientY || event.originalEvent.touches[0].clientY) - parentOffset.top;
            path = []
        });

        $('#gp-image-wrapper svg').on('mouseup', (event) => {
            event.preventDefault()
        });
    }
}
