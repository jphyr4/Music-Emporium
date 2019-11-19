
import React from 'react';

function ProductListItem(props) {

  const realPrice = props.product.price / 100;

  return (
    <div className="container" style={{ width: '18rem', height: '25rem' }}>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="card">
          <img className="card-img-top" src={props.product.image} alt="Card image cap" />
          <div className="card-body">
            <h6 className="card-subtitle mb-2 ">{props.product.name}</h6>
            <h6 className="card-subtitle mb-2 text-muted">{'$' + realPrice.toFixed(2)}</h6>
            <p className="card-text overflow-auto">{props.product.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );

}
export default ProductListItem;
