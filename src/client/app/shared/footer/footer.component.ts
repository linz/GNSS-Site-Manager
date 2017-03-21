import { Component } from '@angular/core';

/**
 * This class represents the footer component for all UI pages.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.css']
})
export class FooterComponent {
    public isCollapsed: boolean = true;

    constructor() {
    }
}
