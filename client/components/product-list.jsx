import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    };
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(err => console.error('Fetch failed!', err));
  }

  render() {
    const tempArray = this.state.products.map((product, index) => <ProductListItem key={index} product={product} />);
    return (
      <div>
        <div className="container col-md-19">
          <div className="row">

            {tempArray}

          </div>
        </div>
      </div>
    );
  }
}
