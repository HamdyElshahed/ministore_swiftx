// @flow
import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { CountCartItem, DelCartItem } from '../state-management/actions/cart';

export function CartItem(props) {
  const currency = useSelector((state) => state.currency.currency);
  const dispatch = useDispatch();

  function decrement() {
    if (props?.item.count) {
      dispatch(CountCartItem(props?.item, -1))
    }
  }

  return (
    <div className='cartitem' key={props?.item.id}>
      <div className='cartitemleft'>
        <p>{props?.item.name}</p>
        <p>{props?.item?.prices[currency].currency.symbol} {props?.item?.prices[currency].amount}</p>
        <div className='cartitemleft2'>
          {props?.item?.attributes.map((atr) => {
            return <div key={atr.id}>
              <h4 style={{margin:'0' , fontSize:'0.6rem'}}>{atr?.name}</h4>
              {atr?.items.map((item) => {
                return <button key={item.id} className="btn"style={{ backgroundColor: item.value }}>{item.displayValue}</button>
              })}
            </div>
          })}
        </div>
      </div>
      <div className='cartitemright'>
        <div style={{ width: '40%' }}>
          <button className='btn' onClick={() => dispatch(CountCartItem(props?.item, 1))}>+</button>
          <p>{props?.item.count}</p>
          <button className='btn' onClick={() => decrement()}>-</button>
        </div>
        <div style={{ width: '50%' }}>
          <img style={{ width: '100%', height: '150px' }} src={props?.item?.gallery[0]} alt="img"></img>
        </div>
        <div className='btnclose'>

         <button className='btn-body' onClick={() => dispatch(DelCartItem(props?.item.id))}>x</button>
        </div>
      </div>

    </div>
  );
};