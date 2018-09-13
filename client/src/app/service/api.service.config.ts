export class ApiConfig {
    webRoot = '';
    prefix = 'api';
    suffix = '';
    controller = 'Yamaha';
    httpConfig = undefined;
    actions = {
        new: {url: 'new', method: 'get'},
        edit: {url: '', method: 'get'},
        create: {url: '', method: 'post'},
        update: {url: '', method: 'put'},
        delete: {url: '', method: 'delete'},
        getList: {url: '', method: 'get'}
    };

    messages = {
        serviceFailed: 'Internal server error.',
        errorStatus: {
            '-1': 'Data service failed! Server is down!'
        }
    };
}
