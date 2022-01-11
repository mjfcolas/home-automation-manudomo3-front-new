import React, {FunctionComponent, useEffect, useState} from "react";
import ValueWithUnit from "../../components/value-with-unit/value-with-unit";
import {HomeDataSummary} from "../../../domain/entities/home-data-summary";
import {homeDataRepository, intervalState} from "../../../../configuration/configuration";
import {faBed, faCloud, faCouch} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import './summary.scss'
import {Subscription} from "rxjs";

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
            </span>
            <span className={"flex summary-group"}>
                <ValueWithUnit legend={t("summary.legend.electricity-price")}
                               value={summary.electricityPrice.value}
                               unit={summary.electricityPrice.unit}
                               icon={faCloud}/>
                <ValueWithUnit legend={t("summary.legend.mean-electricity-price")}
                               value={summary.meanElectricityPrice.value}
                               unit={summary.meanElectricityPrice.unit}
                               icon={faCloud}/>
            </span>
        </div>
    )
}

export default Summary
