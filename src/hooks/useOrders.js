import { useState, useCallback } from 'react';
import { orders as initialOrders, products, users } from '../mockData.js';

export const useOrders = () => {
  const [orders, setOrders] = useState(initialOrders);

  // Создание нового заказа
  const createOrder = useCallback((orderData) => {
    const newOrder = {
      id: Math.max(...orders.map(o => o.id)) + 1,
      orderDate: new Date().toISOString(),
      status: 'pending',
      totalAmount: orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      ...orderData
    };
    
    setOrders(prev => [...prev, newOrder]);
    return newOrder;
  }, [orders]);

  // Обновление заказа
  const updateOrder = useCallback((orderId, updates) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, ...updates };
        // Пересчитываем общую сумму если изменились товары
        if (updates.items) {
          updatedOrder.totalAmount = updates.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        }
        return updatedOrder;
      }
      return order;
    }));
  }, []);

  // Удаление заказа
  const deleteOrder = useCallback((orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  }, []);

  // Получение заказа по ID
  const getOrderById = useCallback((orderId) => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  // Получение заказов пользователя
  const getUserOrders = useCallback((userId) => {
    return orders.filter(order => order.userId === userId);
  }, [orders]);

  // Получение заказов с полной информацией
  const getOrdersWithDetails = useCallback(() => {
    return orders.map(order => ({
      ...order,
      user: users.find(u => u.id === order.userId),
      items: order.items.map(item => ({
        ...item,
        product: products.find(p => p.id === item.productId)
      }))
    }));
  }, [orders]);

  return {
    orders,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    getUserOrders,
    getOrdersWithDetails
  };
};