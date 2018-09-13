import {ApiService} from '../service/api.service';
import {AppShared} from '../app.shared';
import {YamahaStatus, PowerStatus, SubwooferStatus} from './app.component.yamaha.status';
import 'rxjs';
import {YamahaConfig} from './app.component.yamaha.config';
import * as $ from 'jquery';
import {ChangeDetectorRef, NgZone} from '@angular/core';

export class Yamaha {
    status = new YamahaStatus();
    zone: NgZone;
    config: YamahaConfig = new YamahaConfig();
    changeDetectorRef: ChangeDetectorRef;
    element: HTMLElement;
    api: ApiService;
    window = {width: 0, height: 0};
    showSourceMenu: false;


    constructor(jsonSrv: ApiService) {
        this.api = jsonSrv;
        const self = this;
        jsonSrv.getJSON('./assets/yamaha.json').subscribe(data => {
            self.config = data;
            self.status.config = data;
            self.setCtrlIp();
            setInterval(function () {
                self.getBasicInfo(self.status.zone, 0);
            }, 1400);
        }, err => self.getError(err));
    }

    public powerToggle(callbackFn?, on?) {
        let value;
        if (on !== undefined) {
            if (on === this.status.powerIsOn()) return callbackFn();
            value = on ? PowerStatus.On : PowerStatus.Off;
        } else value = this.status.powerIsOn() ? PowerStatus.Off : PowerStatus.On;
        this.api.cmd({cmd: 'power' + value, param1: this.status.zone}).subscribe(data => {
            this.getBasicInfo(this.status.zone);
        }, err => this.getError(err));
    }

    subwooferToggle(value: string) {
        value = value || (this.status.subwooferIsOn() ? PowerStatus.Off : PowerStatus.On);
        this.api.cmd({cmd: 'extraBass' + value, param1: this.status.zone}).subscribe(response => {
            this.getBasicInfo(this.status.zone);
        }, err => this.getError(err));
    }

    getInfo() {
        this.api.action('getServerInfo', 'get', {zone: this.status.zone}).subscribe(response => {
            this.getServerResponse(response);
        }, err => this.getError(err));
        this.getMenu(this.status.currentInput);
    }

    getServerResponse(response) {
        this.status.playback = response.data;
        if (this.status.playback.Playback_Info[0] === 'Play' && this.status.playback.Meta_Info && this.status.currentInput === 'SERVER') {
            this.status.playback.Meta_Info[0].Artist[0] = this.status.playback.Meta_Info[0].Artist[0].unescapeForXML();
            this.status.playback.Meta_Info[0].Song[0] = this.status.playback.Meta_Info[0].Song[0].unescapeForXML();
            this.status.playback.Meta_Info[0].Album[0] = this.status.playback.Meta_Info[0].Album[0].unescapeForXML();
            document.title = this.status.playback.Meta_Info[0].Artist[0] + ' - ' + this.status.playback.Meta_Info[0].Song[0];
        } else {
            document.title = AppShared.appTitle;
        }
    }

    getError(err) {
        document.title = AppShared.apiError;
        console.error(err);
    }

    private setCtrlIp() {
        this.api.action('setCtrlIp', 'get', {ip: this.config.ip}).subscribe(response => {
            console.log('setCtrlIp ip:', response);
            this.getBasicInfo(this.status.zone, 0);
        }, err => this.getError(err));
    }

    private getBasicInfo(zone, delay?: number, callback?) {
        let self = this;
        this.api.runningTask = setTimeout(function () {
            self.api.cancelRunningTask = false;
            self.api.action('getBasicInfo', 'get', {zone: zone}).subscribe(response => {
                self.getBasicInfoResponse(response, callback);
            }, err => self.getError(err));
        }, delay || 1400);
    }

