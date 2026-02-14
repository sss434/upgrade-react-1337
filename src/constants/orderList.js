// Константы для компонента OrderList

export const TABLE_COLUMNS = [
  { key: 'id', label: '№ заказа' },
  { key: 'user', label: 'Клиент' },
  { key: 'orderDate', label: 'Дата' },
  { key: 'status', label: 'Статус' },
  { key: 'totalAmount', label: 'Сумма' },
  { key: 'itemsCount', label: 'Товаров' },
  { key: 'actions', label: 'Действия' }
];

export const EMPTY_STATE_MESSAGE = 'Заказов пока нет';

export const TABLE_MIN_WIDTH = 800;

export const TABLE_TITLE = 'Список заказов';