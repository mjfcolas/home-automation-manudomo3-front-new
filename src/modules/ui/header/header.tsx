import React, {FunctionComponent} from 'react';
import './header.scss';
import {Interval} from "luxon";
import {intervalState, loginRepository} from "../../../configuration/configuration";
import IntervalPicker from "../components/interval-picker/interval-picker";
import {useTranslation} from "react-i18next";

const defaultInterval: Interval = intervalState.currentInterval()
const defaultStart: Date = defaultInterval.start.toJSDate();
const defaultEnd: Date = defaultInterval.end.toJSDate();
const defaultValue = {start: defaultStart, end: defaultEnd}

const Header: FunctionComponent = () => {

    const {t} = useTranslation();

    const handleIntervalUpdate = ({start, end}: { start: Date, end: Date }) => {
        intervalState.updateInterval(Interval.fromDateTimes(start, end));
    };

    const handleLogout = () => {
        loginRepository.logout()
    }

    return (
        <div className="header">
            <div className={"left-header"}>
            <span className={"header-title"}>{t('application.title')}</span>
            <span className={"interval-picker-container"}>
                <IntervalPicker
                    value={defaultValue}
                    buttonTitle={t("interval_picker.submit")}
                    onChange={handleIntervalUpdate}/>
            </span>
            </div>
            <div className={"right-header"}>
                <button className={"header-logout"} onClick={handleLogout}>{t("header.logout")}</button>
            </div>
        </div>
    )
}


export default Header;
