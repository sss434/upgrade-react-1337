import { users, products } from '../../mockData.js';
import { formatPrice } from '../formatters.js';

/**
 * Создает опции для селекта пользователей
 * @returns {Array} Массив опций для селекта
 */
export const createUserOptions = () => {
  return users.map(user => ({
    value: user.id.toString(),
    label: `${user.name} (${user.email})`
  }));
};

/**
 * Создает опции для селекта товаров (только в наличии)
 * @returns {Array} Массив опций для селекта
 */
export const createProductOptions = () => {
  return products
    .filter(p => p.inStock)
    .map(product => ({
      value: product.id.toString(),
      label: `${product.name} - ${formatPrice(product.price)}`
    }));
};

/**
 * Вычисляет общую сумму заказа
 * @param {Array} items - Массив товаров в заказе
 * @returns {number} Общая сумма
 */
export const calculateTotalAmount = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

/**
 * Проверяет валидность формы
 * @param {Object} formData - Данные формы
 * @returns {boolean} true если форма валидна
 */
export const validateForm = (formData) => {
  return !!(formData.userId && formData.deliveryAddress && formData.items.length > 0);
};

/**
 * Добавляет товар в заказ или увеличивает количество существующего
 * @param {Array} currentItems - Текущий список товаров
 * @param {Object} product - Товар для добавления
 * @param {number} quantity - Количество
 * @returns {Array} Обновленный список товаров
 */
export const addItemToOrder = (currentItems, product, quantity) => {
  const existingItemIndex = currentItems.findIndex(item => item.productId === product.id);
  
  if (existingItemIndex >= 0) {
    // Увеличиваем количество существующего товара
    const newItems = [...currentItems];
    newItems[existingItemIndex].quantity += quantity;
    return newItems;
  } else {
    // Добавляем новый товар
    const newItem = {
      productId: product.id,
      quantity: quantity,
      price: product.price
    };
    return [...currentItems, newItem];
  }
};

/**
 * Удаляет товар из заказа
 * @param {Array} currentItems - Текущий список товаров
 * @param {number} productId - ID товара для удаления
 * @returns {Array} Обновленный список товаров
 */
export const removeItemFromOrder = (currentItems, productId) => {
  return currentItems.filter(item => item.productId !== productId);
};

/**
 * Обновляет количество товара в заказе
 * @param {Array} currentItems - Текущий список товаров
 * @param {number} productId - ID товара
 * @param {number} newQuantity - Новое количество
 * @returns {Array} Обновленный список товаров
 */
export const updateItemQuantity = (currentItems, productId, newQuantity) => {
  if (newQuantity <= 0) {
    return removeItemFromOrder(currentItems, productId);
  }
  
  return currentItems.map(item =>
    item.productId === productId
      ? { ...item, quantity: newQuantity }
      : item
  );
};