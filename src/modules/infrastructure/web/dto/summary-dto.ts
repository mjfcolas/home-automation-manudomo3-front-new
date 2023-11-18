import {TemperatureDto} from "./temperature-dto";
import {PressureDto} from "./pressure-dto";
import {HygrometryDto} from "./hygrometry-dto";

export type SummaryDto = {
    temperature: TemperatureDto[];
    pressure: PressureDto;
    electricityPrice: number;
    meanElectricityPrice: number;
    hygrometry: HygrometryDto;
}
