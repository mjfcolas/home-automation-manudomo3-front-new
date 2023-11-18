import React, {FunctionComponent, useEffect, useState} from "react";
import ValueWithUnit from "../../components/value-with-unit/value-with-unit";
import {HomeDataSummary} from "../../../domain/entities/home-data-summary";
import {homeDataRepository, intervalState} from "../../../../configuration/configuration";
import {useTranslation} from "react-i18next";
import './summary.scss'
import {Subscription} from "rxjs";
import {faBed, faCloud, faCouch, faDroplet, faEuroSign} from "@fortawesome/free-solid-svg-icons";

const Summary: FunctionComponent = () => {
    const {t} = useTranslation();

    const [
        summary,
        setSummary
    ] = useState<HomeDataSummary | undefined>(undefined)

    useEffect(() => {
        homeDataRepository.summary(intervalState.currentInterval()).then(summary => setSummary(summary))
    }, []);

    useEffect(() => {
        const subscription: Subscription = intervalState
            .observeInterval()
            .subscribe(newInterval => homeDataRepository.summary(newInterval).then(summary => setSummary(summary)))
        return subscription.unsubscribe
    }, []);


    if (!summary) {
        return <div/>
    }

    return (
        <div className="summary flex">
            <span className={"flex summary-group"}>
                <ValueWithUnit legend={t("summary.legend.living_room_temperature")}
                               value={summary.livingRoomTemperature.value}
                               unit={summary.livingRoomTemperature.unit}
                               icon={faCouch}/>
                <ValueWithUnit legend={t("summary.legend.bedroom_temperature")}
                               value={summary.bedroomTemperature.value}
                               unit={summary.bedroomTemperature.unit}
                               icon={faBed}/>
            </span>
            <span className={"flex summary-group"}>
                <ValueWithUnit legend={t("summary.legend.relative_atmospheric_pressure")}
                               value={summary.relativeAtmosphericPressure.value}
                               unit={summary.relativeAtmosphericPressure.unit}
                               icon={faCloud}/>
                <ValueWithUnit legend={t("summary.legend.hygrometry")}
                               value={summary.hygrometry.value}
                               unit={summary.hygrometry.unit}
                               icon={faDroplet}/>
            </span>
            <span className={"flex summary-group"}>
                <ValueWithUnit legend={t("summary.legend.electricity-price")}
                               value={summary.electricityPrice.value}
                               unit={summary.electricityPrice.unit}
                               icon={faEuroSign}/>
                <ValueWithUnit legend={t("summary.legend.mean-electricity-price")}
                               value={summary.meanElectricityPrice.value}
                               unit={summary.meanElectricityPrice.unit}
                               icon={faEuroSign}/>
            </span>
        </div>
    )
}

export default Summary
