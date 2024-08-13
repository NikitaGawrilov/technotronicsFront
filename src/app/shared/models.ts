export class DeviceModel {
    constructor(
        public id: number,
        public name: string,
        public created_at: string,
    ) { }
}

export class BatteryModel {
    constructor(
        public id: number,
        public name: string,
        public paired_device_id: string | null,
        public created_at: string,
    ) { }
}