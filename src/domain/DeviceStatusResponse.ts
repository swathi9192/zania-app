import { DeviceStatusColIds } from "./DeviceStatusColIds";

export interface DeviceStatusResponse {
    [DeviceStatusColIds.NAME]: string;
    [DeviceStatusColIds.DEVICE]: string;
    [DeviceStatusColIds.PATH]: string;
    [DeviceStatusColIds.STATUS]: string;
}