    private getBasicInfoResponse(response, callback) {
        if (!response) return callback ? callback() : true;
        if (this.api.cancelRunningTask) return callback ? callback() : true;
        this.status.basic = response.data.YAMAHA_AV.Main_Zone[0].Basic_Status[0];
        this.status.power = this.status.basic.Power_Control[0].Power[0];
        this.status._volume = parseInt(this.status.basic.Volume[0].Lvl[0].Val[0], 0);
        this.status.currentInput = this.status.basic.Input[0].Input_Sel[0];
        if (!this.status.powerIsOn()) return callback ? callback() : true;
        if (this.status.currentInput === 'SERVER') this.getInfo();
        else {
            if (document.title.startsWith(AppShared.apiError)) document.title = AppShared.appTitle;
            this.status.playback = null;
            this.status.menu = null;
        }
        this.status._treble = parseInt(this.status.basic.Sound_Video[0].Tone[0].Treble[0].Val[0], 0);
        this.status._bass = parseInt(this.status.basic.Sound_Video[0].Tone[0].Bass[0].Val[0], 0);
        this.status._subwooferTrim = parseInt(this.status.basic.Volume[0].Subwoofer_Trim[0].Val[0], 0);
        if (callback) callback();
        // console.log('get basic response', this.status.$volume);
    }

    volumeUp() {
        this.status.volume += this.config.volume.step * 1;
        this.setVolumeTo(this.status.volume);
    }

    volumeDown() {
        this.status.volume -= this.config.volume.step;
        this.setVolumeTo(this.status.volume);
    }

    adjustVolumeByValue(value) {
        this.api.cmd({cmd: 'adjustVolumeBy', param1: value * 10, param2: this.status.zone}).subscribe(response => {
            this.getBasicInfo(this.status.zone, 0);
        }, err => this.getError(err));
    }

    setVolumeTo(value) {
        this.api.cmd({cmd: 'setVolumeTo', param1: value * 10, param2: this.status.zone}).subscribe(response => {
            this.getBasicInfo(this.status.zone);
        }, err => this.getError(err));
    }

    volumeMute() {
        const value = this.status.basic.Volume[0].Mute[0] === 'On' ? 'Off' : 'On';
        this.status.basic.Volume[0].Mute[0] = value;
        this.api.cmd({cmd: 'mute' + value, param1: this.status.zone}).subscribe(response => {
            this.getBasicInfo(this.status.zone);
        }, err => this.getError(err));
    }

    setInputTo($event) {
        let input = this.status.currentInput;
        let executeFn = function (isNotCallback) {
            this.api.cmd({cmd: 'setInputTo', param1: input, param2: this.status.zone}).subscribe(response => {
                this.getBasicInfo(this.status.zone, 0, this.windowCheckSize.bind(this));
            }, err => this.getError(err));
        };
        if (!this.status.powerIsOn()) this.powerToggle(executeFn.bind(this));
        else executeFn.bind(this)(true);

    }

    subwooferUp() {
        this.status.subwooferTrim += 1;
        this.setSubwooferLevelTo(this.status.subwooferTrim);
    }

    subwooferDown() {
        this.status.subwooferTrim -= 1;
        this.setSubwooferLevelTo(this.status.subwooferTrim);

    }

    setSubwooferLevelTo(value) {
        this.api.cmd({cmd: 'setSubwooferTrimTo', param1: value * 10}).subscribe(response => {
            this.getBasicInfo(this.status.zone);
        }, err => this.getError(err));
    }

    trebleUp() {
        this.status.treble += 1;
        this.setTrebleTo(this.status.treble);
    }

    trebleDown() {
        this.status.treble -= 1;
        this.setTrebleTo(this.status.treble);
    }

    setTrebleTo(value) {
        this.api.cmd({cmd: 'setTrebleTo', param1: value * 10}).subscribe(response => {
            this.getBasicInfo(this.status.zone);
        }, err => this.getError(err));
    }

    bassUp() {
        this.status.bass += 1;
        this.setBassTo(this.status.bass);
    }

    bassDown() {
        this.status.bass -= 1;
        this.setBassTo(this.status.bass);
    }

    setBassTo(value) {
        this.api.cmd({cmd: 'setBassTo', param1: value * 10}).subscribe(response => {
            this.getBasicInfo(this.status.zone);
        }, err => this.getError(err));
    }

