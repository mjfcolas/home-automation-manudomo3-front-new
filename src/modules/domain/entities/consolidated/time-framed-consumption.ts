import {Interval} from "luxon";

export class TimeFramedConsumption {
    constructor(
        public readonly interval: Interval,
        public readonly summedValue: number
    ) {
    }
}
