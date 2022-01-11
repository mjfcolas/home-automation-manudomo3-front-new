import {LoginRepository} from "../../domain/repositories/login.repository";
import {BehaviorSubject, Observable} from "rxjs";
import {ApiConfiguration} from "./api-configuration";
import Cookies from "js-cookie";


export class WebLoginRepository implements LoginRepository {
    private readonly isLoggedInSubject: BehaviorSubject<boolean>;

    constructor(private readonly configuration: ApiConfiguration) {
        this.isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedInInCookie())
    }

    observeLogin(): Observable<boolean> {
        return this.isLoggedInSubject;
    }

    login(username: string, password: string): void {
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        fetch(this.configuration.baseUrl + `/login`, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }).then(_ => this.isLoggedInSubject.next(this.isLoggedInInCookie()));
    }

    logout(): void {
        fetch(this.configuration.baseUrl + `/logout`, {
            method: 'POST',
            credentials: 'include'
        }).then(_ => this.isLoggedInSubject.next(this.isLoggedInInCookie()));
    }

    isLoggedIn(): boolean {
        return this.isLoggedInSubject.value;
    }

    private isLoggedInInCookie(): boolean {
        return Cookies.get(this.configuration.loggedInCookieName) === "true";
    }
}
