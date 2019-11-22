import React from 'react';
import CartSummaryItem from './cartSummaryItem';

function CartSummary(props) {
  const itemMap = props.cartItemProp.map((item, index) => <CartSummaryItem key={index} item={item}/>);
  return (
    <div>
      {itemMap},
      <button onClick={() => props.backToCat('catalog', {})} type="button" className="btn btn-outline-secondary w-25">Back to Catalog</button>
    </div>
  );
}

export default CartSummary;
