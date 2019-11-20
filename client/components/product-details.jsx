import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: ''
    };

  }

  componentDidMount() {
    this.getProductDetails();
  }

  getProductDetails() {
    fetch('/api/products?productId=1')
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(err => console.error('Fetch failed!', err));
  }

  render() {

    const realPrice = this.state.product.price / 100;
    return (
      <div className="container" style={{ width: '60rem', height: '25rem' }}>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="card">
            <img className="card-img-top" src={this.state.product.image} alt="Card image cap" />
            <div className="card-body">
              <h6 className="card-subtitle mb-2 ">{this.state.product.name}</h6>
              <h6 className="card-subtitle mb-2 text-muted">{'$' + realPrice.toFixed(2)}</h6>
              <p className="card-text overflow-auto">{this.state.product.shortDescription}</p>
              <p className="card-text">{this.state.product.longDescription}</p>

            </div>
          </div>
        </div>
      </div>

    );
  }
}
