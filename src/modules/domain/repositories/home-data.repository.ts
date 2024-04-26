import {Interval} from "luxon";
import {Dataset} from "../entities/dataset";
import {HomeDataSummary} from "../entities/home-data-summary";
import {TimeStep} from "../entities/consolidated/time-step";
import {ConsolidatedConsumption} from "../entities/consolidated/consolidated-consumption";

export interface HomeDataRepository {
    summary(interval: Interval): Promise<HomeDataSummary>;

    livingRoomTemperatures(interval: Interval): Promise<Dataset>;

    bedroomTemperatures(interval: Interval): Promise<Dataset>;

    bathroomTemperatures(interval: Interval): Promise<Dataset>;

    atmosphericPressures(interval: Interval): Promise<Dataset>;

    livingRoomHygrometries(interval: Interval): Promise<Dataset>;

    bathroomHygrometries(interval: Interval): Promise<Dataset>;

    apparentPowers(interval: Interval): Promise<Dataset>;

    peakHourIndexes(interval: Interval): Promise<Dataset>;

    offPeakHourIndexes(interval: Interval): Promise<Dataset>;

    consolidatedIndexes(step: TimeStep): Promise<ConsolidatedConsumption>
}
