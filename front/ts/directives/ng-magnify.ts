import { IAttributes } from "angular";
import { IDirective, Link } from "./directive";

export class NgMagnifyDirective implements IDirective {
    public inject = [];
    public require: '?ngModel';
    public restrict = 'EA';
    public replace = true;
    public template = `<div class="magnify-container" data-ng-style="getContainerStyle()">
      <div class="magnify-glass" data-ng-style="getGlassStyle()"></div>
      <img class="magnify-image" data-ng-src="{{ imageSrc }}"/>
    </div>`;

    public transclude = false;
    public scope = {
      imageSrc: '@',
      imageWidth: '=',
      imageHeight: '=',
      glassWidth: '=',
      glassHeight: '='
    }

    public enableMagnify = false

    public directive(): Link {
        return (scope: any, element: JQuery<HTMLDivElement>, attributes: IAttributes, ngModel) => {
          var glass = element.find('div.magnify-glass'),
            image = element.find('img'),
            el, nWidth, nHeight, magnifyCSS;

          const windowT: any = window

          const loadGlass = (evt: any) => {
            if (!this.enableMagnify) return
            
            el = angular.extend(scope.getOffset(element[0]), {
              width: element[0].offsetWidth,
              height: element[0].offsetHeight,
              imageWidth: image[0].offsetWidth,
              imageHeight: image[0].offsetHeight,
              glassWidth: glass[0].offsetWidth,
              glassHeight: glass[0].offsetHeight
            });

            magnifyCSS = scope.magnify(evt);
  
            if (magnifyCSS) {
              glass.css( magnifyCSS );
            }
          }

          const destroyGlass = () => {
            glass.css({
              opacity: 0,
              filter: 'alpha(opacity=0)'
            });
  
            //Reset image for prevent binding change image source not same size.
            nWidth = undefined;
            nHeight = undefined;
          }

          document.addEventListener("keypress", (event: any) => {
            if (event.code === "Space") {
              this.enableMagnify = true
            }
          });

          document.addEventListener("keyup", (event: any) => {
            this.enableMagnify = false
            destroyGlass()
          });

          // if touch devices, do something
          if (('ontouchstart' in window) || windowT.DocumentTouch && document instanceof Document) {
            return;
          }
 
          element.on('mousemove', loadGlass)
                 .on('mouseleave', destroyGlass);

          scope.magnify = (evt) => {            
            var mx, my, rx, ry, px, py, bgp, img;
  
            if (!nWidth && !nHeight) {
              img = new Image();
              img.onload = function () {
                nWidth = img.width;
                nHeight = img.height;
              };
              img.src = scope.imageSrc;
            } else {
              // IE8 uses evt.x and evt.y
              mx = (evt.pageX) ? (evt.pageX - el.left) : evt.x;
              my = (evt.pageY) ? (evt.pageY - el.top) : evt.y;
  
              if (mx < el.width && my < el.height && mx > 0 && my > 0) {
                glass.css({
                  opacity: 1,
                  'z-index': 1,
                  filter: 'alpha(opacity=100)'
                });
              } else {
                glass.css({
                  opacity: 0,
                  'z-index': -1,
                  filter: 'alpha(opacity=0)'
                });
                return;
              }
  
              rx = Math.round(mx/el.imageWidth*nWidth - el.glassWidth/2)*-1;
              ry = Math.round(my/el.imageHeight*nHeight - el.glassHeight/2)*-1;
              bgp = rx + 'px ' + ry + 'px';
  
              px = mx - el.glassWidth/2;
              py = my - el.glassHeight/2;
  
              return { left: px+'px', top: py+'px', backgroundPosition: bgp };
            }
            return;
          };
  
          scope.getOffset = function (_el) {
            var de = document.documentElement;
            var box = _el.getBoundingClientRect();
            var top = box.top + window.pageYOffset - de.clientTop;
            var left = box.left + window.pageXOffset - de.clientLeft;
            return { top: top, left: left };
          };
  
          scope.getContainerStyle = function () {
            return {
              width: (scope.imageWidth) ? scope.imageWidth + 'px' : '',
              height: (scope.imageHeight) ? scope.imageHeight + 'px' : ''
            };
          };
  
          scope.getGlassStyle = function () {
            return {
              background: 'url("' + scope.imageSrc + '") no-repeat',
              width: (scope.glassWidth) ? scope.glassWidth + 'px' : '',
              height: (scope.glassHeight) ? scope.glassHeight + 'px' : ''
            };
          };
        };
    }
}