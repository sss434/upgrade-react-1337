// Константы для компонента OrderForm

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Ожидает обработки' },
  { value: 'processing', label: 'Обрабатывается' },
  { value: 'shipped', label: 'Отправлен' },
  { value: 'delivered', label: 'Доставлен' },
  { value: 'cancelled', label: 'Отменен' }
];

export const DEFAULT_FORM_STATE = {
  userId: '',
  deliveryAddress: '',
  status: 'pending',
  items: []
};

export const DEFAULT_QUANTITY = 1;