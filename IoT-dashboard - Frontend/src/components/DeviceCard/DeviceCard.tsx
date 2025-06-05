import Typography from '@mui/material/Typography';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpacityIcon from '@mui/icons-material/Opacity';
import type { Data } from "../../types/Data";
import styles from './DeviceCard.module.css';

interface DeviceCardProps extends Data {
  handler?: () => void;
}

const DeviceCard = ({ deviceId, temperature, pressure, humidity, handler }: DeviceCardProps) => {

   const hasData =
      temperature !== undefined &&
      pressure !== undefined &&
      humidity !== undefined;


   return (
      <div className={styles.card} onClick={handler}>
         <p className={styles.deviceName}>Device No. {deviceId}</p>
         <div className={styles.separator}></div>
         {hasData ? (
            <>
               <Typography variant="h6" component="div">
                  <DeviceThermostatIcon />
                  <span className="value">{temperature}</span> <span>&deg;C</span>
               </Typography>

               <Typography variant="h6" component="div">
                  <CloudUploadIcon />
                  <span className="value">{pressure}</span> hPa
               </Typography>

               <Typography variant="h6" component="div">
                  <OpacityIcon />
                  <span className="value">{humidity}</span>%
               </Typography>
            </>
         ) : (
            <p>No data</p>
         )}
      </div>
   )

}

export default DeviceCard;