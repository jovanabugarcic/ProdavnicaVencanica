
export const addDecimal = (num) => { 
    return (Math.round(num * 100) / 100).toFixed(2); 
} 

export const updateCart = (state) => {
// Calculate items price 
            state.itemsPrice = addDecimal( 
                state.cartItems.reduce( 
                    (acc, item) => acc + item.price * item.qty, 
                    0 
                ) 
            ); 
 
            //Calculate shipping price 
            state.shippingPrice = addDecimal(state.itemsPrice > 1000 ? 0 : 10); 
 
            //Calculate tax price 
            state.taxPrice = 0; 
 
            //Calculate total price 
            state.totalPrice = (Number(state.itemsPrice) + 
Number(state.shippingPrice) + Number(state.taxPrice)).toFixed(2); 
 
            localStorage.setItem('cart', JSON.stringify(state)); 
        return state;
        }
        