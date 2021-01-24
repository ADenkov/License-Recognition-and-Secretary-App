import http from './http-common';

class IPCameraService {

    startSoftware(data){
        console.log(data);
        return http.post('/start', data);
    }
}
export default new IPCameraService();

