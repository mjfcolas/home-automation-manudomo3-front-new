import {HomeDataRepository} from "../../domain/repositories/home-data.repository";
import {DateTime, Interval} from "luxon";
import {Dataset} from "../../domain/entities/dataset";
import {TimedPoint} from "../../domain/entities/timed-point";
import {HomeDataSummary} from "../../domain/entities/home-data-summary";
import {TimeStep} from "../../domain/entities/consolidated/time-step";
import {ConsolidatedConsumption} from "../../domain/entities/consolidated/consolidated-consumption";
import {TimeFramedConsumption} from "../../domain/entities/consolidated/time-framed-consumption";

export class DemoHomeDataRepository implements HomeDataRepository {

    async summary(): Promise<HomeDataSummary> {
        return new HomeDataSummary(
            {value: 21.3, unit: "°C"},
            {value: 17.8, unit: "°C"},
            {value: 1010.3, unit: "hPa"},
            {value: 50.3, unit: "€"},
            {value: 0.13, unit: "€/kWh"},
        );
    }

    async consolidatedIndexes(step: TimeStep): Promise<ConsolidatedConsumption> {
        if (step === TimeStep.MONTH) {
            return new ConsolidatedConsumption(
                TimeStep.MONTH,
                [
                    new TimeFramedConsumption(Interval.fromDateTimes(DateTime.fromISO("2017-06-30T22:00:00.000Z"), DateTime.fromISO("2017-07-31T22:00:00.000Z")), 1900293),
                    new TimeFramedConsumption(Interval.fromDateTimes(DateTime.fromISO("2017-07-31T22:00:00.000Z"), DateTime.fromISO("2017-08-31T22:00:00.000Z")), 1900293),
                    new TimeFramedConsumption(Interval.fromDateTimes(DateTime.fromISO("2018-06-30T22:00:00.000Z"), DateTime.fromISO("2018-07-31T22:00:00.000Z")), 1900293),
                    new TimeFramedConsumption(Interval.fromDateTimes(DateTime.fromISO("2018-07-31T22:00:00.000Z"), DateTime.fromISO("2018-08-31T22:00:00.000Z")), 1900293)
                ]
            )
        } else {
            return new ConsolidatedConsumption(
                TimeStep.YEAR,
                [
                    new TimeFramedConsumption(Interval.fromDateTimes(DateTime.fromISO("2016-12-31T23:00:00.000Z"), DateTime.fromISO("2017-12-31T23:00:00.000Z")), 1),
                    new TimeFramedConsumption(Interval.fromDateTimes(DateTime.fromISO("2017-12-31T23:00:00.000Z"), DateTime.fromISO("2018-12-31T23:00:00.000Z")), 2),
                    new TimeFramedConsumption(Interval.fromDateTimes(DateTime.fromISO("2018-12-31T23:00:00.000Z"), DateTime.fromISO("2019-12-31T23:00:00.000Z")), 3),
                    new TimeFramedConsumption(Interval.fromDateTimes(DateTime.fromISO("2019-12-31T23:00:00.000Z"), DateTime.fromISO("2020-12-31T23:00:00.000Z")), 4)
                ]
            )
        }
    }


    async livingRoomTemperatures(interval: Interval): Promise<Dataset> {
        return new Dataset(
            [
                new TimedPoint(20, DateTime.fromISO("2021-12-18T19:34:41.212Z")),
                new TimedPoint(21, DateTime.fromISO("2021-12-18T19:35:41.212Z")),
                new TimedPoint(22, DateTime.fromISO("2021-12-18T19:36:41.212Z")),
                new TimedPoint(23, DateTime.fromISO("2021-12-18T19:36:51.212Z")),
                new TimedPoint(21, DateTime.fromISO("2021-12-18T19:37:21.212Z")),
                new TimedPoint(20, DateTime.fromISO("2021-12-18T19:37:41.212Z")),
                new TimedPoint(18, DateTime.fromISO("2021-12-18T19:38:41.212Z")),

            ]
        )
    }

