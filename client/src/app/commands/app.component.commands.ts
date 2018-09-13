import {Component, Inject, forwardRef} from '@angular/core';
import {Yamaha} from '../yamaha/app.component.yamaha';
import {AppComponent} from '../app.component';

@Component({
    selector: 'app-commands',
    templateUrl: './app.component.commands.html',
    styleUrls: []
})
export class CommandsComponent {
    yamaha: Yamaha;

    constructor(@Inject(forwardRef(() => AppComponent)) private parent: AppComponent) {
        this.yamaha = parent.yamaha;
    }
}

