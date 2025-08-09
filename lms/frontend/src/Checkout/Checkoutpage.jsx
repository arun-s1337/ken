
import React, { useState, useEffect } from 'react';
import './Checkoutpage.css';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

function Checkoutpage() {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIncrement = (bookId, format) => {
    setCartItems(cartItems.map(item =>
      item.bookId === bookId && item.format === format
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const handleDecrement = (bookId, format) => {
    setCartItems(cartItems.map(item =>
      item.bookId === bookId && item.format === format && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const handleRemove = (bookId, format) => {
    const updatedCart = cartItems.filter(
      item => !(item.bookId === bookId && item.format === format)
    );
    setCartItems(updatedCart);
    setSelectedItems(selectedItems.filter(
      itemId => itemId !== `${bookId}-${format}`
    ));
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems.includes(`${item.bookId}-${item.format}`))
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map(item => `${item.bookId}-${item.format}`));
    } else {
      setSelectedItems([]);
    }
  };

  const handleItemSelect = (bookId, format) => {
    const itemId = `${bookId}-${format}`;
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  return (
    <div className='pt-[100px] pl-4 mt-5 checkout-container'>
      <div className='checkout-card'>
        <div className='table-responsive'>
          <table className='checkout-table'>
            <thead>
              <tr>
                <th className='text-white'>
                  <input
                    type='checkbox'
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    disabled={cartItems.length === 0}
                  />
                  <span className='ms-2 text-sm'>Select all</span>
                </th>
                <th className='text-white text-sm'>Image</th>
                <th className='text-white text-sm'>Product</th>
                <th className='text-white text-sm'>Quantity</th>
                <th className='text-white text-sm'>Price</th>
                <th className='text-white text-sm'>Total</th>
                <th className='text-white text-sm'>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className='text-center'>Your cart is empty</td>
                </tr>
              ) : (
                cartItems.map(item => (
                  <tr key={`${item.bookId}-${item.format}`} className='cart-item'>
                    <td>
                      <input
                        type='checkbox'
                        checked={selectedItems.includes(`${item.bookId}-${item.format}`)}
                        onChange={() => handleItemSelect(item.bookId, item.format)}
                      />
                    </td>
                    <td>
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/${item.image.replace(/\\/g, '/')}`}
                        alt={item.title}
                        className='cart-item-img'
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100';
                        }}
                      />
                    </td>
                    <td className='product-details'>
                      <strong>{item.title}</strong><br />
                      <small>Format: {item.format}</small><br />
                      <span className='text-warning'>
                        ${item.price.toFixed(2)} x {item.quantity}
                      </span>
                    </td>
                    <td>
                      <div className='quantity-controls'>
                        <button
                          className='qty-btn'
                          onClick={() => handleDecrement(item.bookId, item.format)}
                        >
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className='qty-btn'
                          onClick={() => handleIncrement(item.bookId, item.format)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className='remove-btn'
                        onClick={() => handleRemove(item.bookId, item.format)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
              <tr>
                <td colSpan={6}><b>Total Price</b></td>
                <td><strong>${calculateTotal()}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='total-section'>
          <h5>Total: ${calculateTotal()}</h5>
          <button
            className='checkoutbtn'
            disabled={selectedItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkoutpage;