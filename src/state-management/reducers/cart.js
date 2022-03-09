const obj ={
    data:[]
}
export default function CartReducer(state = obj , action){
    switch (action.type) {
        case 'SET_CART':
            return {...state , data: [...state.data , action.payload]};
        case 'DELETE_ITEM':
          const  arr =state.data.filter((item)=>{return item.id !== action.payload })
               return  {
                ...state,
               data :  arr     
                };
                case 'COUNT_ITEM':
                    const array = [...state.data]
                    const index =state.data.indexOf(action.payload.item);
                    array[index].count+=action.payload.op;
                         return  {
                          ...state,
                         data :  array     
                          };
        default :
            return state;
    }
}