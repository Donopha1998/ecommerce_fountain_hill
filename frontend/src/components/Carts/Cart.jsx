import React, { useState, useEffect } from 'react';
import { List, Typography } from 'antd';
import { getCart } from '../../api';

const { Title } = Typography;

const CartPage = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {

        const fetchCart = async () => {
            try {
                const response = await getCart();
                console.log(response,'response')
                setCart(response.data);
            } catch (error) {
                notification.error({
                    message: 'Error fetching cart',
                    description: 'Failed to fetch cart items',
                  });
               
            }
        };
        fetchCart();
    }, []);

    return (
        <div>
            <Title level={2}>Your Cart</Title>
            <List
                dataSource={cart}
                renderItem={item => (
                    <List.Item>
                        <Title level={5}>{item.name}</Title>
                        <p>${item.price}</p>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default CartPage;
