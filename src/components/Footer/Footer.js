import React from 'react';
import "./Footer.scss";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'
            style={{
      bottom: '0' ,
      width: '100%',
            background:'#333333'}}
    >
      <div className = "containerr py-4 text-center">
        <div className='flex align-center justify-center text-white fw-3 fs-14'>
          <Link to = "/" className='text-uppercase'>
            Chính sách bảo mật</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div className='vert-line'></div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to = "/" className='text-uppercase'>

            Thời hạn dịch vụ</Link>
          <div className='vert-line'></div>
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to = "/" className='text-uppercase'>Về chúng tôi.</Link>
        </div>
        <span className='text-white copyright-text text-manrope fs-14 fw-3'>&copy; 2023 Mua gì đây!.
Đã đăng ký Bản quyền.</span>
      </div>
    </footer>
  )
}

export default Footer
