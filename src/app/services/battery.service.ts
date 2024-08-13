import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BatteryModel } from '../shared/models';
import { Battery } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BatteryService {

  constructor(private http: HttpClient) { }

  getUnpaired() {
    return this.http.get<Battery[]>('battery/unpaired')
  }

  getPaired(deviceId: number) {
    return this.http.get<Battery[]>('battery/paired', { params: { device_id: deviceId } })
  }

  createBattery(batteryName: string, pairedDevice: number | null) {
    const body = {
      name: batteryName,
      paired_device_id: pairedDevice
    }
    return this.http.post<Battery>('battery/create', body)
  }

  editBattery(batteryId: number, batteryName: string) {
    const params = new HttpParams()
      .set('battery_id', batteryId)
      .set('name', batteryName)
    return this.http.put<Battery>('battery/rename', {}, { params })
  }

  deleteBattery(batteryId: number) {
    return this.http.delete<Battery>('battery/delete', { params: { battery_id: batteryId } })
  }
}
