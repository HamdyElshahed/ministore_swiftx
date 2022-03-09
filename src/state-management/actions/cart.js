export const SetCart =  (data) => {
    return {type: 'SET_CART' , payload : data}
}
export const DelCartItem = (id) =>{
    return {
        type : 'DELETE_ITEM',
        payload : id
    }
}
export const CountCartItem = (item , op) =>{
    return {
        type : 'COUNT_ITEM',
        payload : {item , op}
    }
}