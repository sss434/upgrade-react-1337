// Общие константы для всего приложения

export const ORDER_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUSES.PENDING]: 'Ожидает обработки',
  [ORDER_STATUSES.PROCESSING]: 'Обрабатывается',
  [ORDER_STATUSES.SHIPPED]: 'Отправлен',
  [ORDER_STATUSES.DELIVERED]: 'Доставлен',
  [ORDER_STATUSES.CANCELLED]: 'Отменен'
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUSES.PENDING]: '#f59e0b',
  [ORDER_STATUSES.PROCESSING]: '#3b82f6',
  [ORDER_STATUSES.SHIPPED]: '#8b5cf6',
  [ORDER_STATUSES.DELIVERED]: '#10b981',
  [ORDER_STATUSES.CANCELLED]: '#ef4444'
};

export const CURRENCY = 'RUB';

export const DATE_FORMAT = {
  LOCALE: 'ru-RU',
  OPTIONS: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
};

export const PRICE_FORMAT = {
  LOCALE: 'ru-RU',
  OPTIONS: {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: 0
  }
};