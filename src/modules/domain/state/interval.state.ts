import {BehaviorSubject, Observable} from "rxjs";
import {DateTime, Duration, Interval} from "luxon";

export class IntervalState {
    private readonly currentIntervalSubject: BehaviorSubject<Interval>

    constructor() {
        this.currentIntervalSubject = new BehaviorSubject(Interval
            .fromDateTimes(
                DateTime.now().minus(Duration.fromObject({days: 1})),
                DateTime.now()));
    }

    currentInterval(): Interval{
        return this.currentIntervalSubject.value
    }

    updateInterval(newInterval: Interval): void{
        this.currentIntervalSubject.next(newInterval);
    }

    observeInterval(): Observable<Interval>{
        return this.currentIntervalSubject;
    }
}
