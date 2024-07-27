import React, { useContext, useState, useEffect } from 'react';
import { List, Typography, InputNumber, Button, Space, notification } from 'antd';
import { CartContext } from '../context/cartContext';

const { Title } = Typography;

const Cart = () => {
    const { cart, updateCart, removeFromCart } = useContext(CartContext);
    const [updatedCart, setUpdatedCart] = useState(cart);

    useEffect(() => {
        setUpdatedCart(cart);
    }, [cart]);

    const handleQuantityChange = async (productId, value) => {
        if (value < 1) {
            return;
        }
        try {
            await updateCart(productId, value);
            setUpdatedCart(prevCart => ({
                ...prevCart,
                products: prevCart.products.map(item =>
                    item.product._id === productId
                        ? { ...item, quantity: value }
                        : item
                )
            }));
            notification.success({
                message: 'Cart Updated',
                description: 'Quantity updated successfully.',
            });
        } catch (error) {
            notification.error({
                message: 'Failed to Update Cart',
                description: 'Failed to update items in the cart. Please try again.',
            });
        }
    };

    const handleRemove = async (productId) => {
        try {
            await removeFromCart(productId);
            setUpdatedCart(prevCart => ({
                ...prevCart,
                products: prevCart.products.filter(item => item.product._id !== productId)
            }));
            notification.success({
                message: 'Product Removed',
                description: 'Product was successfully removed from the cart.',
            });
        } catch (error) {
            notification.error({
                message: 'Failed to Remove Product',
                description: 'Failed to remove product from the cart. Please try again.',
            });
        }
    };

    const totalAmount = updatedCart.products.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    return (
        <div className="cart-page">
            <Title level={2}>Shopping Cart</Title>
            <List
                style={{ padding: "2rem" }}
                dataSource={updatedCart.products}
                renderItem={(item) => {
                    const individualAmount = item.product.price * item.quantity;
                    return (
                        <List.Item
                            className="cart-item"
                            style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: "2rem" }}>
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    style={{ width: '80px', height: '50px', marginRight: '10px' }}
                                />
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <div>{item.product.name}</div>
                                    <p>${item.product.price.toFixed(2)}</p>
                                </div>
                                <div>Amount: ${individualAmount.toFixed(2)}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <InputNumber
                                        min={1}
                                        value={item.quantity}
                                        onChange={(value) => handleQuantityChange(item.product._id, value)}
                                        style={{ marginRight: '10px' }}
                                    />
                                    <Button
                                        type="primary"
                                        onClick={() => handleQuantityChange(item.product._id, item.quantity)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => handleRemove(item.product._id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </List.Item>
                    );
                }}
            />
            <div style={{ textAlign: 'right', padding: '1rem' }}>
                <Title level={4}>Total Amount: ${totalAmount.toFixed(2)}</Title>
            </div>
        </div>
    );
};

export default Cart;
