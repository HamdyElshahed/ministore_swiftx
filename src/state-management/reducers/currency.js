const obj ={
    currency:0
}
export default function CurrencyReducer(state = obj , action){
    switch (action.type) {
        case 'CHANGE_CURRENCY':
            return {...state , currency: action.payload};
        default :
            return state;
    }
}