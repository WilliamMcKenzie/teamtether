import React, { useState } from 'react';
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router-dom';

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const User: React.FC<{ user: UserProps }> = ({ user }) => {
  const userName = user.name

  const [loginField, setLogin] = useState("")
  const [passwordField, setPassword] = useState("")
  const [errorMessage, setError] = useState("")
  var myClass = "form login__form"
  var curLogin = ''
  var curPassword = ''

  const navigate = useNavigate();

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
    console.log({ login: loginField, password: passwordField })

    if (user.name) {
      navigate('/home')
    }
    else {
      setError("User not found")
    }
  }

  return (<form className={myClass} id="login">
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
    // <div onClick={() => Router.push("/p/[id]", `/p/${user.id}`)}>
    //   <h2>{userName}</h2>
    //   <ReactMarkdown children={user.email} />
    //   <style jsx>{`
    //     div {
    //       color: inherit;
    //       padding: 2rem;
    //     }
    //   `}</style>
    // </div>
  );
};

export default User;