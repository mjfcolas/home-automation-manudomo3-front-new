import {FunctionComponent, useState} from "react";
import "./login.scss"
import {useTranslation} from "react-i18next";
import {loginRepository} from "../../../../configuration/configuration";

const Login: FunctionComponent = () => {
    const {t} = useTranslation();

    const [
        username,
        setUsername
    ] = useState<string>("");
    const [
        password,
        setPassword
    ] = useState<string>("");

    const handleLogin = () => {
        loginRepository.login(username, password)
    }
    return (
        <div className="login-container">
            <div className={"login"}>
                <input type={"text"} value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       className={"login-element"}/>
                <input type={"password"} value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className={"login-element"}/>
                <button className={"login-element"} type={"button"} onClick={handleLogin}>{t("login.connect")}</button>
            </div>
        </div>
    )
}

export default Login;
