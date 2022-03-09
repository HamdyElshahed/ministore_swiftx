// @flow
import * as React from 'react';
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetCart } from '../state-management/actions/cart';
import {
  useQuery,
  gql
} from "@apollo/client";
export function ProductPage() {
  const param = useParams();
  const currencyindex = useSelector((state) => state.currency.currency);
  const dispatch = useDispatch();

  const PRODUCT_QUERY = gql`
  query Product {
    product(id:"${param.id}"){
        
          id,
          name ,
          category,
          prices{
            currency {
              label,
              symbol
            },
            amount
          },
          gallery,
          attributes {
            id,
            name,
            type,
            items{
              displayValue,
              value,
              id
            }
          },
          description,
          inStock
        
    }
  }
 `;
  const { loading, data } = useQuery(PRODUCT_QUERY);

  const [attributes, setattributes] = useState([]);
  const [urlimg, seturlimg] = useState();
  
  function setatr(atr, item) {
    const arr = [];
    arr.push(item);
    const obj = { ...atr, items: arr }
    setattributes([...attributes, obj])
  }
  console.log(attributes)
  function setDataCart(data) {
    const obj = {
      ...data,
      attributes: attributes ?? data.attributes
    }

    dispatch(SetCart(obj))
  }

  console.log(data)
  if (loading) {
    return <h3>Loading..... </h3>
  }
  return (
    <div className='pl' style={{ display: 'flex' }}>
      <div style={{ width: "60%", display: 'flex' }}>
        <div style={{ width: "20%" }}>
          {data?.product.gallery.map((pr, index) => {
            return <img key={index} onClick={() => seturlimg(pr)} style={{ width: "100%", height: "8vh" }} src={pr} alt="img" ></img>
          })}

        </div>
        <div style={{ width: "70%" }}>
          <img className='productimg' src={urlimg ?? data?.product.gallery[0]} alt="img"></img>
        </div>
      </div>
      <div style={{ width: "40%" }}>
        <h4>{data?.product.name}</h4>
        <div>
          {data?.product.attributes.map((atr) => {
            return <div key={atr.id}>
              <h3>{atr?.name}</h3>
              {atr?.items.map((item) => {
                return <button className='btn' onClick={() => setatr(atr, item)} key={item.id} style={{ width: '50px' }}>{item.displayValue}</button>
              })}
            </div>
          })}
        </div>
        <h3>price</h3>
        <h3>{data?.product.prices[currencyindex].currency.symbol} {data?.product?.prices[currencyindex].amount}</h3>
        {data?.product.inStock && <button className='productbtn' onClick={() => setDataCart({ ...data?.product, count: 1 })}>ADD TO CART</button>}
        <p dangerouslySetInnerHTML={{ __html: data?.product.description }}></p>
      </div>

    </div>
  );
};