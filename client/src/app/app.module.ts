import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule, MatInputModule,
    MatListModule, MatSelectModule,
    MatSidenavModule, MatSliderModule,
    MatToolbarModule
} from '@angular/material';

import {DeviceDetectorModule} from 'ngx-device-detector';

import {AppComponent} from './app.component';
import {AlbumInfoComponent} from './album-info/app.component.album-info';
import {PlaybackComponent} from './playback/app.component.playback';
import {SourceMenuComponent} from './source-menu/app.component.source-menu';
import {CommandsComponent} from './commands/app.component.commands';

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



