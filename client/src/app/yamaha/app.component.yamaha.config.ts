export class YamahaConfig {
    ip: string;
    inputs = [];
    volume = {
        min: -65,
        max: 20,
        step: 1,
        night: -60,
        day: -40
    };
    bass = {
        night: -6,
        day: 0
    };
}