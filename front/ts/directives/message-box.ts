import { IAttributes, IScope } from "angular";
import { IDirective, Link } from "./directive";

interface IMessageBoxScope extends IScope {
}

export class MessageBoxDirective implements IDirective {
    public inject = [];
    public require: '?ngModel';
    public restrict = 'E';
    public templateUrl = '/directives/message-box.html';
    public transclude = true;
    public scope = {};

    public directive(): Link {
        return (scope: IMessageBoxScope, element: JQuery<HTMLDivElement>, attributes: IAttributes, ngModel) => {
        };
    }
}