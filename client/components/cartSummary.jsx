import React from 'react';
import CartSummaryItem from './cartSummaryItem';

function CartSummary(props) {
  const itemMap = props.cartItemProp.map((item, index) => <CartSummaryItem key={index} item={item}/>);
  const totalPrice = props.cartItemProp.reduce((total, value) => (total + value.price), 0);
  const total = totalPrice / 100;
  return (
    <div>
      {itemMap},
      <div className="text-center">
        <h1>Total: ${total.toFixed(2)}</h1>
      </div>
      <div className="text-center">
        <button onClick={() => props.backToCat('catalog', {})} type="button" className="btn btn-outline-secondary w-25 pagination-centered">Back to Catalog</button>
      </div>
    </div>
  );
}

export default CartSummary;
