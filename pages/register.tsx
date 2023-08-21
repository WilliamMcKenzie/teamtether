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
//s

const TeamTether = () => {
    const [nameField, setName] = useState("")
    const [emailField, setEmail] = useState("")
    const [passwordField, setPassword] = useState("")
    const [errorMessage, setError] = useState("")
    var myClass = "form register__form"
    var curName = ''
    var curEmail = ''
    var curPassword = ''

    const UpdateName = event => {
        curName = event.target.value
        console.log(curName)
        setName(curName)
    }
    const UpdateEmail = event => {
        curEmail = event.target.value
        console.log(curEmail)
        setEmail(curEmail)
    }
    const UpdatePassword = event => {
        curPassword = event.target.value
        console.log(curPassword)
        setPassword(curPassword)
    }
    const Register = async () => {
        var res = await fetcher(`teamtether.williamqm.com/api/register?name=${nameField}&email=${emailField}&password=${passwordField}`, false);

        if (!res.name) setError("Email or username & password combination taken")
        else console.log(res)
    }

    return (<div className='container'>
        <form className={myClass} id="createAccount">
            <h1 className="form__title">Sign Up</h1>
            <div className="form__message form__message--error">{errorMessage}</div>
            <div className="form__input-group">
                <input type="text" className="form__input" id="username" onChange={UpdateName} value={nameField} autoFocus placeholder="Username"></input>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="text" className="form__input" onChange={UpdateEmail} value={emailField} placeholder="Email"></input>
                <div className="form__input-error-message"></div>
            </div>
            <div className="form__input-group">
                <input type="password" className="form__input" onChange={UpdatePassword} value={passwordField} placeholder="Password"></input>
                <div className="form__input-error-message"></div>
            </div>
            <button className="form__button" type="button" onClick={Register}>Submit</button>
        </form>
    </div>)
}

export default TeamTether
