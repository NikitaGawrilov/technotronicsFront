import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BatteryService } from 'src/app/services/battery.service';
import { Device, PopupMode } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-battery-popup',
  templateUrl: './battery-popup.component.html',
  styleUrls: ['./battery-popup.component.css']
})
export class BatteryPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { 
      mode: PopupMode,
      batteryId?: number,
      devices: Device[]
    },
    public dialogRef: MatDialogRef<BatteryPopupComponent>,
    private BatteryS: BatteryService
  ) {}

  batteryName: string = ''
  chosenDeviceId: number | null = null

  onNoClick() {
    this.dialogRef.close(false)
  }

  try() {
    switch (this.data.mode) {
      case 'create':
        if (this.batteryName != '') {
          this.BatteryS.createBattery(this.batteryName, this.chosenDeviceId).subscribe({
            next: (res) => {
              this.dialogRef.close(res)
            }
          })
        }
        break;
      case 'edit':
        if (this.batteryName != '' && this.data.batteryId) {
          this.BatteryS.editBattery(this.data.batteryId, this.batteryName).subscribe({
            next: (res) => {
              this.dialogRef.close(res)
            }
          })
        }
        break;
    }
  }
}
