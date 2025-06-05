import DeviceCard from "../DeviceCard/DeviceCard";
import type { Data } from "../../types/Data";

interface DeviceWrapperProps {
  devices: Array<Data>;
}

const wrapper: React.CSSProperties = {
   display: "flex",
   flexWrap: "wrap",
   alignItems: "center",
   justifyContent: "center",
   width: "100%",
   margin: "10px 0",
   padding: "10px 0",
   borderTop: "10px solid #fff",
}

const handleClick = () => {

}

const DeviceWrapper: React.FC<DeviceWrapperProps> = ({ devices }) => {

  return (
    <div style={wrapper}>
      {devices.map((data) => (
        <DeviceCard key={data.deviceId} {...data} handler={handleClick} />
      ))}
    </div>
  );

};

export default DeviceWrapper;