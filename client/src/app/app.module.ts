import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule, MatInputModule,
    MatListModule, MatSelectModule,
    MatSidenavModule, MatSliderModule,
    MatToolbarModule
} from '@angular/material';

import {AppComponent} from '@app/app.component';
import {CommandsComponent} from '@app/commands/app.component.commands';
import {HttpClientModule} from '@angular/common/http';
import {PlaybackComponent} from '@app/playback/app.component.playback';
import '@app/extensions';
import {AlbumInfoComponent} from '@app/album-info/app.component.album-info';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {SourceMenuComponent} from '@app/source-menu/app.component.source-menu';

@NgModule({
    declarations: [
        AppComponent,
        CommandsComponent,
        PlaybackComponent,
        AlbumInfoComponent,
        SourceMenuComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatSliderModule,
        MatInputModule,
        HttpClientModule,
        DeviceDetectorModule.forRoot()
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [HttpClientModule],
    bootstrap: [AppComponent]
})

export class AppModule {
}

export class AppRoutingModule {
}