    async bedroomTemperatures(interval: Interval): Promise<Dataset> {
        return new Dataset(
            [
                new TimedPoint(20, DateTime.fromISO("2021-12-18T19:34:41.212Z")),
                new TimedPoint(18, DateTime.fromISO("2021-12-18T19:35:41.212Z")),
                new TimedPoint(22, DateTime.fromISO("2021-12-18T19:36:41.212Z")),
                new TimedPoint(23, DateTime.fromISO("2021-12-18T19:36:51.212Z")),
                new TimedPoint(25, DateTime.fromISO("2021-12-18T19:37:21.212Z")),
                new TimedPoint(20, DateTime.fromISO("2021-12-18T19:37:41.212Z")),
                new TimedPoint(18, DateTime.fromISO("2021-12-18T19:38:41.212Z")),

            ]
        )
    }

    async atmosphericPressures(interval: Interval): Promise<Dataset> {
        return new Dataset(
            [
                new TimedPoint(1013, DateTime.fromISO("2021-12-18T19:34:41.212Z")),
                new TimedPoint(1013.2, DateTime.fromISO("2021-12-18T19:35:41.212Z")),
                new TimedPoint(1013.5, DateTime.fromISO("2021-12-18T19:36:41.212Z")),
                new TimedPoint(1015.2, DateTime.fromISO("2021-12-18T19:36:51.212Z")),
                new TimedPoint(1014.1, DateTime.fromISO("2021-12-18T19:37:21.212Z")),
                new TimedPoint(1014.1, DateTime.fromISO("2021-12-18T19:37:41.212Z")),
                new TimedPoint(1014.3, DateTime.fromISO("2021-12-18T19:38:41.212Z")),

            ]
        )
    }

    async intensities(interval: Interval): Promise<Dataset> {
        return new Dataset(
            [
                new TimedPoint(1, DateTime.fromISO("2021-12-18T19:34:41.212Z")),
                new TimedPoint(1, DateTime.fromISO("2021-12-18T19:35:41.212Z")),
                new TimedPoint(0, DateTime.fromISO("2021-12-18T19:36:41.212Z")),
                new TimedPoint(0, DateTime.fromISO("2021-12-18T19:36:51.212Z")),
                new TimedPoint(12, DateTime.fromISO("2021-12-18T19:37:21.212Z")),
                new TimedPoint(12, DateTime.fromISO("2021-12-18T19:37:41.212Z")),
                new TimedPoint(10, DateTime.fromISO("2021-12-18T19:38:41.212Z")),

            ]
        )
    }

    async offPeakHourIndexes(interval: Interval): Promise<Dataset> {
        return new Dataset(
            [
                new TimedPoint(5000, DateTime.fromISO("2021-12-18T19:34:41.212Z")),
                new TimedPoint(5005, DateTime.fromISO("2021-12-18T19:35:41.212Z")),
                new TimedPoint(5010, DateTime.fromISO("2021-12-18T19:36:41.212Z")),
                new TimedPoint(5030, DateTime.fromISO("2021-12-18T19:36:51.212Z")),
                new TimedPoint(5050, DateTime.fromISO("2021-12-18T19:37:21.212Z")),
                new TimedPoint(5052, DateTime.fromISO("2021-12-18T19:37:41.212Z")),
                new TimedPoint(5054, DateTime.fromISO("2021-12-18T19:38:41.212Z")),

            ]
        )
    }

    async peakHourIndexes(interval: Interval): Promise<Dataset> {
        return new Dataset(
            [
                new TimedPoint(3000, DateTime.fromISO("2021-12-18T19:34:41.212Z")),
                new TimedPoint(3000, DateTime.fromISO("2021-12-18T19:35:41.212Z")),
                new TimedPoint(3000, DateTime.fromISO("2021-12-18T19:36:41.212Z")),
                new TimedPoint(3000, DateTime.fromISO("2021-12-18T19:36:51.212Z")),
                new TimedPoint(3010, DateTime.fromISO("2021-12-18T19:37:21.212Z")),
                new TimedPoint(3012, DateTime.fromISO("2021-12-18T19:37:41.212Z")),
                new TimedPoint(3014, DateTime.fromISO("2021-12-18T19:38:41.212Z")),

            ]
        )
    }
}
