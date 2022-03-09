// @flow
import * as React from 'react';
import { useSelector } from "react-redux";
import { CartItem } from '../components/cartitem';

export function CartPage() {
  const cartData = useSelector((state) => state?.cart?.data);
  return (
    <div className='pl'>
      <h1>Cart</h1>
      {cartData.map((item) => {
        return <CartItem key={item.id} item={item} />
      })}
    </div>
  );
};