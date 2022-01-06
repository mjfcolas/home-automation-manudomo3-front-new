import React, {FunctionComponent} from "react";
import {Bar} from 'react-chartjs-2';
import {BarElement, Chart, Legend, Title, Tooltip} from "chart.js";
import 'chartjs-adapter-luxon';

Chart.register(
    BarElement,
    Title,
    Tooltip,
    Legend
)

export type BarChartProps = {
    title: string,
    labels: string[]
    datasetTitles: Map<number, string>
    barData: Map<number, ReadonlyArray<number>>
}

const colors: string[] = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(232,255,99,0.8)',
    'rgba(133,99,255,0.8)',
    'rgba(99,226,255,0.8)',
    'rgba(122,36,55,0.8)',
    'rgba(122,115,36,0.8)',
    'rgba(83,36,122,0.8)',
    'rgba(36,122,109,0.8)'
]

const BarChart: FunctionComponent<BarChartProps> = ({title, labels, datasetTitles, barData}) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: title,
            }
        },
    };

    const datasets = [...barData.keys()].map((datasetKey, index) => ({
        label: datasetTitles.get(datasetKey),
        data: barData.get(datasetKey),
        backgroundColor: colors[index],
    }))

    const data = {
        labels: labels,
        datasets: datasets,
    };

    return (
        <Bar options={options} data={data}/>
    )
}

export default BarChart;
