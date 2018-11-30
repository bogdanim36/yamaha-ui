import {MediaMatcher} from '@angular/cdk/layout';
import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef, NgZone,
    OnDestroy,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {DeviceDetectorService, DeviceInfo} from 'ngx-device-detector';
import * as $ from 'jquery';
import {ApiService} from './service/api.service';
import {Yamaha} from './yamaha/app.component.yamaha';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ApiService]
})
export class AppComponent implements OnDestroy, AfterViewInit, AfterViewChecked {
    mobileQuery: MediaQueryList;
    sidePanelShow = false;
    isMobile = false;
    isTablet = false;
    isDesktop = false;
    deviceInfo: DeviceInfo;
    public yamaha: Yamaha;
    private _mobileQueryListener: () => void;
    @ViewChild('yamahaRef', {read: ElementRef}) yamahaEl: ElementRef;

    constructor(jsonSrv: ApiService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private deviceService: DeviceDetectorService, private zone: NgZone) {
        this.yamaha = new Yamaha(jsonSrv);
        this.yamaha.zone = this.zone;
        this.yamaha.changeDetectorRef = changeDetectorRef;
        this.mobileQuery = media.matchMedia('(max-width: 738px)');
        this._mobileQueryListener = () => {
            changeDetectorRef.detectChanges();
            console.log(this.mobileQuery);
        };
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.epicFunction();
    }

    ngAfterViewInit(): void {
        this.yamaha.element = this.yamahaEl.nativeElement;
        console.log('Device info', this.deviceInfo, this.yamahaEl.nativeElement.parentNode);
        if (this.isMobile) $(this.yamahaEl.nativeElement).closest("body").addClass("app-is-mobile");

        let doc = window.document;
        let docEl = doc.documentElement;

        let requestFullScreen = docEl.requestFullscreen || docEl.webkitRequestFullScreen;
        if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
            requestFullScreen.call(docEl);
        }
    }

    ngAfterViewChecked() {
        let height = $(this.yamaha.element).height();
        let width = $(this.yamaha.element).width();
        if (this.yamaha.window.width === width && this.yamaha.window.height === height) return;

        if (!this.isMobile) this.yamaha.windowFitToSize();
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    toggleSidePanel() {
        this.sidePanelShow = !this.sidePanelShow;
    }

    epicFunction() {
        this.deviceInfo = this.deviceService.getDeviceInfo();
        this.isMobile = this.deviceService.isMobile();
        this.isTablet = this.deviceService.isTablet();
        this.isDesktop = this.deviceService.isDesktop();
        // if (this.isMobile) this.yamahaEl.nativeElement
    }
}

