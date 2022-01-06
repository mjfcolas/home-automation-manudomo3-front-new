import {FunctionComponent, useState} from "react";
import {DateTime} from "luxon";
import './interval-picker.scss'

const INPUT_DATE_FORMAT = "yyyy-MM-dd'T'hh:mm"
type Interval = {
    start: Date, end: Date
}

export type IntervalPickerProps = {
    value: Interval,
    buttonTitle: string,
    onChange: (interval: Interval) => void
}

const IntervalPicker: FunctionComponent<IntervalPickerProps> = ({value: defaultValue, buttonTitle, onChange}) => {

    const [start, setStart] = useState<string>(DateTime.fromJSDate(defaultValue.start).toFormat(INPUT_DATE_FORMAT))
    const [end, setEnd] = useState<string>(DateTime.fromJSDate(defaultValue.end).toFormat(INPUT_DATE_FORMAT))

    const handleChange = () => {
        const startReturn: Date = new Date(start)
        const endReturn: Date = new Date(end)
        onChange({start: startReturn, end: endReturn})
    }

    return (
        <div className={"interval-picker"}>
            <input type={"datetime-local"} value={start} onChange={e => setStart(e.target.value)} className={"interval-picker-input"}/>
            <input type={"datetime-local"} value={end} onChange={e => setEnd(e.target.value)} className={"interval-picker-input"}/>
            <button onClick={handleChange}>{buttonTitle}</button>
        </div>
    )
}
export default IntervalPicker;
