import React, {useEffect, useState} from "react";
import {emailCheck, findAccountByEmail, sendMailForgetPass} from "../../service/UserService";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export function ForgotPass() {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [emailError,setEmailError] = useState("")
    const [listEmail, setListEmail] = useState([]);
    const [check,setCheck] = useState(false);
    const [account, setAccount] = useState({})
    useEffect(() => {
        emailCheck().then((res)=>{
            setListEmail(res.data)
        })
    }, [check,emailError]);
    function validateEmail(e) {
        let flag = false
        const emailCheck = e.target.value
        const errors = {};
        for (let i = 0; i < listEmail.length; i++) {
            if (listEmail[i] === emailCheck.toString().toLowerCase()){
                setCheck(true)
                flag = true
                errors.email = ''
                setEmailError(errors)
                setEmail(emailCheck)
                findAccountByEmail(emailCheck).then((res)=>{
                    setAccount(res.data)
                })
                return
            } else {
                setCheck(false)
            }
        }
        if (!flag) {
            errors.email = 'Email chưa đăng ký tài khoản!'
            setEmailError(errors)
        }

    }
    function submitEmail() {
        let user = {
            name: 'http://localhost:3000/password-new/'+account.id,
            username: account.id,
            password: '',
            email: email
        }
        sendMailForgetPass(user).then(()=>{
            toast.success("Vui lòng kiểm tra hộp thư trong email của bạn!", {autoClose: 1000})
            localStorage.setItem('acc',account.id)
            navigate("/")
        })

    }

    return(
        <>
            <div className={'login-container col-12 col-sm-4 '} style={{fontSize:'14px'}}>
                <div className={'title'}>Quên mật khẩu</div>
                <div className={'text'}>Nhập email</div>
                <div className={'input-password'}>
                    <input placeholder={'Nhập email của bạn'}
                    type={"email"}   onChange={validateEmail}/>

                </div>
                <div style={{color:"red"}}> {emailError && <div className="error-message">{emailError.email}</div>}</div>
                <div style={{marginLeft:'10%'}}>
                    <button className={check ? "active":""}
                            disabled={!check}
                            onClick={submitEmail}
                    >Xác thực
                    </button>
                </div>
            </div>
        </>
    )
}