import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Chats from '../components/Chats';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';

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
    // useEffect(() => {
    //   router.push('/login')
    // }, [])
  }

  var [popupClass, setPopupClass] = useState("home__popup container hidden")
  var [chatPopupClass, setChatPopupClass] = useState("home__chat_popup container hidden")
  var [curIcon, setCurIcon] = useState(user.icon)
  var [maskClass, setMaskClass] = useState('mask hidden')
  var [errorMessage, setError] = useState('')

  //user popup
  var [newIcon, setIcon] = useState(user.icon)
  var [newName, setName] = useState(user.name)
  var [newEmail, setEmail] = useState(user.email)
  var [newPassword, setPassword] = useState(user.password)
  const [animated, setAnimated] = useState(false);

  //chat popup
  var [newChatName, setChatName] = useState("")
  var [newChatEmail, setChatEmail] = useState("")
  var [newChatPassword, setChatPassword] = useState("")

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

  const addChat = () => {
    setChatPopupClass('home__popup container')
    setMaskClass('mask')
  }
  const CloseAddChat = () => {
    setChatPopupClass('home__popup container hidden')
    setMaskClass('mask hidden')
  }
  const CreateChat = async () => {
    if (newChatName.length > 0 && newChatPassword.length > 0) {
      console.log(`/api/createChat?name=${newChatName}&password=${newChatPassword}&emails=${newChatEmail}`)
      var res = await fetcher(`/api/createChat?name=${newChatName}&password=${newChatPassword}&emails=${newChatEmail}`, false);

      setError("")
      if (!res.name) {
        console.log(res)
      }
      else {
        router.replace({
          pathname: '/',
          query: { user: JSON.stringify(res) }
        }, '/')
        console.log(user)
        setChatPopupClass('home__popup container hidden')
        setMaskClass('mask hidden')
      }
    }
    else {
      setError("Invalid parameters")
    }
  }

  const UpdateChatName = event => {
    newChatName = event.target.value
    setChatName(newChatName)
  }
  const UpdateChatEmails = event => {
    newChatEmail = event.target.value
    setChatEmail(newChatEmail)
  }
  const UpdateChatPassword = event => {
    newChatPassword = event.target.value
    setChatPassword(newChatPassword)
  }

  return (<div className='home'>
    <div className={maskClass}></div>

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
    <div className={chatPopupClass}>
      <button className='home__popup__close' onClick={CloseAddChat}>
        <img className='home__popup__close_icon'></img>
      </button>
      <h1 className="form__title">Create Chat:</h1>
      <div className="form__message form__message--error">{errorMessage}</div>
      <div className="form__input-group home__popup_name_group">
        <label>Name:</label>
        <input type="text" className="form__input" onChange={UpdateChatName} autoFocus placeholder="Chat Name"></input>
        <div className="form__input-error-message"></div>
      </div>
      <div className="form__input-group home__popup_name_group">
        <label>Members Email*:</label>
        <input type="text" className="form__input" onChange={UpdateChatEmails} autoFocus placeholder="Members Emails (seperated by commas)"></input>
        <div className="form__input-error-message"></div>
      </div>
      <div className="form__input-group home__popup_name_group">
        <label>Password:</label>
        <input type="password" className="form__input" onChange={UpdateChatPassword} autoFocus placeholder="Chat password"></input>
        <div className="form__input-error-message"></div>
      </div>
      <div className="home__popup-confirmation">
        <button className="form__button" type="button" onClick={CreateChat}>Create</button>
        <button className="home__popup-cancel" type="button" onClick={CloseAddChat}>Cancel</button>
      </div>
    </div>
    <div className='home__sidebar'>
      <div className='home__sidebar_top'>
        <button className='home__userIcon__container' onClick={PopupConfig}>
          <img className='home__userIcon' src={curIcon}></img>
        </button>
        <div className='home__userInfo__container'>
          <h1>{user.name}</h1>
          <p>{chats.length}{chats.length == 1 ? " Chat" : " Chats"}</p>
        </div>
      </div>
      <div className='home__sidebar_bottom' onClick={GetChats}>
        <div>
          <button className='chatHeader'>
            <h1>Chats</h1>
            <button className='addChatButton' onClick={addChat}>
              <FontAwesomeIcon icon={faPlus} className='addChatIcon'></FontAwesomeIcon>
            </button>
          </button>
          {chats.map((chat) => (
            <button onClick={() => GetMessages(chat)} className='chat'>
              <img src={chat.users[0] == true ? chat.users[0].icon : "https://api.dicebear.com/6.x/identicon/svg?seed=9627"}></img>
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
                <p className='noPadding'>Posted by {message.authorName}</p>
              </div>
            </div>
            <p>{message.content}
              {message.content.length < 400 ? <div /> : <div className='bottom_gradient'></div>}
            </p>
          </div>
          <div className='message_options'>
            <FontAwesomeIcon icon={faThumbsUp} className='message_icon'></FontAwesomeIcon>
            <FontAwesomeIcon icon={faThumbsDown} className='message_icon'></FontAwesomeIcon>
            <FontAwesomeIcon icon={faShare} className='message_icon'></FontAwesomeIcon>
          </div>
        </button>
      ))
      }
    </div>
  </div>)
}

export default TeamTether
