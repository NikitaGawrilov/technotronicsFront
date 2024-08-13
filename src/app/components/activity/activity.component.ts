import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { Battery, Device } from 'src/app/shared/interfaces';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit{

  devices: Device[] = [
    {id: 1, name: 'dev1', created_at: '123123', paired_batteries: [
      {id: 4, name: 'bat4', paired_device_id: 1, created_at: '123123'},
      {id: 4, name: 'bat4', paired_device_id: 1, created_at: '123123'},
      {id: 4, name: 'bat4', paired_device_id: 1, created_at: '123123'},
    ]},
    {id: 2, name: 'dev2', created_at: '123123', paired_batteries: []},
    {id: 3, name: 'dev3', created_at: '123123', paired_batteries: []},
  ]
  batteries: Battery[] = [
    {id: 1, name: 'bat1', paired_device_id: null, created_at: '123123'},
    {id: 2, name: 'bat2', paired_device_id: null, created_at: '123123'},
    {id: 3, name: 'bat3', paired_device_id: null, created_at: '123123'},
  ]

  constructor (
    private deviceS: DeviceService
  ) {}

  ngOnInit(): void {
    console.log(this.refresh())
  }

  refresh() {
    return this.deviceS.getAll().subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }


  getDevices() {
    let res = [];
    for (let device of this.devices) {
      res.push('device'+device.id);
    }
    return res
  }

  drop(event: CdkDragDrop<Battery[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
