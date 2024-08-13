import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { concatMap, forkJoin, tap } from 'rxjs';
import { BatteryService } from 'src/app/services/battery.service';
import { DeviceService } from 'src/app/services/device.service';
import { Battery, Device } from 'src/app/shared/interfaces';
import { DevicePopupComponent } from '../device-popup/device-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BatteryPopupComponent } from '../battery-popup/battery-popup.component';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit{

  devices: Device[] = []
  batteries: Battery[] = []

  constructor (
    private deviceS: DeviceService,
    private batteryS: BatteryService,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.refresh()
  }

  refresh() {
    this.getDevicesNBatteries().pipe(
      concatMap((res) => 
        forkJoin(Array.from(res[0]).map((device) => this.batteryS.getPaired(device.id))).pipe(
          tap((res) => 
            this.devices.forEach((device, index) => device.paired_batteries = res[index])
          )
        )
      )
    ).subscribe({
      next: (res) => {
        // console.log(res)
      }
    })
  }

  partialyRefresh() {
    forkJoin([
      forkJoin(Array.from(this.devices).map((device) => this.batteryS.getPaired(device.id))).pipe(
        tap((res) => 
          this.devices.forEach((device, index) => device.paired_batteries = res[index])
        )
      ),
      this.batteryS.getUnpaired().pipe(
        tap((res) => this.batteries = res)
      )
    ]).subscribe({
      next: (res) => {
        // console.log(res)
      }
    })
  }

  getDevicesNBatteries() {
    return forkJoin([
      this.deviceS.getAll().pipe(
        tap((res) => this.devices = res)
      ),
      this.batteryS.getUnpaired().pipe(
        tap((res) => this.batteries = res)
      )
    ])
  }

  // Device methods block

  createDevice() {
    const dialogRef = this.dialog.open(DevicePopupComponent, {
      data: { mode: 'create' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matSnackBar.open(`Устройство ${result.name} добавлено`, 'OK', { duration: 3000 })
        this.refresh()
      }
    });
  }

  editDevice(deviceId: number) {
    const dialogRef = this.dialog.open(DevicePopupComponent, {
      data: { mode: 'edit', deviceId: deviceId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matSnackBar.open(`Устройство ${result.name} изменено`, 'OK', { duration: 3000 })
        this.refresh()
      }
    });
  }

  deleteDevice(deviceId: number) {
    this.deviceS.deleteDevice(deviceId).subscribe({
      next: (res) => {
        this.refresh()
        this.matSnackBar.open(`Устройство ${res.name} удалено`, 'OK', { duration: 3000 })
      }
    })
  }

  // Battery methods block

  createBattery() {
    const dialogRef = this.dialog.open(BatteryPopupComponent, {
      data: { mode: 'create', devices: this.devices },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matSnackBar.open(`Аккумулятор ${result.name} добавлен`, 'OK', { duration: 3000 })
        this.partialyRefresh()
      }
    });
  }

  editBattery(batteryId: number) {
    const dialogRef = this.dialog.open(BatteryPopupComponent, {
      data: { mode: 'edit', devices: this.devices, batteryId: batteryId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matSnackBar.open(`Аккумулятор ${result.name} изменён`, 'OK', { duration: 3000 })
        this.partialyRefresh()
      }
    });
  }

  deleteBattery(batteryId: number) {
    this.batteryS.deleteBattery(batteryId).subscribe({
      next: (res) => {
        this.partialyRefresh()
        this.matSnackBar.open(`Аккумулятор ${res.name} удалён`, 'OK', { duration: 3000 })
      }
    })
  }

  pairBattery(batteryId: number, device: Device | undefined) {
    let deviceId: number | null = null
    device === undefined ? deviceId = null : deviceId = device.id
    this.batteryS.pairBattery(batteryId, deviceId).subscribe({
      next: (res) => {
        if (res.paired_device_id) {
          let pairedDeviceName = this.devices.find((device) => device.id == res.paired_device_id)?.name
          this.matSnackBar.open(`Аккумулятор ${res.name} подключен к устройству ${pairedDeviceName}`, 'OK', { duration: 3000 })
        } else {
          this.matSnackBar.open(`Аккумулятор ${res.name} свободен`, 'OK', { duration: 3000 })
        }
        this.partialyRefresh()
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

  drop(event: CdkDragDrop<Battery[]>, device?: Device) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.pairBattery(event.item.data.id, device)
    }
  }

}
