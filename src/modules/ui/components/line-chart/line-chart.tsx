import React, {FunctionComponent} from "react";
import {Line} from 'react-chartjs-2';
import {
    CategoryScale,
    Chart,
    Filler,
    LinearScale,
    LineElement,
    PointElement,
    TimeScale,
    Title,
    Tooltip
} from "chart.js";
import 'chartjs-adapter-luxon';
import {DateTime} from "luxon";

Chart.register(
    CategoryScale,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
)

export type DataPoint = {
    x: DateTime,
    y: number
}

export type GraphProps = {
    title: string,
    data: ReadonlyArray<DataPoint>
}

const LineChart: FunctionComponent<GraphProps> = (props) => {

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time' as unknown as undefined, //TODO Why 'time' is not accepted ?
                time: {
                    minUnit: 'minute',
                    displayFormats: {
                        second: 'MMM d, yyyy, h:mm a'
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: props.title,
            },
        },
    };

    const data = {
        datasets: [
            {
                data: props.data,
                borderColor: 'rgb(18,63,87)',
                backgroundColor: 'rgba(18,63,87, 0.5)',
                fill: 'origin',
                tension: 0
            }
        ],
    };

    return (
        <Line options={options} data={data}/>
    )
}

export default LineChart;
