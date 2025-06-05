import Chart from "../Chart/Chart";
import DeviceCard from "../DeviceCard/DeviceCard";
import type { Data } from "../../types/Data";
import styles from "./ChartWrapper.module.css"

interface ChartWrapperProps {
   data: Array<Data>;
}

const ChartWrapper = ({ data }: ChartWrapperProps) => {
   if (data.length === 0) {
      return <p>No devices available</p>;
   }

   return (
      <div className={styles.chartWrapper}>
         <DeviceCard {...data[2]} />
         <Chart device={data[2]} />
      </div>
   );
};

export default ChartWrapper;


