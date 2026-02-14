/**
 * @typedef {Object} User
 * @property {number} id - ID пользователя
 * @property {string} name - Имя пользователя
 * @property {string} email - Email пользователя
 * @property {string} phone - Телефон пользователя
 * @property {string} address - Адрес пользователя
 */

/**
 * @typedef {Object} Product
 * @property {number} id - ID товара
 * @property {string} name - Название товара
 * @property {number} price - Цена товара
 * @property {string} category - Категория товара
 * @property {string} description - Описание товара
 * @property {string} image - URL изображения товара
 * @property {boolean} inStock - Наличие товара
 */

/**
 * @typedef {Object} OrderItem
 * @property {number} productId - ID товара
 * @property {number} quantity - Количество товара
 * @property {number} price - Цена за единицу товара
 */

/**
 * @typedef {Object} Order
 * @property {number} id - ID заказа
 * @property {number} userId - ID пользователя
 * @property {string} orderDate - Дата заказа в ISO формате
 * @property {string} status - Статус заказа (pending, processing, shipped, delivered, cancelled)
 * @property {number} totalAmount - Общая сумма заказа
 * @property {string} deliveryAddress - Адрес доставки
 * @property {OrderItem[]} items - Список товаров в заказе
 * @property {User} [user] - Информация о пользователе (может быть добавлена)
 */

/**
 * @typedef {Object} OrderListProps
 * @property {Order[]} orders - Список заказов для отображения
 * @property {function(Order): void} onEditOrder - Колбэк для редактирования заказа
 * @property {function(number): void} onDeleteOrder - Колбэк для удаления заказа
 * @property {function(Order): void} onViewOrder - Колбэк для просмотра деталей заказа
 */

/**
 * @typedef {Object} OrderFormProps
 * @property {Order} [order] - Заказ для редактирования (опционально)
 * @property {function(Object): void} onSubmit - Колбэк для сохранения заказа
 * @property {function(): void} onCancel - Колбэк для отмены
 */

/**
 * @typedef {Object} OrderDetailsProps
 * @property {Order} order - Заказ для отображения
 * @property {function(): void} onClose - Колбэк для закрытия
 * @property {function(Order): void} onEdit - Колбэк для редактирования
 */

/**
 * @typedef {Object} OrderFiltersProps
 * @property {Object} filters - Объект с фильтрами
 * @property {function(Object): void} onFiltersChange - Колбэк для изменения фильтров
 */

/**
 * @typedef {Object} Filters
 * @property {string} status - Фильтр по статусу
 * @property {string} userId - Фильтр по пользователю
 * @property {string} search - Поисковый запрос
 */

export {};