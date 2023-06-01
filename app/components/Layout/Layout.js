"use client";

import Header from '../Header/Header';
import Nav from '../Nav/Nav';
// import Cart from 'components/Cart/Cart';
import Newsletter from '../Newsletter/Newsletter';
import Footer from '../Footer/Footer';

const Layout = ({ children, components }) => {
  //console.log('components', JSON.stringify(components, null, 2));

  return (
    <>
      <Header content={components.header[0]} />
      <Nav content={components.header[0]} />
      {/* <Cart content={components.cart[0]} /> */}
      {children}
      <Newsletter content={components.newsletter[0]} />
      <Footer content={components.footer[0]} />
    </>
  );
};

export default Layout;
