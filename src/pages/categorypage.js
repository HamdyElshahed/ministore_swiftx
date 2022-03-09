// @flow
import '../assets/style/style.css';
import * as React from 'react';
import { Card } from '../components/card';
import {
  useQuery,
  gql
} from "@apollo/client";

export  function CategoryPage(props) {
  const CATEGORY_RATES = gql`
  query Product {
    category(input:{title:"${props.name}"}){
        name,
        products{
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
          gallery,
          inStock
        }
    }
  }
 `;
 const { loading, data } = useQuery(CATEGORY_RATES);
 if (loading) {
   return <h3>loading.....</h3>
 }
  return (
    <div className='pl'>
      <h1 >{props.name}</h1>
      <div style={{display: 'flex' , flexWrap : 'wrap', justifyContent: 'space-between'}}>
        {data?.category.products.map((product)=>{
          return <Card key={product.id} pr ={product}  />
        })}
      </div>
     </div>
  );
};