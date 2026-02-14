# Архитектура проекта

## Принципы организации кода

### Структура компонентов

Каждый компонент располагается в отдельной папке с единственным файлом:

```
ComponentName/
└── index.jsx              # Компонент со всей логикой
```

### Вынесенные модули

Все константы, утилиты и типы вынесены в отдельные папки:

```
constants/                 # Константы по модулям
├── index.js              # Экспорт всех констант
├── common.js             # Общие константы
├── orderList.js          # Константы OrderList
├── orderForm.js          # Константы OrderForm
├── orderDetails.js       # Константы OrderDetails
└── orderFilters.js       # Константы OrderFilters

utils/                     # Утилиты
├── formatters.js         # Общие утилиты форматирования
└── components/           # Утилиты компонентов
    ├── index.js          # Экспорт утилит
    ├── orderForm.js      # Утилиты OrderForm
    └── orderFilters.js   # Утилиты OrderFilters

types/                     # Типы данных
└── index.js              # JSDoc типы
```

### Преимущества такой структуры

1. **Разделение ответственности** - константы, утилиты и типы в отдельных модулях
2. **Переиспользование** - константы и утилиты доступны всем компонентам
3. **Централизация** - все константы в одном месте, легко изменять
4. **Чистота компонентов** - только JSX и логика компонента
5. **Масштабируемость** - легко добавлять новые константы и утилиты

### Соглашения по именованию

- **Папки компонентов**: PascalCase (`OrderList`, `OrderForm`)
- **Файлы компонентов**: `index.jsx`
- **Константы**: camelCase (`orderList.js`, `orderForm.js`)
- **Утилиты**: camelCase (`orderForm.js`, `orderFilters.js`)
- **Типы**: `index.js` в папке types

### Импорты

Импорты компонентов остаются чистыми благодаря `index.jsx`:

```javascript
// ✅ Компоненты
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';

// ✅ Константы
import { BUTTON_LABELS, STATUS_OPTIONS } from './constants/orderForm';
import { ORDER_STATUSES } from './constants/common';

// ✅ Утилиты
import { createUserOptions, validateForm } from './utils/components/orderForm';
import { formatPrice, formatDate } from './utils/formatters';
```

### Разделение ответственности

- **components/ComponentName/index.jsx** - только JSX и логика компонента
- **constants/moduleName.js** - константы, конфигурация, статические данные
- **utils/components/moduleName.js** - чистые функции, бизнес-логика компонентов
- **utils/formatters.js** - общие утилиты форматирования
- **types/index.js** - типы данных (JSDoc комментарии)

### Пример файлов

#### components/OrderList/index.jsx
```javascript
import { formatPrice, formatDate } from '../../utils/formatters';
import { EMPTY_STATE_MESSAGE, BUTTON_LABELS } from '../../constants/orderList';

const OrderList = ({ orders, onEditOrder }) => {
  // JSX и логика компонента
};

export default OrderList;
```

#### constants/orderList.js
```javascript
export const TABLE_COLUMNS = [
  { key: 'id', label: '№ заказа' },
  { key: 'user', label: 'Клиент' }
];

export const EMPTY_STATE_MESSAGE = 'Заказов пока нет';
export const BUTTON_LABELS = {
  VIEW: 'Просмотр',
  EDIT: 'Изменить'
};
```

#### utils/components/orderForm.js
```javascript
export const createUserOptions = () => {
  return users.map(user => ({
    value: user.id.toString(),
    label: user.name
  }));
};

export const validateForm = (formData) => {
  return !!(formData.userId && formData.items.length > 0);
};
```

#### types/index.js
```javascript
/**
 * @typedef {Object} Order
 * @property {number} id - ID заказа
 * @property {string} status - Статус заказа
 */
```

## Дальнейшее развитие

При росте проекта можно добавить:

- `ComponentName.test.js` - тесты компонента
- `ComponentName.stories.js` - Storybook истории
- `ComponentName.module.css` - CSS модули (если нужны кастомные стили)
- `hooks/` - папка с хуками компонента
- `components/` - подкомпоненты

Такая архитектура обеспечивает чистоту кода, легкость поддержки и масштабируемость проекта.