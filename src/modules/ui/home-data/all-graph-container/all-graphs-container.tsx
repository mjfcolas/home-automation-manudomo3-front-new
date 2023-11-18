import React, {FunctionComponent, useEffect, useState} from 'react';
import LineChartContainer from "../line-chart-container/line-chart-container";
import {homeDataRepository, intervalState} from "../../../../configuration/configuration";
import {Interval} from "luxon";
import {Subscription} from "rxjs";
import ConsolidatedConsumptionChartContainer
    from "../consolidated-consumption-chart-container/consolidated-consumption-chart-container";


const AllGraphsContainer: FunctionComponent = () => {

    const [
        interval,
        setInterval
    ] = useState<Interval>(intervalState.currentInterval());

    useEffect(() => {
        const subscription: Subscription = intervalState
            .observeInterval()
            .subscribe(newInterval => setInterval(newInterval))
        return subscription.unsubscribe
    }, []);

    return (
        <div className="graphs">
            <LineChartContainer datasetProvider={(interval) => homeDataRepository.livingRoomTemperatures(interval)} interval={interval}
                                titleKey={"dataset.title.temperatures_living_room"}/>
            <LineChartContainer datasetProvider={(interval) => homeDataRepository.bedroomTemperatures(interval)} interval={interval}
                                titleKey={"dataset.title.temperatures_bedroom"}/>
            <LineChartContainer datasetProvider={(interval) => homeDataRepository.atmosphericPressures(interval)} interval={interval}
                                titleKey={"dataset.title.pressures"}/>
            <LineChartContainer datasetProvider={(interval) => homeDataRepository.hygrometries(interval)} interval={interval}
                                titleKey={"dataset.title.hygrometries"}/>
            <LineChartContainer datasetProvider={(interval) => homeDataRepository.intensities(interval)} interval={interval}
                                titleKey={"dataset.title.intensities"}/>
            <LineChartContainer datasetProvider={(interval) => homeDataRepository.offPeakHourIndexes(interval)} interval={interval}
                                titleKey={"dataset.title.off_peak_indexes"}/>
            <LineChartContainer datasetProvider={(interval) => homeDataRepository.peakHourIndexes(interval)} interval={interval}
                                titleKey={"dataset.title.peak_indexes"}/>
            <ConsolidatedConsumptionChartContainer/>
        </div>
    )
}


export default AllGraphsContainer;

