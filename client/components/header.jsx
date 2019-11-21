import React from 'react';

function Header(props) {

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <h1 className="col-8">Wicked Sales</h1>

        <i className="fas fa-shopping-cart fa-3x">{props.cartItemCount}</i>
      </nav>

    </div>
  );

}
export default Header;
