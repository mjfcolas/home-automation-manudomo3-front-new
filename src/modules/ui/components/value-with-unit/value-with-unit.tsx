import React, {FunctionComponent} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './value-with-unit.scss'
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export type ValueWithUnitProps = {
    legend: string
    icon: IconDefinition,
    value: number,
    unit: string,

}

const ValueWithUnit: FunctionComponent<ValueWithUnitProps> = (props) => {
    return (
        <div className="value-with-unit">
            <FontAwesomeIcon icon={props.icon}/>
            <span className="value-with-unit-label">{props.legend} : </span>
            <b>{props.value.toFixed(2)}</b> {props.unit}
        </div>
    )
}

export default ValueWithUnit
