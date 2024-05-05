import './/Login.scss';
import {useContext, useState} from "react";
import {toast} from "react-toastify";
import {loginApi} from "../../service/UserService";
import {Link, useNavigate} from "react-router-dom";
import {AppContext} from "../../Context/AppContext";


import axios from "axios";
import {useEffect} from "react";
import {GoogleLogin} from 'react-google-login';
import {loadGapiInsideDOM} from "gapi-script";

export default function Login() {
    //npm install --save gapi-script
    useEffect(() => {
        (async () => {
            await loadGapiInsideDOM();
        })();
    });
    const [error, setError] = useState('');
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const {login} = useContext(AppContext);
    const navigate = useNavigate();
    const handleLogin = () => {
        if (!email || !password) {
            toast.error("tài khoản mật khẩu không hợp lệ", {autoClose: 800});
            return;
        }
        loginApi({
            username: email,
            password: password,

        }).then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("accountLogin", JSON.stringify(res.data));
                    login()
                    toast.success('Đăng nhập thành công', {autoClose: 800});
                    if (res.data.authorities[0].authority === 'ROLE_ADMIN') {
                        localStorage.setItem("account", JSON.stringify(res.data.id));
                        navigate('/admin')
                    } else {
                        localStorage.setItem("account", JSON.stringify(res.data.id));
                        navigate('/')
                    }
                }
            }
        ).catch((e) => {
                if (e.code === "ERR_BAD_REQUEST") {
                    toast.error('Tài khoản đã bị khóa')
                } else
                    toast.error('Thông tin không chính xác')
            }
        )
    }
    //npm install react-google-login
    const responseGoogle = async (response) => {
        const profileObj = response.profileObj;
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login-google', profileObj);
            if (res.status === 200) {
                login()
                localStorage.setItem("accountLogin", JSON.stringify(res.data));
                toast.success('Đăng nhập thành công', {autoClose: 800});
                if (res.data.authorities[0].authority === 'ROLE_ADMIN') {
                    navigate('/admin')
                } else {
                    localStorage.setItem("account", JSON.stringify(res.data.id));
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message);
            console.error('Đăng nhập thất bại:', error.message);
            if (error.code === "ERR_BAD_REQUEST") {
                toast.error('Tài khoản đã bị khóa')
            } else
                toast.error('Thông tin không chính xác')
        }

    };

    return (
        <>
            <div className={'login-container col-12 col-sm-4 '}>
                <div className={'title'}>Đăng nhập</div>
                <div className={'text'}>Tên đăng nhập</div>
                <input type={'text'}
                       placeholder={'Tên đăng nhập'}
                       value={email}
                       onChange={(event) => setEmail(event.target.value)}/>
                <div className={'text'}>Mật khẩu</div>

                <div className={'input-password'}>
                    <input type={isShowPassword === true ? 'text' : 'password'}
                           placeholder={'Mật khẩu'}
                           value={password}
                           onChange={(event) => setPassword(event.target.value)}/>
                    <i className={isShowPassword === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                       onClick={() => setIsShowPassword(!isShowPassword)}

                    ></i>
                </div>
                <div>
                    <button
                        style={{border: '2px solid #aba5a5'}}
                        className={email && password ? 'active' : ''}
                        disabled={!(email && password)}
                        onClick={() => handleLogin()}>
                        Đăng nhập
                    </button>

                </div>
                <GoogleLogin
                    clientId="269490971481-t2biclkpc9opcvedjqsgsldsnhfl8ont.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <div className={'back'}>
                    <Link className={'link'} to={"/forgotPass"}>Quên mật khẩu</Link>

                    <Link className={'link'} style={{marginLeft: '5%'}} to={"/"}>Trở về</Link>
                </div>
            </div>
        </>
    )
}
