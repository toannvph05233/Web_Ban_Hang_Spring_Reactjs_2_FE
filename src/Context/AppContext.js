import React, { createContext, useContext, useEffect, useState } from 'react';
import Stomp from 'stompjs';
import { showCart } from '../service/CartService';

const AppContext = createContext();

export function useWebSocket() {
    return useContext(AppContext).webSocket;
}

const AppProvider = ({ children }) => {
    const [isFlag, setIsFlag] = useState(true);
    const [carts, setCarts] = useState([]);
    const idAccount = localStorage.getItem('account');
    const [checkLogin, setCheckLogin] = useState(false);
    const [webSocket, setWebSocket] = useState(null);

    useEffect(() => {
        let socket = new WebSocket('ws://localhost:8080/ws/websocket');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            setWebSocket(stompClient);
            if (stompClient.connected) {
                stompClient.subscribe('/chat/user/queue', function (message) {
                    // Xử lý tin nhắn ở đây và gửi thông tin thông qua Context
                });
            }
        });

        return () => {
            // Đóng kết nối WebSocket khi component unmounts
            if (webSocket) {
                webSocket.disconnect();
            }
        };
    }, []);

    const toggleFlag = () => {
        setIsFlag((prevFlag) => !prevFlag);
    };

    const login = () => {
        setCheckLogin(false);
    };

    const logout = () => {
        setCheckLogin(true);
    };

    const showCarts1 = () => {
        showCart(idAccount).then((response) => {
            setCarts(response);
        });
    };

    const appContextValue = {
        isFlag,
        toggleFlag,
        checkLogin,
        login,
        logout,
        carts,
        showCarts1,
        webSocket,
    };

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };