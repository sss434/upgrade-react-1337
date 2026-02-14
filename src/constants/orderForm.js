// Константы для компонента OrderForm

export const FORM_VALIDATION_MESSAGES = {
  REQUIRED_FIELDS: 'Заполните все обязательные поля и добавьте хотя бы один товар',
  SELECT_CLIENT: 'Выберите клиента',
  DELIVERY_ADDRESS: 'Введите адрес доставки',
  SELECT_PRODUCT: 'Выберите товар',
  QUANTITY_PLACEHOLDER: 'Кол-во',
  EMPTY_ITEMS: 'Товары не добавлены'
};

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Ожидает обработки' },
  { value: 'processing', label: 'Обрабатывается' },
  { value: 'shipped', label: 'Отправлен' },
  { value: 'delivered', label: 'Доставлен' },
  { value: 'cancelled', label: 'Отменен' }
];

export const BUTTON_LABELS = {
  ADD: 'Добавить',
  DELETE: 'Удалить',
  CANCEL: 'Отмена',
  SAVE: 'Сохранить',
  CREATE: 'Создать заказ'
};

export const FORM_LABELS = {
  CLIENT: 'Клиент',
  DELIVERY_ADDRESS: 'Адрес доставки',
  STATUS: 'Статус',
  PRODUCTS: 'Товары *',
  TOTAL_AMOUNT: 'Общая сумма:'
};

export const MODAL_TITLES = {
  CREATE: 'Создать заказ',
  EDIT: 'Редактировать заказ'
};

export const DEFAULT_FORM_STATE = {
  userId: '',
  deliveryAddress: '',
  status: 'pending',
  items: []
};

export const DEFAULT_QUANTITY = 1;