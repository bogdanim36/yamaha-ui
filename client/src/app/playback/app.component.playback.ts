import {Component, Inject, forwardRef} from '@angular/core';
import {Yamaha} from '../yamaha/app.component.yamaha';
import {AppComponent} from '../app.component';

@Component({
    selector: 'app-playback',
    templateUrl: './app.component.playback.html',
    styleUrls: []
})
export class PlaybackComponent {
    yamaha: Yamaha;

    constructor(@Inject(forwardRef(() => AppComponent)) private parent: AppComponent) {
        this.yamaha = parent.yamaha;
    }
}

