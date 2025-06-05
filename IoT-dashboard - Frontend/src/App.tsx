import Navbar from './components/Navbar/Navbar'
import DeviceWrapper from './components/DeviceWrapper/DeviceWrapper';
import ChartWrapper from './components/ChartWrapper/ChartWrapper';
import type { Data } from "./types/Data";
import './App.css'



function App() {

const deviceArray: Array<Data & { readingDate: Date[] }> = [
  {
    deviceId: 1,
    temperature: undefined,
    pressure: undefined,
    humidity: undefined,
    readingDate: [new Date('2025-05-30T10:00:00'), new Date('2025-06-04T15:30:00')]
  },
  {
    deviceId: 2,
    temperature: 19.8,
    pressure: 1010,
    humidity: 50,
    readingDate: [new Date('2025-05-30T10:00:00'), new Date('2025-06-04T15:30:00')]
  },
  {
    deviceId: 3,
    temperature: 25.1,
    pressure: 1008,
    humidity: 40,
    readingDate: [new Date('2025-05-30T10:00:00'), new Date('2025-06-04T15:30:00')]
  },
  {
    deviceId: 4,
    temperature: 21.4,
    pressure: 1013,
    humidity: 47,
    readingDate: [new Date('2025-05-30T10:00:00'), new Date('2025-06-04T15:30:00')]
  },
  {
    deviceId: 5,
    temperature: 23.0,
    pressure: 1011,
    humidity: 43,
    readingDate: [new Date('2025-05-30T10:00:00'), new Date('2025-06-04T15:30:00')]
  },
];



  return (
    <>
      <Navbar />
      <ChartWrapper data={deviceArray}/>
      <DeviceWrapper devices={deviceArray} />
    </>
  )
}

export default App
