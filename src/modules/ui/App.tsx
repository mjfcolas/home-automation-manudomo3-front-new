import React, {FunctionComponent, useEffect, useState} from 'react';
import './App.css';
import Header from "./header/header";
import HomeData from "./home-data/home-data";
import {Subscription} from "rxjs";
import {loginRepository} from "../../configuration/configuration";
import Login from "./components/login/login";

const App: FunctionComponent = () => {

    const [
        loggedIn,
        setLoggedIn
    ] = useState<boolean>(loginRepository.isLoggedIn());

    useEffect(() => {
        const subscription: Subscription = loginRepository
            .observeLogin()
            .subscribe(newLoggedIn => setLoggedIn(newLoggedIn))
        return subscription.unsubscribe
    }, []);


    if (loggedIn) {
        return (
            <div className="App">
                <Header/>
                <HomeData/>
            </div>
        )
    } else {
        return (
            <Login/>
        )
    }
}

export default App;
