import React, {useContext, useEffect, useState} from 'react';
import "./CartModal.scss";
import { shopping_cart } from '../../utils/images';
import { formatPrice } from '../../utils/helpers';
import {showCart} from "../../service/CartService";
import {AppContext} from "../../Context/AppContext";

const CartModal = () => {
    const [carts, setCarts] = useState([]);
    const idAccount = localStorage.getItem("account");
    const {isFlag } = useContext(AppContext);

    // const cats = JSON.parse(localStorage.getItem("cart"))


    useEffect(() => {
        showCart(idAccount).then((response) => {
            setCarts(response)
        })


    },[idAccount ,isFlag])
  return (
    <div className='cart-modal'>
      <h5 className='cart-modal-title fw-5 fs-15 font-manrope text-center'>Sản phẩm đã thêm gần đây</h5>
      {
        (carts?.length > 0) ? (
          <div className='cart-modal-list grid'>
            {
                carts.map(cart => {
                return (
                  <div className='cart-modal-item grid align-center font-manrope py-2' key = {cart.id}>
                    <div className='cart-modal-item-img'>
                      <img src = {cart?.product.image[0].name} alt = "" className='img-cover' />
                    </div>
                    <div className='cart-modal-item-title fs-13 font-manrope text-capitalize'>{cart?.product.name}</div>
                    <div className='cart-modal-item-price text-orange fs-14 fw-6'>
                      {formatPrice(cart?.product.price)}
                    </div>
                  </div>
                )
              })
            }

            <div className='text-capitalize view-cart-btn bg-orange fs-15 font-manrope text-center'>Xem giỏ hàng</div>
          </div>) : (
          <div className = "flex flex-column align-center justify-center cart-modal-empty">
            <img src = {shopping_cart} alt = "" className='' />
            <h6 className='text-dark fw-4'>Không có sản phẩm trong giỏ hàng    </h6>
          </div>
        )
      }
    </div>
  )
}
export default CartModal