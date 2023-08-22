import React, { useState } from 'react';
import Layout from "../components/Layout"
import User, { UserProps } from "../components/User"
import { useRouter } from 'next/router'
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
  const router = useRouter()
  var user = {
    email
      :
      "sd",
    icon:
      "https://boring-avatars-api.vercel.app/api/avatar?size=9",
    id
      :
      "bf467b53-d778-4b22-b04f-a98643beebe7",
    name
      :
      "ddda",
    password
      :
      "ddd",
    role
      :
      "ADMIN",
  }
  if (router.query.user) {
    user = JSON.parse(router.query.user as string)
  }
  "if (JSON.parse(router.query.user as string).name == true) user = JSON.parse(router.query.user as string)"
  const [loaded, setLoaded] = useState(false);
  var [popupClass, setPopupClass] = useState("home__popup container")
  var [newIcon, setIcon] = useState(user.icon)
  var [newName, setName] = useState(user.name)
  console.log(user);

  const PopupConfig = () => {

  }

  const UpdateName = event => {
    newName = event.target.value
    setName(newName)
  }
  const UpdateIcon = event => {
    newIcon = event.target.value
    setIcon(newIcon)
  }

  return (<div className='home'>
    <div className='mask'></div>
    <div className='home__navbar'>
      <button className='home__userIcon__container' onClick={PopupConfig}>
        <img className='home__userIcon' src={user.icon}></img>
      </button>
    </div>
    <div className={popupClass}>
      <div className="form__input-group">
        <img src='https://boring-avatars-api.vercel.app/api/avatar?size=401&variant=beam' className='home__popup__image'></img>
        <h1 className="form__title">Icon Url</h1>
        <input type="text" className="form__input" autoFocus placeholder="New Profile Url" onChange={UpdateIcon} value={newIcon}></input>
      </div>
      <h1 className="form__title">Username</h1>
      <div className="form__input-group">
        <input type="text" className="form__input" onChange={UpdateName} value={newName} autoFocus placeholder="New Username"></input>
        <div className="form__input-error-message"></div>
      </div>
    </div>
    <div className="home__chats">
      <h1>Chats</h1>
    </div>
    <div className="home__messages">
      <button className='home__messages__message'>
        <button className='home__messages__message__user'>
          <img className='home__messages__userIcon' src={user.icon}></img>
        </button>
        <div>
          <h1>message</h1>
          <p>content</p>
        </div>
      </button>
    </div>
  </div>
  )
}

export default TeamTether
