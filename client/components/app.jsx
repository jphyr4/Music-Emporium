import React from 'react';
import ProductList from './product-list';
import Header from './header';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },

      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCart();
  }

  setView(name, params) {
    const viewState = {
      name: name,
      params: params
    };
    this.setState({ view: viewState });
  }

  getCart() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => console.error('Fetch failed!', err));
  }

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => this.setState({ cart: this.state.cart.concat(data) }))
      .catch(err => console.error('Fetch failed!', err));
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length}/>,
          <ProductList setView={this.setView}/>
        </div>

      );
    } else {
      return (
        <div>
          <Header cartItemCount={this.state.cart.length}/>,
          <ProductDetails setView={this.setView} stateProp={this.state.view.params} addToCart={this.addToCart}/>
        </div>
      );

    }
  }
}
