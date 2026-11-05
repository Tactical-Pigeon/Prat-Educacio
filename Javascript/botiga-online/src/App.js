import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import { useCart } from './context/CartContext';

const ProtectedCheckout = () => {
  const { cartItems } = useCart();
  return cartItems.length > 0 ? <Checkout /> : <Navigate to="/cart" />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedCheckout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </>
  );
}

export default App;