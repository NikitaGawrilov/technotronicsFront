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
}