    rewind() {
        this.api.cmd({cmd: 'rewind', param1: this.status.zone}).subscribe(response => {
            this.getInfo();
        }, err => this.getError(err));
    }

    skip() {
        this.api.cmd({cmd: 'skip', param1: this.status.zone}).subscribe(response => {
            this.getInfo();
        }, err => this.getError(err));
    }

    stop() {
        this.api.cmd({cmd: 'stop', param1: this.status.zone}).subscribe(response => {
            this.getInfo();
        }, err => this.getError(err));
    }

    play() {
        let self = this;
        let executeFn = function () {
            this.api.cmd({cmd: 'play', param1: this.status.zone}).subscribe(response => {
                this.getInfo();
            }, err => this.getError(err));
        };
        this.powerToggle(executeFn.bind(this), true);
    }

    pause() {
        this.api.cmd({cmd: 'pause', param1: this.status.zone}).subscribe(response => {
            this.getInfo();
        }, err => this.getError(err));
    }

    shuffle() {
        let value = this.status.playback.Play_Mode[0].Shuffle[0] === 'On' ? 'Off' : 'On';
        this.status.playback.Play_Mode[0].Shuffle[0] = value;
        this.api.cmd({cmd: 'shuffle' + value, param1: this.status.currentInput}).subscribe(respone => {
            this.getShuffleInfo();
        }, err => this.getError(err));
    }

    getShuffleInfo() {
        this.api.action(
            'getShuffleInfo', 'get', {input: this.status.currentInput}).subscribe(response => {
            console.log('playmode', response.data);
        });
    }

    setNightSound() {
        if (this.status.volume > this.config.volume.night) {
            this.status.volume = this.config.volume.night;
            this.setVolumeTo(this.status.volume);
        }
        if (this.status.bass > this.config.bass.night) {
            this.status.bass = this.config.bass.night;
            this.setBassTo(this.status.bass);
        }
        this.subwooferToggle(SubwooferStatus.Off);
    }

    setDaySound() {
        if (this.status.volume < this.config.volume.day) {
            this.status.volume = this.config.volume.day;
            this.setVolumeTo(this.status.volume);
        }
        if (this.status.bass < this.config.bass.day) {
            this.status.bass = this.config.bass.day;
            this.setBassTo(this.status.bass);
        }
        this.subwooferToggle('On');
    }

    windowFitToSize() {
        let height = $(this.element).height();
        let width = $(this.element).width();
        console.log('window resize', width, height);
        if ($(window).width() < width - 17) height += 2;
        window.resizeTo(width + 17, height + 39);
        this.window.width = width;
        this.window.height = height;
    }

    windowCheckSize() {
        this.changeDetectorRef.detectChanges();
        this.zone.run(this.windowFitToSize.bind(this));
    }

    toggleSize($event) {
        this.status.collapsed = !this.status.collapsed;
        this.windowCheckSize();
    }

    getMenu(name) {
        this.api.cmd({cmd: 'get' + name + 'List'}).subscribe(response => {
            this.status.menu = response.data.YAMAHA_AV[name][0].List_Info[0];
            this.status.menu.MaxLine = parseInt(this.status.menu.Cursor_Position[0].Max_Line[0], 0);
            // @ts-ignore
            let page = parseInt((this.status.menu.MaxLine + 7) / 8, 0);
            let val = parseInt(this.status.menu.Cursor_Position[0].Current_Line[0], 0);
            // @ts-ignore
            this.status.menu.currentPage = parseInt((val + 7) / 8, 0);
            this.status.menu.currentPos = val - (this.status.menu.currentPage - 1) * 8;
            this.status.menu.currentLine = 'Line_' + this.status.menu.currentPos;
            // console.log('menu', this.status.menu);
        });
    }

    getAlbumArt() {
        if (!this.status.playback || !this.status.playback.Album_ART || this.status.playback.Album_ART[0].URL[0] === '')
            return '/assets/album.jpg';
        else {
            let url = 'http://' + this.config.ip + this.status.playback.Album_ART[0].URL[0];
            return url;
        }
    }

}
