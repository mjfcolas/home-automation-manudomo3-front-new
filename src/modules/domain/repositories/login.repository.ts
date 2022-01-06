import {Observable} from "rxjs";

export interface LoginRepository {
    isLoggedIn(): boolean;

    observeLogin(): Observable<boolean>;

    login(username: string, password: string): void;

    logout(): void;
}
