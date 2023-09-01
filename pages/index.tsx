import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Chats from '../components/Chats';
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
  var user
  const [chats, setChats] = useState([]);
  const [chatsMessages, setMessages] = useState([]);


  const GetChats = async () => {
    var chats = await fetcher(`/api/chats?name=${user.name}&email=${user.email}&password=${user.password}`, false);
    setChats(chats)
  }
  const GetMessages = async (chat) => {
    var messages = await fetcher(`/api/texts?id=${chat.id}`, false);
    setMessages(messages)
    console.log(chatsMessages)
  }


  //get user
  if (router.query.user) {
    user = JSON.parse(router.query.user as string)
    GetChats()
  }
  else {
    user = { id: '0e16f8f8-cc53-4401-acb3-9c94376255fc', password: '$piderman12', name: 'Will', email: 'williamqmckenzie@gmail.com', icon: 'https://api.dicebear.com/6.x/identicon/svg?seed=9627', role: "ADMIN" }
    useEffect(() => {
      router.push('/login')
    }, [])
  }

  var [popupClass, setPopupClass] = useState("home__popup container")
  var [curIcon, setCurIcon] = useState(user.icon)
  var [maskClass, setMaskClass] = useState('mask')
  var [errorMessage, setError] = useState('')

  var [newIcon, setIcon] = useState(user.icon)
  var [newName, setName] = useState(user.name)
  var [newEmail, setEmail] = useState(user.email)
  var [newPassword, setPassword] = useState(user.password)
  const [animated, setAnimated] = useState(false);

  const GoToLogin = async () => {
    router.push({
      pathname: '/login',
      query: { user: "s" }
    }, '/login')
  }

  const PopupConfig = () => {
    setPopupClass('home__popup container')
    setMaskClass('mask')
  }

  const UpdateName = event => {
    newName = event.target.value
    setName(newName)
  }
  const UpdateEmail = event => {
    newEmail = event.target.value
    setEmail(newEmail)
  }
  const UpdatePassword = event => {
    newPassword = event.target.value
    setPassword(newPassword)
  }
  const UpdateIcon = () => {
    setIcon(`https://api.dicebear.com/6.x/identicon/svg?seed=${Math.floor(Math.random() * 10000)}`)
  }

  const UpdateUser = async () => {
    if (newName.length > 0 && newEmail.length > 3 && newPassword.length > 0) {
      console.log(newName.length)
      var res = await fetcher(`/api/update?name=${user.name}&email=${user.email}&password=${user.password}&icon=${user.icon}&newName=${newName}&newEmail=${newEmail}&newPassword=${newPassword}&newIcon=${newIcon}`, false);

      setError("")
      if (!res.name) {
        console.log(res)
        console.log(user)
      }
      else {
        user = res
        router.replace({
          pathname: '/',
          query: { user: JSON.stringify(res) }
        }, '/')
        console.log(user)
        setPopupClass("home__popup container hidden")
        setCurIcon(newIcon)
        setMaskClass('')
      }
    }
    else {
      setError("Invalid parameters")
    }
  }

  const CancelUpdate = () => {
    setPopupClass("home__popup container hidden")
    setMaskClass('')
    setIcon(user.icon)
    setName(user.name)
    setEmail(user.email)
    setPassword(user.password)
  }

  return (<div className='home'>
    <div className={maskClass}></div>
    <div className='home__navbar'>

    </div>
    <div className={popupClass}>
      <button className='home__popup__close' onClick={CancelUpdate}>
        <img className='home__popup__close_icon'></img>
      </button>
      <div className="form__input-group">
        <img src={newIcon} className='home__popup__image'></img>
        <button className='home__popup__image_refresh' onClick={UpdateIcon} onMouseDown={() => setAnimated(() => true)}
          onAnimationEnd={() => setAnimated(() => false)}>
          <img className={animated ? 'home__popup__image_refresh_icon spin' : 'home__popup__image_refresh_icon'}></img>
        </button>
      </div>
      <h1 className="form__title" onClick={GoToLogin}>Edit profile</h1>
      <div className="form__message form__message--error">{errorMessage}</div>
      <div className="form__input-group home__popup_name_group">
        <label>Name:</label>
        <input type="text" className="form__input" onChange={UpdateName} value={newName} autoFocus placeholder="New Username"></input>
        <div className="form__input-error-message"></div>
      </div>
      <div className="form__input-group home__popup_name_group">
        <label>Email:</label>
        <input type="text" className="form__input" onChange={UpdateEmail} value={newEmail} autoFocus placeholder="New Email"></input>
        <div className="form__input-error-message"></div>
      </div>
      <div className="form__input-group home__popup_name_group">
        <label>Password:</label>
        <input type="password" className="form__input" onChange={UpdatePassword} value={newPassword} autoFocus placeholder="New Password"></input>
        <div className="form__input-error-message"></div>
      </div>
      <div className="home__popup-confirmation">
        <button className="form__button" type="button" onClick={UpdateUser}>Save</button>
        <button className="home__popup-cancel" type="button" onClick={CancelUpdate}>Cancel</button>
      </div>
    </div>
    <div className='home__sidebar'>
      <div className='home__sidebar_top'>
        <button className='home__userIcon__container' onClick={PopupConfig}>
          <img className='home__userIcon' src={curIcon}></img>
        </button>
        <h1>{user.name}</h1>
      </div>
      <div className='home__sidebar_bottom' onClick={GetChats}>
        <div>
          {chats.map((chat) => (
            <button onClick={() => GetMessages(chat)}>
              <img src={chat.users[0].icon}></img>
              <h1>{chat.name}</h1>
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className='home__content'>
      {chatsMessages.map((message) => (
        <button className='message'>
          <div className='message_content'>
            <div className='message_author_info'>
              <img src={message.authorIcon}></img>
              <div>
                <h1>{message.title}</h1>
                <p>Posted by {message.authorName}</p>
              </div>
            </div>
            <p>{message.content.length < 300 ? "" : message.content}</p>
            {message.content.length < 300 ? <div /> : <div className='bottom_gradient'></div>}
          </div>
          <div className='message_options'>
            <img src='https://cdn-icons-png.flaticon.com/512/126/126473.png'></img>
            <img src='https://cdn-icons-png.flaticon.com/512/126/126504.png'></img>
            <img src='https://cdn-icons-png.flaticon.com/512/1358/1358023.png'></img>
            <img src='https://cdn-icons-png.flaticon.com/512/1380/1380338.png'></img>
          </div>
        </button>
      ))
      }
    </div>
  </div>)
}

export default TeamTether
