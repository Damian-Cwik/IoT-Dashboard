import { LineChart } from '@mui/x-charts/LineChart';
import type { Data } from '../../types/Data';


interface ChartProps {
  device: Data;
}

const Chart = ({ device }: ChartProps) => {
  const xLabels = device.readingDate.map(date =>
    date.toLocaleString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  );

  const temperatureData = [device.temperature ?? 0, device.temperature ?? 0];
  const pressureData = [device.pressure ?? 0, device.pressure ?? 0];
  const humidityData = [device.humidity ?? 0, device.humidity ?? 0];

  return (
    <div
      style={{
        maxWidth: '860px',
        width: '100%',
      }}
    >
      <LineChart
        height={300}
        series={[
          { data: temperatureData, label: 'Temperature (°C)', color: '#e57373' },
          { data: pressureData, label: 'Pressure (hPa)', color: '#64b5f6' },
          { data: humidityData, label: 'Humidity (%)', color: '#81c784' },
        ]}
        xAxis={[
          {
            scaleType: 'point',
            data: xLabels,
            tickLabelStyle: { fill: '#ffffff' },
          },
        ]}
        yAxis={[
          {
            tickLabelStyle: { fill: '#ffffff', fontSize: 12 },
          },
        ]}
        slotProps={{
          legend: {
            labelStyle: {
              fill: '#ffffff',
            },
          },
        }}
        sx={{
          '.MuiChartsAxis-root line': {
            stroke: '#ffffff',
          },
          '.MuiChartsAxis-line': {
            stroke: '#ffffff',
          },
          '.MuiChartsGrid-line': {
            stroke: '#444444',
          },
          '.MuiChartsLegend-markLabel': {
            fill: '#ffffff',
          },
          '.MuiChartsLegend-series text': {
            fill: '#ffffff',
          },
        }}
        margin={{ right: 24 }}
      />
    </div>
  );
};

export default Chart;