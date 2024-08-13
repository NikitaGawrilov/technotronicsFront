import { Component, Inject } from '@angular/core';
import { Device, PopupMode } from 'src/app/shared/interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device-popup',
  templateUrl: './device-popup.component.html',
  styleUrls: ['./device-popup.component.css']
})
export class DevicePopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { 
      mode: PopupMode,
      deviceId?: number
    },
    public dialogRef: MatDialogRef<DevicePopupComponent>,
    private deviceS: DeviceService
  ) {}

  deviceName: string = ''

  onNoClick() {
    this.dialogRef.close(false)
  }

  try() {
    switch (this.data.mode) {
      case 'create':
        if (this.deviceName != '') {
          this.deviceS.createDevice(this.deviceName).subscribe({
            next: (res) => {
              this.dialogRef.close(res)
            }
          })
        }
        break;
      case 'edit':
        if (this.deviceName != '' && this.data.deviceId) {
          this.deviceS.editDevice(this.data.deviceId, this.deviceName).subscribe({
            next: (res) => {
              this.dialogRef.close(res)
            }
          })
        }
        break;
    }
  }
}
