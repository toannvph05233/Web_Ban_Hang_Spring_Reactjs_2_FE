
import React, {useEffect, useState} from "react";
import {findAccountById, savePass} from "../../service/UserService";
import {useNavigate, useParams} from "react-router-dom";
import "./changePass.scss"
import {toast} from "react-toastify";
export function PasswordNew() {
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [passwordConfirm,setPasswordConfirm] = useState('')
    const [isShowPasswordNew, setIsShowPasswordNew] = useState(false);
    const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);
    let [user,setUser] = useState({});
    const navigate = useNavigate()
    const {id}= useParams()
    useEffect(() => {
        findAccountById(id).then((res)=>{
            setUser(res.data)
            console.log(res.data)
        })
    }, [id]);
    function validatePassword(pass) {
        const errors = {};
        if (!pass) {
            errors.password = 'Bắt buộc phải nhập mật khẩu mới';
        } else if (pass.length < 8) {
            errors.password = 'Mật khẩu mới phải có ít nhất 8 ký tự';
        } else if (!/\d/.test(pass) || !/[a-zA-Z]/.test(pass)) {
            errors.password = 'Mật khẩu mới phải bao gồm cả chữ và số';
        }
        //  else if (pass===passOld) {
        //     errors.password = 'Mật khẩu mới trùng mật khẩu cũ!'
        //     return errors
        // }
        return errors;
    }
    const handlePasswordChange = (event) => {
        const newPassword =   event.target.value;
        setPasswordNew(newPassword);
        const errors = validatePassword(newPassword);
        setPasswordError(errors)
    }
    const handlePasswordConfirmChange = (event) => {
        const passwordconfirm = event.target.value;
        setPasswordConfirm(passwordconfirm)
        const errors = {}
        if (passwordconfirm!==passwordNew){
            errors.cfpass = ("Xác thực mật khẩu không đúng, vui lòng nhập lại!")
        }
        setPasswordError(errors)
    }
    const savePassword=()=> {
        user = {
            ...user,
            password: passwordNew
        }
        savePass(user).then(()=>{
            toast.success("Đổi mật khẩu thành công, vui lòng đăng nhập lại!", {autoClose: 700})
            navigate("/login")
        })
    }
    return (
        <>
            <div className={'login-container col-12 col-sm-4 '} style={{fontSize:'14px'}}>
                <div className={'title'}>Cập nhật mật khẩu mới</div>
                <div className={'text'}>Mật khẩu mới</div>
                <div className={'input-password'}>
                    <input type={isShowPasswordNew === true ? 'text' : 'password'}
                           placeholder={'8-15 ký tự có ít nhất 1 ký tự in hoa'}
                           onChange={handlePasswordChange}/>
                    <i className={isShowPasswordNew === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                       onClick={() => setIsShowPasswordNew(!isShowPasswordNew)}

                    ></i>
                </div>
                <div style={{color:"red"}}> {passwordError && <div className="error-message">{passwordError.password}</div>}</div>
                <div className={'text'}>Nhập lại mật khẩu</div>
                <div className={'input-password'}>
                    <input type={isShowPasswordConfirm === true ? 'text' : 'password'}
                           placeholder={'Xác nhận lại mật khẩu'}
                           onChange={handlePasswordConfirmChange}/>
                    <i className={isShowPasswordConfirm === true ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}
                       onClick={() => setIsShowPasswordConfirm(!isShowPasswordConfirm)}

                    ></i>
                </div>
                <div style={{color:"red"}}> {passwordError && <div className="error-message">{passwordError.cfpass}</div>}</div>

                <div style={{}}>
                    <button
                        style={{border:'1px solid #aba5a5',width:'100px'}} className={ (passwordNew && passwordConfirm)  ? "active":""}
                            disabled={!(passwordNew && passwordConfirm)}
                            onClick={savePassword}
                    >Cập nhật
                    </button>
                </div>

            </div>
        </>
    )
}