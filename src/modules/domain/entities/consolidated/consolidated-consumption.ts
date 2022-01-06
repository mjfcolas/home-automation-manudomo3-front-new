import {TimeStep} from "./time-step";
import {TimeFramedConsumption} from "./time-framed-consumption";
import {DateTime} from "luxon";

const integerRange = (start: number, end: number) => Array(end - start + 1).fill(undefined).map((_, index) => (start + index));

export class ConsolidatedConsumption {

    private readonly startDate: DateTime;
    private readonly endDate: DateTime;

    constructor(private readonly timeStep: TimeStep, private readonly timeFramedConsumptions: TimeFramedConsumption[]) {
        this.startDate = this.timeFramedConsumptions[0].interval.start;
        this.endDate = this.timeFramedConsumptions[this.timeFramedConsumptions.length - 1].interval.end;
    }

    getLabels(): string[] {
        switch (this.timeStep) {
            case TimeStep.MONTH:
                return integerRange(1, 12).map(value => "month." + value)
            case TimeStep.YEAR:
                return integerRange(this.startDate.year, this.endDate.year).map(value => value.toString())
        }
    }

    getDatasetTitles(): Map<number, string> {
        const result = new Map<number, string>();

        switch (this.timeStep) {
            case TimeStep.MONTH:
                integerRange(this.startDate.year, this.endDate.year).forEach(year => result.set(year, year.toString()))
                break
            case TimeStep.YEAR:
                result.set(0, "All")
                break
        }

        return result;
    }

    getData(): Map<number, ReadonlyArray<number>> {
        const result = new Map<number, number[]>();
        this.timeFramedConsumptions.forEach(timeFramedConsumption => {
            const intervalStart: DateTime = timeFramedConsumption.interval.start;
            switch (this.timeStep) {
                case TimeStep.MONTH:
                    if (!result.has(intervalStart.year)) {
                        result.set(intervalStart.year, Array(12).fill(0))
                    }
                    // @ts-ignore
                    result.get(intervalStart.year)[intervalStart.month - 1] = timeFramedConsumption.summedValue;
                    break
                case TimeStep.YEAR:
                    if (!result.has(0)) {
                        result.set(0, Array(this.endDate.year - this.startDate.year).fill(0))
                    }
                    // @ts-ignore
                    result.get(0)[intervalStart.year - this.startDate.year] = timeFramedConsumption.summedValue;
                    break
            }
        })
        return result;
    }
}
