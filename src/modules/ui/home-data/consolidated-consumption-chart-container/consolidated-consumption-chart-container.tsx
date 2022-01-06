import React, {FunctionComponent, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import BarChart from "../../components/bar-chart/bar-chart";
import {homeDataRepository} from "../../../../configuration/configuration";
import {TimeStep} from "../../../domain/entities/consolidated/time-step";
import {ConsolidatedConsumption} from "../../../domain/entities/consolidated/consolidated-consumption";
import './consolidated-consumption-chart-container.scss'

const ConsolidatedConsumptionChartContainer: FunctionComponent = () => {
    const {t} = useTranslation();

    const [
        consolidatedConsumption,
        setConsolidatedConsumption
    ] = useState<ConsolidatedConsumption | undefined>(undefined)

    const [
        step,
        setStep
    ] = useState<TimeStep>(TimeStep.MONTH)

    useEffect(() => {
        homeDataRepository.consolidatedIndexes(step).then(consolidatedConsumption => {
            setConsolidatedConsumption(consolidatedConsumption)
        })
    }, [step]);

    if (!consolidatedConsumption) {
        return <div/>
    }

    return (
        <div className="bar-chart">
            <div className={"consolidation-step-choice"}>
                <b>Pas de la consolidation</b>
                <span>
                    <input type={"radio"} value={TimeStep.MONTH}
                           name={"timestep"}
                           checked={step === TimeStep.MONTH}
                           onChange={() => setStep(TimeStep.MONTH)}/>
                    {t("consolidation.step." + TimeStep.MONTH)}
                </span>
                <span>
                    <input type={"radio"} value={TimeStep.YEAR}
                           name={"timestep"}
                           checked={step === TimeStep.YEAR}
                           onChange={() => setStep(TimeStep.YEAR)}/>
                    {t("consolidation.step." + TimeStep.YEAR)}
                </span>
            </div>
            <BarChart
                title={t("dataset.title.consolidated_indexes")}
                labels={consolidatedConsumption.getLabels().map(value => t(value))}
                datasetTitles={consolidatedConsumption.getDatasetTitles()}
                barData={consolidatedConsumption.getData()}
            />
        </div>
    )
}

export default ConsolidatedConsumptionChartContainer;
