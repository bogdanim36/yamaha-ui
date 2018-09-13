import {Component, forwardRef, Inject, ViewEncapsulation} from '@angular/core';
import {Yamaha} from '../yamaha/app.component.yamaha';
import {AppComponent} from '../app.component';

@Component({
    selector: 'app-source-menu',
    templateUrl: './app.component.source-menu.html',
    styleUrls: ['./app.component.source-menu.css'],
    encapsulation: ViewEncapsulation.None
})
export class SourceMenuComponent {
    yamaha: Yamaha;
    objectKeys = Object.keys;

    constructor(@Inject(forwardRef(() => AppComponent)) private parent: AppComponent) {
        this.yamaha = parent.yamaha;
    }

    pageDown() {
        this.yamaha.api.cmd({cmd: 'menuPageMove', param1: 'SERVER', param2: 'Down'}).subscribe(response => {
            this.yamaha.getMenu('SERVER');
        });
    }

    pageUp() {
        this.yamaha.api.cmd({cmd: 'menuPageMove', param1: 'SERVER', param2: 'Up'}).subscribe(response => {
            this.yamaha.getMenu('SERVER');
        });
    }

    return() {
        this.yamaha.api.cmd({cmd: 'menuCursorMove', param1: 'SERVER', param2: 'Return'}).subscribe(response => {
            this.yamaha.getMenu('SERVER');
        });
    }

    select(line) {
        this.yamaha.api.cmd({cmd: 'selectListItem', param1: 'SERVER', param2: line.replace('Line_', '')}).subscribe(response => {
            this.yamaha.getMenu('SERVER');
        });
    }

    down() {
        this.yamaha.api.cmd({cmd: 'menuCursorMove', param1: 'SERVER', param2: 'Down'}).subscribe(response => {
            this.yamaha.getMenu('SERVER');
        });
    }

    up() {
        this.yamaha.api.cmd({cmd: 'menuCursorMove', param1: 'SERVER', param2: 'Up'}).subscribe(response => {
            this.yamaha.getMenu('SERVER');
        });
    }

}

