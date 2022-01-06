import React, {FunctionComponent, useEffect, useState} from "react";
import LineChart, {DataPoint} from "../../components/line-chart/line-chart";
import {Dataset} from "../../../domain/entities/dataset";
import {Interval} from "luxon";
import {useTranslation} from "react-i18next";
import './line-chart-container.scss'

export type GraphContainerProps = {
    titleKey: string
    interval: Interval
    datasetProvider: (interval: Interval) => Promise<Dataset>
}

const toDataPoints = (dataset: Dataset): readonly DataPoint[] => dataset.timedData.map(timedPoint => ({
        x: timedPoint.instant,
        y: timedPoint.value
    })
);

const LineChartContainer: FunctionComponent<GraphContainerProps> = ({titleKey, interval, datasetProvider}) => {
    const {t} = useTranslation();

    const [
        dataPoints,
        setDataPoints
    ] = useState<readonly DataPoint[]>([])

    useEffect(() => {
        datasetProvider(interval).then(dataset => {
            setDataPoints(toDataPoints(dataset))
        })
    }, [datasetProvider, interval]);

    return (
        <div className="line-chart">
            <LineChart title={t(titleKey)} data={dataPoints}/>
        </div>
    )
}

export default LineChartContainer;
