import {YamahaConfig} from './app.component.yamaha.config';

export class YamahaStatus {
    power = PowerStatus.Off;
    zone = 'Main_Zone';
    subwooferPower = SubwooferStatus.Off;
    _volume = -600;
    _treble = 0;
    _subwooferTrim = 0;
    _bass = 0;
    collapsed = true;
    basic: any;
    playback: any;
    menu: any;
    config: YamahaConfig;
    currentInput: string;

    public powerIsOn() {
        return this.power === PowerStatus.On;
    }

    public subwooferIsOn() {
        return this.basic && this.basic.Sound_Video[0].Extra_Bass[0] === SubwooferStatus.On;
    }

    get volume(): number {
        return this._volume / 10;
    }

    set volume(value) {
        if (value > this.config.volume.max) value = this.config.volume.max;
        if (value < this.config.volume.min) value = this.config.volume.min;
        this._volume = value * 10;
    }

    get treble(): number {
        return this._treble / 10;
    }

    set treble(value) {
        if (value > 6) value = 6;
        if (value < -6) value = -6;
        this._treble = value * 10;
    }

    get bass(): number {
        return this._bass / 10;
    }

    set bass(value) {
        if (value > 6) value = 6;
        if (value < -6) value = -6;
        this._bass = value * 10;
    }

    get subwooferTrim(): number {
        return this._subwooferTrim / 10;
    }

    set subwooferTrim(value) {
        if (value > 6) value = 6;
        if (value < -6) value = -6;
        this._subwooferTrim = value * 10;
    }
}

export class PowerStatus {
    public static On = 'On';
    public static Off = 'Off';
}

export class SubwooferStatus {
    public static On = 'Auto';
    public static Off = 'Off';
}
