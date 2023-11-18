import {ValueWithUnit} from "./value-with-unit";

export class HomeDataSummary {
    constructor(
        readonly livingRoomTemperature: ValueWithUnit,
        readonly bedroomTemperature: ValueWithUnit,
        readonly relativeAtmosphericPressure: ValueWithUnit,
        readonly electricityPrice: ValueWithUnit,
        readonly meanElectricityPrice: ValueWithUnit,
        readonly hygrometry: ValueWithUnit
    ) {
    }
}
