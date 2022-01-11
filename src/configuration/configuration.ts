import {IntervalState} from "../modules/domain/state/interval.state";
import {ApiConfiguration} from "../modules/infrastructure/web/api-configuration";
import {WebLoginRepository} from "../modules/infrastructure/web/web-login.repository";
import {WebHomeDataRepository} from "../modules/infrastructure/web/web-home-data.repository";

const configuration: ApiConfiguration = {
    baseUrl: process.env.REACT_APP_MANUDOMO3_API_BASE_URL as string,
    numberOfPoints: 1000,
    loggedInCookieName: "logged-in"
}

export const loginRepository = new WebLoginRepository(configuration);
export const homeDataRepository = new WebHomeDataRepository(configuration);
export const intervalState = new IntervalState();
