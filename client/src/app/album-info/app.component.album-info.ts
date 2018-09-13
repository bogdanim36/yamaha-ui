import {Component, forwardRef, Inject, ViewEncapsulation} from '@angular/core';
import {Yamaha} from '../yamaha/app.component.yamaha';
import {AppComponent} from '../app.component';

@Component({
    selector: 'app-album-info',
    templateUrl: './app.component.album-info.html',
    styleUrls: ['./app.component.album-info.css'],
    encapsulation: ViewEncapsulation.None
})
export class AlbumInfoComponent {
    yamaha: Yamaha;

    constructor(@Inject(forwardRef(() => AppComponent)) private parent: AppComponent) {
        this.yamaha = parent.yamaha;
    }
}

