import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeviceModel } from '../shared/models';
import { Device } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Device[]>('device/all')
  }

  createDevice(deviceName: string) {
    return this.http.post<Device>('device/create', { name: deviceName })
  }

  editDevice(deviceId: number, deviceName: string) {
    const params = new HttpParams()
      .set('device_id', deviceId)
      .set('name', deviceName)
    return this.http.put<Device>('device/rename', {}, { params })
  }

  deleteDevice(deviceId: number) {
    return this.http.delete<Device>('device/delete', { params: { device_id: deviceId } })
  }
}
