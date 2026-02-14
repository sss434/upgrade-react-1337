import { 
  PRICE_FORMAT, 
  DATE_FORMAT, 
  ORDER_STATUS_LABELS, 
  ORDER_STATUS_COLORS 
} from '../constants/common.js';

// Форматирование цены
export const formatPrice = (price) => {
  return new Intl.NumberFormat(PRICE_FORMAT.LOCALE, PRICE_FORMAT.OPTIONS).format(price);
};

// Форматирование даты
export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat(DATE_FORMAT.LOCALE, DATE_FORMAT.OPTIONS).format(new Date(dateString));
};

// Форматирование статуса заказа
export const formatOrderStatus = (status) => {
  return ORDER_STATUS_LABELS[status] || status;
};

// Получение цвета статуса для UI
export const getStatusColor = (status) => {
  return ORDER_STATUS_COLORS[status] || '#6b7280';
};