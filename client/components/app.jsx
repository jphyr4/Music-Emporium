import React from 'react';
import ProductList from './product-list';
import Header from './header';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <ProductList/>
      </div>
    );
  }
}
