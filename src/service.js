import devices from './devices';
import logs from './logs';

export default {

  getDevices() {
    return devices;
  },

  getDevice(id){
    for (var i = 0; i < devices.length; i += 1) {
      if (devices[i].id == id) {
        return devices[i];
      }
    }
  },

  getLogs() {
    return logs;
  },

  getLog(deviceId) {
   let result = [];
   for (var i = 0; i < logs.length; i += 1) {
     if (logs[i].deviceId == deviceId) {
       result.push(logs[i]);
     }
   }
   return result;
  },

  getLatestLogs(n) {
    return logs.slice(0, n);
  }

};