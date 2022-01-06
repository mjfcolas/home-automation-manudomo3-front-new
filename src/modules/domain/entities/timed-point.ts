import {DateTime} from "luxon";

export class TimedPoint {
    constructor(readonly value: number, readonly instant: DateTime) {
    }
}
