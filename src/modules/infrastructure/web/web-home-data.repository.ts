import {HomeDataRepository} from "../../domain/repositories/home-data.repository";
import {DateTime, Interval} from "luxon";
import {Dataset} from "../../domain/entities/dataset";
import {HomeDataSummary} from "../../domain/entities/home-data-summary";
import {ApiConfiguration} from "./api-configuration";
import {TimedPoint} from "../../domain/entities/timed-point";
import {TemperatureDto} from "./dto/temperature-dto";
import {PressureDto} from "./dto/pressure-dto";
import {IntensityDto} from "./dto/intensity-dto";
import {EdfIndexDto} from "./dto/edf-index-dto";
import {ConsolidatedConsumption} from "modules/domain/entities/consolidated/consolidated-consumption";
import {TimeStep} from "modules/domain/entities/consolidated/time-step";
import {ConsolidatedIndexesDto} from "./dto/consolidated-indexes-dto";
import {TimeFramedConsumption} from "../../domain/entities/consolidated/time-framed-consumption";
import {SummaryDto} from "./dto/summary-dto";

export class WebHomeDataRepository implements HomeDataRepository {


    constructor(private readonly configuration: ApiConfiguration) {
    }

    async consolidatedIndexes(step: TimeStep): Promise<ConsolidatedConsumption> {
        const response = await fetch(
            this.configuration.baseUrl + `/edfIndexes/consolidated?step=${step}`,
            {credentials: 'include'})
        const body = await response.json() as ConsolidatedIndexesDto
        return new ConsolidatedConsumption(body.timeStep as TimeStep, body.indexInStepList.map(value => new TimeFramedConsumption(
            Interval.fromDateTimes(DateTime.fromISO(value.intervalStart), DateTime.fromISO(value.intervalEnd)),
            value.summedIndex
        )))
    }

    async summary(interval: Interval): Promise<HomeDataSummary> {
        const from: number = Math.floor(interval.start.toSeconds());
        const to: number = Math.floor(interval.end.toSeconds());

        const response = await fetch(
            this.configuration.baseUrl + `/summary?from=${from}&to=${to}`,
            {credentials: 'include'})
        const body = await response.json() as SummaryDto

        return new HomeDataSummary(
            {value: body.temperature.find(temperature => temperature.room === 'LIVING_ROOM')?.value || 0, unit: "°C"},
            {value: body.temperature.find(temperature => temperature.room === 'BEDROOM')?.value || 0, unit: "°C"},
            {value: body.pressure.relativePressure, unit: "hPa"},
            {value: body.electricityPrice, unit: "€"},
            {value: body.meanElectricityPrice, unit: "€/kWh"},
        );
    }

    async livingRoomTemperatures(interval: Interval): Promise<Dataset> {
        const from: number = Math.floor(interval.start.toSeconds());
        const to: number = Math.floor(interval.end.toSeconds());

        const response = await fetch(
            this.configuration.baseUrl + `/temperatures/interval?numberOfPoints=${this.configuration.numberOfPoints}&room=LIVING_ROOM&from=${from}&to=${to}`,
            {credentials: 'include'})
        const body = await response.json() as TemperatureDto[]

        return new Dataset(body.map(element => new TimedPoint(element.value, DateTime.fromISO(element.measureInstant))));
    }

    async bedroomTemperatures(interval: Interval): Promise<Dataset> {
        const from: number = Math.floor(interval.start.toSeconds());
        const to: number = Math.floor(interval.end.toSeconds());

        const response = await fetch(
            this.configuration.baseUrl + `/temperatures/interval?numberOfPoints=${this.configuration.numberOfPoints}&room=BEDROOM&from=${from}&to=${to}`,
            {credentials: 'include'})
        const body = await response.json() as TemperatureDto[]

        return new Dataset(body.map(element => new TimedPoint(element.value, DateTime.fromISO(element.measureInstant))));
    }

    async atmosphericPressures(interval: Interval): Promise<Dataset> {
        const from: number = Math.floor(interval.start.toSeconds());
        const to: number = Math.floor(interval.end.toSeconds());

        const response = await fetch(
            this.configuration.baseUrl + `/pressures/interval?numberOfPoints=${this.configuration.numberOfPoints}&from=${from}&to=${to}`,
            {credentials: 'include'})
        const body = await response.json() as PressureDto[]

        return new Dataset(body.map(element => new TimedPoint(element.relativePressure, DateTime.fromISO(element.measureInstant))));
    }

    async intensities(interval: Interval): Promise<Dataset> {
        const from: number = Math.floor(interval.start.toSeconds());
        const to: number = Math.floor(interval.end.toSeconds());

        const response = await fetch(
            this.configuration.baseUrl + `/intensities/interval?numberOfPoints=${this.configuration.numberOfPoints}&from=${from}&to=${to}`,
            {credentials: 'include'})
        const body = await response.json() as IntensityDto[]

        return new Dataset(body.map(element => new TimedPoint(element.value, DateTime.fromISO(element.measureInstant))));
    }

    async offPeakHourIndexes(interval: Interval): Promise<Dataset> {
        const from: number = Math.floor(interval.start.toSeconds());
        const to: number = Math.floor(interval.end.toSeconds());

        const response = await fetch(
            this.configuration.baseUrl + `/edfIndexes/interval?numberOfPoints=${this.configuration.numberOfPoints}&type=OFF_PEAK_HOUR&from=${from}&to=${to}`,
            {credentials: 'include'})
        const body = await response.json() as EdfIndexDto[]

        return new Dataset(body.map(element => new TimedPoint(element.value, DateTime.fromISO(element.measureInstant))));
    }

    async peakHourIndexes(interval: Interval): Promise<Dataset> {
        const from: number = Math.floor(interval.start.toSeconds());
        const to: number = Math.floor(interval.end.toSeconds());

        const response = await fetch(
            this.configuration.baseUrl + `/edfIndexes/interval?numberOfPoints=${this.configuration.numberOfPoints}&type=PEAK_HOUR&from=${from}&to=${to}`,
            {credentials: 'include'})
        const body = await response.json() as EdfIndexDto[]

        return new Dataset(body.map(element => new TimedPoint(element.value, DateTime.fromISO(element.measureInstant))));
    }
}
