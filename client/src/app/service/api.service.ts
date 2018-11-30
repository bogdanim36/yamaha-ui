import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConfig} from './api.service.config';

@Injectable()
export class ApiService {
    controller = 'Yamaha';
    config: ApiConfig = new ApiConfig();
    runningTask: number;
    cancelRunningTask = false;

    constructor(private http: HttpClient) {
    }

    public getJSON(url: string): Observable<any> {
        return this.http.get(url);
    }

    public action(action: string, method: string, apiArgs: object): Observable<any> {
        return this[method](this.getCustomActionUrl(action, undefined, undefined), apiArgs);
    }

    private getCustomActionUrl(action, id, endAction) {
        const url = (this.config.webRoot ? this.config.webRoot + '/' : '')
            + (this.config.prefix ? this.config.prefix + '/' : '')
            + (this.config.controller ? this.config.controller : '')
            + (action ? '/' + action : '')
            + (id ? '/' + id.toString() : '')
            + (endAction ? '/' + endAction : '')
            + (this.config.suffix ? this.config.suffix : '');
        return url;
    }

    public cmd(params) {
        if (this.runningTask) {
            this.cancelRunningTask = true;
            clearTimeout(this.runningTask);
            this.runningTask = null;
        }
        return this.action('cmd', 'post', params);
    }

    private post(url, params, loaderSelector, config): Observable<any> {
        return this.http.post(url, params || {}, config);
    }

    private get(url, params, loaderSelector): Observable<any> {
        return this.http.get(url, {params: params} || {});
    }
}
