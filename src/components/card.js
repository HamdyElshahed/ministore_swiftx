// @flow
import '../assets/style/style.css'
import * as React from 'react';
import { useSelector , useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { SetCart } from '../state-management/actions/cart';

export function Card(props) {

  const currencyindex = useSelector((state) => state.currency.currency);
  const dispatch = useDispatch();

  function fnCart(){
    const obj ={...props?.pr}
    obj.attributes =[obj.attributes[0]];
    dispatch(SetCart({...obj,count:1}))
  }
  
  return (
    <div className="card">
      <img style={{ height: '73%', width: '100%' }} src={props?.pr?.gallery[0]} alt="img"></img>
      <Link style={{ textDecoration: 'none'}}to={`/product/${props.pr.id}`}>
        <h3>{props?.pr?.name}</h3>
      </Link>
      <h3>{props?.pr.prices[currencyindex].currency.symbol} {props?.pr?.prices[currencyindex].amount}</h3>

      {props?.pr.inStock && <div className="div-btn">
        <button className="btn-like" onClick={()=> fnCart() }>
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>}
      {!props?.pr?.inStock && <p className='cardstock'>
        OUT OF STOCK
      </p>}
    </div>
  );
};

