import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const socket = io("http://localhost:3000");


function Chart() {
    const [chartData, setChartData] = useState<{ temperature: number; pressure: number; humidity: number }[]>([]);

    useEffect(() => {
        socket.on("data", (data) => {
            const parsedData = JSON.parse(data);
            setChartData(parsedData);
        });

        return () => {
            socket.off("data");
        };
    }, []);

    const generateChartDataTemp = () => {
        const labels = chartData.map((data, index) => `Odczyt ${index + 1}`);
        const temperatures = chartData.map((data) => data.temperature);

        return {
            labels,
            datasets: [
                {
                    label: "Temperatura (°C)",
                    data: temperatures,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                },
            ],
        };
    };

    const generateChartDataPressure = () => {
        const labels = chartData.map((data, index) => `Odczyt ${index + 1}`);
        const pressures = chartData.map((data) => data.pressure);

        return {
            labels,
            datasets: [
                {
                    label: "Ciśnienie (hPa)",
                    data: pressures,
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                },
            ],
        };
    };
    const generateChartDataHumidity = () => {
        const labels = chartData.map((data, index) => `Odczyt ${index + 1}`);
        const humidities = chartData.map((data) => data.humidity);
        return {
            labels,
            datasets: [
                {
                    label: "Wilgotność (%)",
                    data: humidities,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
            ],
        };
    };

    return (
        <div style={{ padding: "20px", textAlign: "center", width: "100%", display: "flex"}}>
            <div>
                <Line data={generateChartDataTemp()} />
            </div>
            <div>
                <Line data={generateChartDataPressure()} />
            </div>
            <div>
                <Line data={generateChartDataHumidity()} />
            </div>
        </div>
    );
}


export default Chart;