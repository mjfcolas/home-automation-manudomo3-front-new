import {LoginRepository} from "../../domain/repositories/login.repository";
import {BehaviorSubject, Observable} from "rxjs";
import Cookies from 'js-cookie';
import {ApiConfiguration} from "../web/api-configuration";

export class DemoLoginRepository implements LoginRepository {
    private readonly isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

    constructor(private readonly configuration: ApiConfiguration) {
    }

    observeLogin(): Observable<boolean> {
        return this.isLoggedInSubject;
    }

    login(username: string, password: string): void {
        Cookies.set(this.configuration.loggedInCookieName, "true");
        this.isLoggedInSubject.next(true);
    }

    logout(): void {
        Cookies.remove(this.configuration.loggedInCookieName);
        this.isLoggedInSubject.next(false);
    }

    isLoggedIn(): boolean {
        return this.isLoggedInSubject.value;
    }

}
