import { DeviceStatus } from '../../domain/DeviceStatus';
import './StatusCellRenderer.scss';

export const StatusCellRenderer = (props: { value: string }) => {
    return (
        <>
            {props.value === DeviceStatus.AVAILABLE ?
                <div className= 'available-container'>
                    <span className='dot-circle' />
                    <span> {props.value}
                    </span>
                </div>
                :
                <span>{props.value}</span>}
        </>
    );
};