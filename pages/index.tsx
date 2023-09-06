import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Chats from '../components/Chats';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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
  var curChat = useRef()
  const [chats, setChats] = useState([]);
  const [chatsMessages, setMessages] = useState([]);

  const GetChats = async () => {
    var chats = await fetcher(`/api/chats?name=${user.name}&email=${user.email}&password=${user.password}`, false);
    setChats(chats)
  }
  const GetMessages = async (chat) => {
    var messages = await fetcher(`/api/texts?id=${chat.id}`, false);
    curChat.current = chat
    var objDiv = document.getElementById("content");
    setMessages(messages)
    objDiv.scrollTop = objDiv.scrollHeight;
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

  //get chats
  if (router.query.chat) {
    curChat = JSON.parse(router.query.chat as string)
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

  //link and image popup
  var [postClass, setPostClass] = useState('postMessage post hidden')
  var [fadeClass, setFadeClass] = useState('fade hidden')

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
      var res = await fetcher(`/api/update?name=${user.name}&email=${user.email}&password=${user.password}&icon=${user.icon}&newName=${newName}&newEmail=${newEmail}&newPassword=${newPassword}&newIcon=${newIcon}`, false);

      setError("")
      if (!res.name) {
      }
      else {
        user = res
        router.replace({
          pathname: '/',
          query: { user: JSON.stringify(res) }
        }, '/')
        setPopupClass("home__popup container hidden")
        setCurIcon(newIcon)
        setMaskClass('')
        GetMessages(curChat.current)
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
      var res = await fetcher(`/api/createChat?name=${newChatName}&password=${newChatPassword}&emails=${newChatEmail}`, false);

      if (!res.name) {
        setError("Invalid Users")
      }
      else {
        router.replace({
          pathname: '/',
          query: { user: JSON.stringify(user) }
        }, '/')
        setChatPopupClass('home__popup container hidden')
        setMaskClass('mask hidden')
      }
    }
    else {
      setError("Invalid Parameters")
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

  const shareMessage = async (id) => {

  }


  const SendMessage = async () => {
    var title = document.querySelector(`.postHeader`).textContent

    var contentEle = document.querySelector(`.postInput`)
    var nodes = contentEle.childNodes
    var content = ""

    for (var i = 0; i < nodes.length; i++) {
      console.log(nodes[i].nodeName)
      switch (nodes[i].nodeName) {
        case '#text': content = content + nodes[i].nodeValue; break;
        case 'DIV': nodes[i].childNodes[0].nodeName == "#text" ? content = content + nodes[i].childNodes[0].nodeValue : content = content + '\n'; break;
        case 'SPAN': content = content + nodes[i].childNodes[0].nodeValue; break;
      }
    }


    var res = await fetcher(`/api/createPost?name=${title}&content=${content}&chat=${JSON.stringify(curChat.current)}&author=${JSON.stringify(user)}`, false);
    setPostClass('postMessage post hidden')
    setFadeClass('fade hidden')
    GetMessages(curChat.current)
  }

  const switchPost = () => {
    if (postClass.includes("hidden")) {
      setPostClass('postMessage post')
      setFadeClass('fade')
    } else {
      setPostClass('postMessage post hidden')
      setFadeClass('fade hidden')
    }
  }

  // const PopupImage = () => {
  //   setImagePopupClass('message__popup container')
  //   setLinkPopupClass('message__popup container hidden')
  // }
  // const ClosePopupImage = () => {
  //   setImagePopupClass('message__popup container hidden')
  // }
  // const AddPopupImage = () => {
  //   const url = "https://www.bleepstatic.com/content/hl-images/2021/10/05/epic-games-store-logo-header.jpg";

  //   var contentEle = document.querySelector(`.postInput`)
  //   var newEle = document.createElement("img")

  //   const newLink = contentEle.appendChild(newEle)
  //   newLink.src = url

  //   setLinkPopupClass('message__popup container hidden')
  // }

  // const PopupLink = () => {
  //   setLinkPopupClass('message__popup container')
  //   setImagePopupClass('message__popup container hidden')
  // }
  // const ClosePopupLink = () => {
  //   setLinkPopupClass('message__popup container hidden')
  // }
  // const AddPopupLink = () => {
  //   const url = "https://developer.mozilla.org/";

  //   var contentEle = document.querySelector(`.postInput`)
  //   var newEle = document.createElement("a")
  //   newEle.innerHTML = `${url}`

  //   const newLink = contentEle.appendChild(newEle)
  //   newLink.href = url

  //   setLinkPopupClass('message__popup container hidden')
  // }


  return (<div className='home'>
    <div className='home__navbar'>
      <div>
        {curChat.current ? <button className='currentChatHeader'>
          {curChat.current.users.length == 1 ? <img src={curChat.current.users[0].icon}></img> : <div className='userIcon_container'>
            <img src={curChat.current.users[0] ? curChat.current.users[0].icon : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} className={curChat.current.users[0] ? "square" : "circle"}></img>
            <img src={curChat.current.users[1] ? curChat.current.users[1].icon : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} className={curChat.current.users[1] ? "square" : "circle"}></img>
            <img src={curChat.current.users[2] ? curChat.current.users[2].icon : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} className={curChat.current.users[2] ? "square" : "circle"}></img>
            <img src={curChat.current.users[3] ? curChat.current.users[3].icon : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} className={curChat.current.users[3] ? "square" : "circle"}></img>
          </div>}
          <h1>{curChat.current.name}</h1>
          <FontAwesomeIcon className='gear' icon={faGear}></FontAwesomeIcon>
        </button> : <div />}
      </div>
    </div>
    <div className='whiteBg'></div>
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
        <input type="text" className="form__input" onChange={UpdateChatEmails} autoFocus placeholder="Members Emails *seperated by commas* *optional*"></input>
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
            <h1>Teams</h1>
            <button className='addChatButton' onClick={addChat}>
              <FontAwesomeIcon icon={faPlus} className='addChatIcon'></FontAwesomeIcon>
            </button>
          </button>
          {chats.map((chat) => (
            <button onClick={() => GetMessages(chat)} className='chat'>
              {chat.users.length == 1 ? <img src={chat.users[0].icon}></img> : <div className='userIcon_container'>
                <img src={chat.users[0] ? chat.users[0].icon : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} className={chat.users[0] ? "square" : "circle"}></img>
                <img src={chat.users[1] ? chat.users[1].icon : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} className={chat.users[1] ? "square" : "circle"}></img>
                <img src={chat.users[2] ? chat.users[2].icon : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} className={chat.users[2] ? "square" : "circle"}></img>
                <img src={chat.users[3] ? chat.users[3].icon : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="} className={chat.users[3] ? "square" : "circle"}></img>
              </div>}
              <h1>{chat.name}</h1>
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className='home__content' id='content'>
      {chatsMessages.map((message) => {
        return (
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
                {message.content.length < 1200 ? <div /> : <div className='bottom_gradient'></div>}
              </p>
            </div>
            <div className='message_options'>
              <FontAwesomeIcon icon={faThumbsUp} className='message_icon' onClick={async () => {
                var res = await fetcher(`/api/likeMessage?id=${message.id}&likes=${message.likes}`, false);
                GetMessages(curChat.current)
              }}></FontAwesomeIcon>
              <h1>{message.likes}</h1>
              <FontAwesomeIcon icon={faThumbsDown} className='message_icon' onClick={async () => {
                var res = await fetcher(`/api/dislikeMessage?id=${message.id}&likes=${message.likes}`, false);
                GetMessages(curChat.current)
              }}></FontAwesomeIcon>
              <FontAwesomeIcon icon={faShare} className='message_icon' onClick={shareMessage}></FontAwesomeIcon>
            </div>
          </button>
        )
      })
      }
      <button className={postClass}>
        {/* <div className={imagePopupClass}>
          <FontAwesomeIcon icon={faXmark} className='message__popup_close' onClick={ClosePopupImage}></FontAwesomeIcon>
          <div className='message__popup_container'>
            <input placeholder='Image Url'></input>
            <FontAwesomeIcon icon={faCheck} onClick={AddPopupImage}></FontAwesomeIcon>
          </div>
        </div>
        <div className={linkPopupClass}>
          <FontAwesomeIcon icon={faXmark} className='message__popup_close' onClick={ClosePopupLink}></FontAwesomeIcon>
          <div className='message__popup_container'>
            <input placeholder='Link Url'></input>
            <FontAwesomeIcon icon={faCheck} onClick={AddPopupLink}></FontAwesomeIcon>
          </div>
        </div> */}
        <div className='message_content'>
          <div className='message_author_info'>
            <div>
              <h1 className='postHeader' contentEditable="true" placeholder='Post Title'>Post Title</h1>
            </div>
          </div>
          <div className='postInput' contentEditable="true" placeholder='Post Content'>
            Post Content
          </div>
        </div>
        <div className='message_options'>
          <FontAwesomeIcon icon={faPaperPlane} className='message_icon' onClick={SendMessage}></FontAwesomeIcon>
          {/* <FontAwesomeIcon icon={faImage} className='message_icon' onClick={PopupImage}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faLink} className='message_icon' onClick={PopupLink}></FontAwesomeIcon> */}
        </div>
      </button>
      <FontAwesomeIcon icon={faPen} className='openMessage' onClick={switchPost}></FontAwesomeIcon>
    </div>
    <div className={fadeClass}></div>
  </div>)
}

export default TeamTether
