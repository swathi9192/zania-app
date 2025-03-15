import { DeviceStatusColIds } from './DeviceStatusColIds';

//JSON response type
export interface DeviceStatusResponse {
    [DeviceStatusColIds.NAME]: string;
    [DeviceStatusColIds.DEVICE]: string;
    [DeviceStatusColIds.PATH]: string;
    [DeviceStatusColIds.STATUS]: string;
}