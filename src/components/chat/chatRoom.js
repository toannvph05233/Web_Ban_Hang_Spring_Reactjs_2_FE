import React, {useEffect, useRef, useState} from 'react';
import UserService from "../../service/ChatService";
import {toast} from "react-toastify";
import './/chatRomm.css';
import {useWebSocket} from "../../Context/AppContext";

const ChatRoom = () => {
    const [listFriendChat, setListFriendChat] = useState([]);
    const [listFriendInChat, setListFriendInChat] = useState([]);
    const messageInputRef = useRef(null);
    const [newMessage, setNewMessage] = useState('');
    const [idToUser, setIdToUser] = useState([]);
    const [load, setLoad] = useState(true);
    let id = localStorage.getItem("account");
    let toUserId = localStorage.getItem("idAccByShop");
    const webSocket = useWebSocket();
    let avatar_default = "https://firebasestorage.googleapis.com/v0/b/student-152fa.appspot.com/o/image%2Favatar_default.jpg?alt=media&token=d0d61b31-d4fb-4cb2-b9db-356df4c98b8d"




    useEffect(() => {
        window.scrollTo(0, 150);
        if (webSocket) {
            webSocket.subscribe('/chat/user/queue', async (message) => {
                const msg = JSON.parse(message.body);
                let principal = {
                    id: msg.fromUser.id,
                    username: msg.fromUser.username,
                };
                try {
                    const response = await UserService.messageAllInFriend(msg.toUser.id, principal);
                    setListFriendInChat(response.data);
                } catch (error) {
                    toast.warning("Không tìm thấy tin nhắn!");
                }
                setLoad(true)
            });
        }
    }, [webSocket]);

    useEffect(() => {
        if (load) {
            var objDiv = document.getElementById("list-message-container");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }, [load]);

    useEffect(() => {
        // if(toUserId == null) {
        //     toUserId = 0
        // }
        // UserService.messageAllFriend(id, toUserId)
        UserService.messageAllFriend(id)
            .then((response) => {
                response.data.sort((a, b) => {
                    return new Date(b.time) - new Date(a.time);
                });
                setListFriendChat(response.data);
                console.log("ban be", response.data)
                setLoad(false)
            })
            .catch((error) => {
                toast.warning("không tìm thấy tin nhắn!");
            });
    }, [load]);

    const messageInFriend = async (toUserId, userName) => {
        let principal = {
            id: localStorage.getItem("account"),
            username: userName
        }
        setIdToUser(toUserId)
        try {
            const response = await UserService.messageAllInFriend(toUserId, principal );
            setListFriendInChat(response.data);
            setLoad(true)
        } catch (error) {
            toast.warning("Không tìm thấy tin nhắn của bạn bè !")
            await error;
        }
    }
    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    }
    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            let message = {
                fromUser: {id:localStorage.getItem("account")},
                toUser: {id:idToUser},
                content: newMessage,
            };
            try {
                const response = await UserService.sendMessage(message);
                console.log(response);
                if (webSocket.readyState === WebSocket.OPEN) {
                    webSocket.send(JSON.stringify({
                        type: 'message',
                        content: message,
                    }));
                }
                setNewMessage('');
            } catch (error) {
                console.log("errors", error)
                toast.warning("Lỗi gửi tin nhắn!");
            }
        }
    }


    function calculateTimeChat(createdAt) {
        const currentTime = new Date();
        const postedTime = new Date(createdAt);
        const timeDiff = currentTime - postedTime;
        if (timeDiff < 60000) {
            return Math.floor(timeDiff / 1000) + " giây trước";
        } else if (timeDiff < 3600000) {
            return Math.floor(timeDiff / 60000) + " phút trước";
        } else if (timeDiff < 86400000) {
            return Math.floor(timeDiff / 3600000) + " giờ trước";
        } else if (timeDiff < 2592000000) {
            return Math.floor(timeDiff / 86400000) + " ngày trước";
        } else if (timeDiff < 31536000000) {
            return Math.floor(timeDiff / 2592000000) + " tháng trước";
        } else {
            return Math.floor(timeDiff / 31536000000) + " năm trước";
        }
    }
    return (

        <div className={"controls1"}>
            <div className={"app-header"}>
                <h1 className={"app-title"}>Ứng dụng Chat</h1>
            </div>
            <div className={"transparent-background"}>
                <div id={"nav-bar-left"}>
                    {listFriendChat.map((m) => (
                        <div className={"friend-list-message"}
                             onClick={() => messageInFriend(m.toUser.id == id ? m.fromUser.id : m.toUser.id, m.toUser.id == id ? m.toUser.username : m.fromUser.username)}>
                            <div className={"flm-1"}>
                                {m.toUser.id == id ? <img className={"img-toUser"}
                                        // src={m.fromUser.avatar} alt=""/> :
                                                          src={avatar_default} alt=""/> :
                                    <img className={"img-toUser"}
                                        // src={m.toUser.avatar} alt=""/>}
                                         src={avatar_default} alt=""/>}
                                <div className={"flm-2"}>
                                    {m.toUser.id == id ? <p className={"p-user-name"}>{m.fromUser.username}</p> :
                                        <p className={"p-user-name"}>{m.toUser.username}</p>}
                                    <div className="content">
                                        <div className="p-content-time">
                                            {m.fromUser.id == id ? <p className={"p-name"}>Bạn: </p> :
                                                <p className={"p-name"}>{m.fromUser.username}</p>}
                                            <p className="p-content">{m.content}.</p>
                                            <p className="flm-time"> {calculateTimeChat(m.time)}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>


                <div id={"div-right"}>

                    {listFriendInChat != null ? (
                            <div>
                                <div id={"list-message-container"}>
                                    {listFriendInChat.map((m) => (
                                        m.toUser.id == id ?
                                            (<div className={"content-message-you"}>
                                                {m.toUser.id == id ?
                                                <img src={avatar_default} className={"img-message-you"} alt=""/> :
                                                <img src={avatar_default} className={"img-message-you"} alt=""/>}
                                                <p className={"message-content-you"}>{m.content}</p>
                                            </div>) :
                                            (<div className={"content-message-me"}>
                                                <p className={"message-content-me"}>{m.content}</p>
                                            </div>)
                                    ))}
                                </div>
                                <div className="message-input-container">
                                    <input id={"send-message-input"}
                                           ref={messageInputRef}
                                           type="text"
                                           value={newMessage}
                                           onChange={handleNewMessageChange}
                                           placeholder=" Nhập tin ..."
                                    />
                                    <button onClick={() => handleSendMessage()} id={"send-message-button"}>Gửi</button>
                                </div>
                            </div>

                        ) :
                        <h4>Hãy Chọn Người Dùng muốn nhắn tin !</h4>}
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;
