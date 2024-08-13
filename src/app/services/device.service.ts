import { HttpClient } from '@angular/common/http';
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
}
