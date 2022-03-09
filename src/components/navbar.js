// @flow
import '../assets/style/style.css'
import * as React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ChangeCurrency } from '../state-management/actions/currency';
import { CartItem } from './cartitem';
import {
  useQuery,
  gql
} from "@apollo/client";

export function Navbar(props) {

  useEffect(() => {
    totalPrice()
  })
  const loc = useLocation();
  const cartdata = useSelector((state) => state?.cart.data);
  const currencyindex = useSelector((state) => state.currency.currency);

  const [total, settotal] = useState(0);

  const dispatch = useDispatch();


  const CURRENCY_QUERY = gql`
  query Product {
    currencies{
      label,
      symbol
    }
  }
 `;
  const { data } = useQuery( CURRENCY_QUERY);

  function totalPrice() {
    var num = 0;
    cartdata.forEach(element => {
      num += (element.prices[currencyindex].amount * element.count);
    });
    settotal(num)
  }

  function myFunction(str) {
    document.getElementById(str).classList.toggle("show");
  }

  return (
    <div className="navbar">
      <div className="navitem1">
        <Link className={[(loc.pathname === '/') ? 'navanchoractive' : 0 , 'navanchor'].join(' ')} to="/" >Ministore</Link>
        <Link className={[(loc.pathname === '/clothes') ? 'navanchoractive' : 0 , 'navanchor'].join(' ')} to="/clothes" >Clothes</Link>
        <Link className={[(loc.pathname === '/tech') ? 'navanchoractive' : 0 , 'navanchor'].join(' ')} to="/tech" > Technology</Link>
      </div>

      <div className="navitem2">
        <a ><i class="fa-brands fa-shopify" style={{ color: '#58E783' }}></i></a>
      </div>

      <div className="navitem3">
        <div className="dropdown">
          <button type="button" onClick={() => myFunction("myDropdown")} className="dropbtn fa-solid fa-cart-shopping"></button>
          <div id="myDropdown" className="dropdown-content" style={{ minWidth: '300px'}}>
            <button className='btnclose btn'  onClick={() => myFunction("myDropdown")}>x</button>
            <h3>MyBag<span> , {cartdata.length} item</span></h3>
            {cartdata.map((item) => {
              return <CartItem key={item.id} item={item} />
            })}
            <p>total :{total}</p>

            <div className='navitem4'>
              <Link  to="/cart">View Bag</Link>
              <button className='productbtn'  style={{width: '45%'}}>Check Out</button>
            </div>
          </div>
        </div>

        <h4>{cartdata.length}</h4>

        <div className="dropdown">
          <button type="button" onClick={() => myFunction("myDropdown2")} className="dropbtn"><i class="fa-solid fa-dollar-sign"></i></button>
          <div id="myDropdown2" className="dropdown-content" style={{ minWidth: '150px'}}>
            {data?.currencies.map((currency , i) =>{
              return <a onClick={() => dispatch(ChangeCurrency(i))}>{currency.symbol} {currency.label}</a>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};