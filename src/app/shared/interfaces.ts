export interface Battery {
    id: number,
    name: string,
    paired_device_id: number | null,
    created_at: string
}

export interface Device {
    id: number,
    name: string,
    paired_batteries?: Battery[]
    created_at: string
}

export type PopupMode = 'create' | 'edit'

export interface PairParams {
    battery_id: number,
    device_id?: number
}