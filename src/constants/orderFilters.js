// Константы для компонента OrderFilters

export const FILTER_LABELS = {
  TITLE: 'Фильтры',
  SEARCH: 'Поиск',
  STATUS: 'Статус',
  CLIENT: 'Клиент',
  CLEAR: 'Очистить'
};

export const PLACEHOLDERS = {
  SEARCH: 'Поиск по номеру заказа, клиенту...'
};

export const STATUS_OPTIONS = [
  { value: '', label: 'Все статусы' },
  { value: 'pending', label: 'Ожидает обработки' },
  { value: 'processing', label: 'Обрабатывается' },
  { value: 'shipped', label: 'Отправлен' },
  { value: 'delivered', label: 'Доставлен' },
  { value: 'cancelled', label: 'Отменен' }
];

export const CLIENT_OPTIONS_HEADER = { value: '', label: 'Все клиенты' };