import {Interval} from "luxon";
import {Dataset} from "../entities/dataset";
import {HomeDataSummary} from "../entities/home-data-summary";
import {TimeStep} from "../entities/consolidated/time-step";
import {ConsolidatedConsumption} from "../entities/consolidated/consolidated-consumption";

export interface HomeDataRepository {
    summary(): Promise<HomeDataSummary>;

    livingRoomTemperatures(interval: Interval): Promise<Dataset>;

    bedroomTemperatures(interval: Interval): Promise<Dataset>;

    atmosphericPressures(interval: Interval): Promise<Dataset>;

    intensities(interval: Interval): Promise<Dataset>;

    peakHourIndexes(interval: Interval): Promise<Dataset>;

    offPeakHourIndexes(interval: Interval): Promise<Dataset>;

    consolidatedIndexes(step: TimeStep): Promise<ConsolidatedConsumption>
}
