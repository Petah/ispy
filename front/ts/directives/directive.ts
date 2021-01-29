import { IAttributes, IScope } from 'angular';

export type Link = (scope: IScope, element: JQuery, attributes: IAttributes, ...required: any[]) => void;

export interface IDirective {
    restrict: string;
    scope: any;
    require?: any;
    template?: string;
    templateUrl?: string;
    inject: string[];
    directive(...injected: any[]): Link;
}
