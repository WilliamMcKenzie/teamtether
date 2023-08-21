import React, { useState } from 'react';
import Layout from "../components/Layout"
import User, { UserProps } from "../components/User"
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url, data) => {
    if (data) {
        return axios.post(url, data).then(res => res.data);
    } else {
        return axios.get(url).then(res => res.data);
    }
};

const TeamTether = () => {
    const [loginField, setLogin] = useState("")
    const [passwordField, setPassword] = useState("")
    const [errorMessage, setError] = useState("")
    var myClass = "form login__form"
    var curLogin = ''
    var curPassword = ''

    const UpdateLogin = event => {
        curLogin = event.target.value
        console.log(curLogin)
        setLogin(curLogin)
    }
    const UpdatePassword = event => {
        curPassword = event.target.value
        console.log(curPassword)
        setPassword(curPassword)
    }
    const Login = async () => {
        var res = await fetcher(`teamtether.williamqm.com/api/login?login=${loginField}&password=${passwordField}`, false);

        if (!res.name) setError("User not found")
        else console.log(res)
    }

    return (<div className='container'>
        <form className={myClass} id="login">
            <h1 className="form__title">Login</h1>
            <div className="form__message form__message--error">{errorMessage}</div>
            <div className="form__input-group">
                <input type="text" className="form__input" onChange={UpdateLogin} value={loginField} autoFocus placeholder="Username/email"></input>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="password" className="form__input" onChange={UpdatePassword} value={passwordField} placeholder="Password"></input>
                <div className="form__input-error-message"></div>
            </div>
            <button className="form__button" type="button" onClick={Login}>Submit</button>
            <p className="form__text">
                <a href="./" className="form__link">Forgot your password?</a>
            </p>
        </form>
    </div>)
}

export default TeamTether
