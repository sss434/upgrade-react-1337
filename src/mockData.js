// Моковые данные для пользователей, продуктов и заказов

// Пользователи
export const users = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan.petrov@example.com",
    phone: "+7 (999) 123-45-67",
    address: "г. Москва, ул. Ленина, д. 10, кв. 15",
  },
  {
    id: 2,
    name: "Мария Сидорова",
    email: "maria.sidorova@example.com",
    phone: "+7 (999) 234-56-78",
    address: "г. Санкт-Петербург, пр. Невский, д. 25, кв. 8",
  },
  {
    id: 3,
    name: "Алексей Козлов",
    email: "alexey.kozlov@example.com",
    phone: "+7 (999) 345-67-89",
    address: "г. Новосибирск, ул. Красный проспект, д. 5, кв. 22",
  },
  {
    id: 4,
    name: "Елена Волкова",
    email: "elena.volkova@example.com",
    phone: "+7 (999) 456-78-90",
    address: "г. Екатеринбург, ул. Малышева, д. 33, кв. 7",
  },
  {
    id: 5,
    name: "Дмитрий Морозов",
    email: "dmitry.morozov@example.com",
    phone: "+7 (999) 567-89-01",
    address: "г. Казань, ул. Баумана, д. 18, кв. 12",
  },
];

// Продукты
export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 89990,
    category: "Электроника",
    description: "Смартфон Apple iPhone 15 Pro 128GB",
    image: "https://example.com/iphone15pro.jpg",
    inStock: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 79990,
    category: "Электроника",
    description: "Смартфон Samsung Galaxy S24 256GB",
    image: "https://example.com/galaxys24.jpg",
    inStock: true,
  },
  {
    id: 3,
    name: "MacBook Air M3",
    price: 129990,
    category: "Компьютеры",
    description: "Ноутбук Apple MacBook Air 13 M3 256GB",
    image: "https://example.com/macbookair.jpg",
    inStock: true,
  },
  {
    id: 4,
    name: "AirPods Pro 2",
    price: 24990,
    category: "Аудио",
    description: "Беспроводные наушники Apple AirPods Pro 2-го поколения",
    image: "https://example.com/airpodspro2.jpg",
    inStock: true,
  },
  {
    id: 5,
    name: "iPad Air",
    price: 69990,
    category: "Планшеты",
    description: "Планшет Apple iPad Air 64GB Wi-Fi",
    image: "https://example.com/ipadair.jpg",
    inStock: false,
  },
  {
    id: 6,
    name: "Apple Watch Series 9",
    price: 39990,
    category: "Носимые устройства",
    description: "Умные часы Apple Watch Series 9 45mm",
    image: "https://example.com/applewatch9.jpg",
    inStock: true,
  },
  {
    id: 7,
    name: "Sony WH-1000XM5",
    price: 29990,
    category: "Аудио",
    description: "Беспроводные наушники с шумоподавлением",
    image: "https://example.com/sonywh1000xm5.jpg",
    inStock: true,
  },
  {
    id: 8,
    name: "Nintendo Switch OLED",
    price: 34990,
    category: "Игровые консоли",
    description: "Игровая консоль Nintendo Switch OLED модель",
    image: "https://example.com/switcholed.jpg",
    inStock: true,
  },
  {
    id: 9,
    name: "Dyson V15 Detect",
    price: 54990,
    category: "Бытовая техника",
    description: "Беспроводной пылесос Dyson V15 Detect",
    image: "https://example.com/dysonv15.jpg",
    inStock: true,
  },
  {
    id: 10,
    name: "Kindle Paperwhite",
    price: 14990,
    category: "Электронные книги",
    description: "Электронная книга Amazon Kindle Paperwhite 11-го поколения",
    image: "https://example.com/kindlepaperwhite.jpg",
    inStock: true,
  },
];

// Заказы
export const orders = [
  {
    id: 1,
    userId: 1,
    orderDate: "2024-02-10T10:30:00Z",
    status: "delivered",
    totalAmount: 114980,
    deliveryAddress: "г. Москва, ул. Ленина, д. 10, кв. 15",
    items: [
      { productId: 1, quantity: 1, price: 89990 },
      { productId: 4, quantity: 1, price: 24990 },
    ],
  },
  {
    id: 2,
    userId: 1,
    orderDate: "2024-02-12T14:15:00Z",
    status: "processing",
    totalAmount: 129990,
    deliveryAddress: "г. Москва, ул. Ленина, д. 10, кв. 15",
    items: [{ productId: 3, quantity: 1, price: 129990 }],
  },
  {
    id: 3,
    userId: 2,
    orderDate: "2024-02-08T16:45:00Z",
    status: "shipped",
    totalAmount: 109980,
    deliveryAddress: "г. Санкт-Петербург, пр. Невский, д. 25, кв. 8",
    items: [
      { productId: 2, quantity: 1, price: 79990 },
      { productId: 7, quantity: 1, price: 29990 },
    ],
  },
  {
    id: 4,
    userId: 3,
    orderDate: "2024-02-11T09:20:00Z",
    status: "delivered",
    totalAmount: 74980,
    deliveryAddress: "г. Новосибирск, ул. Красный проспект, д. 5, кв. 22",
    items: [
      { productId: 6, quantity: 1, price: 39990 },
      { productId: 8, quantity: 1, price: 34990 },
    ],
  },
  {
    id: 5,
    userId: 2,
    orderDate: "2024-02-13T11:00:00Z",
    status: "pending",
    totalAmount: 69980,
    deliveryAddress: "г. Санкт-Петербург, пр. Невский, д. 25, кв. 8",
    items: [
      { productId: 9, quantity: 1, price: 54990 },
      { productId: 10, quantity: 1, price: 14990 },
    ],
  },
  {
    id: 6,
    userId: 4,
    orderDate: "2024-02-09T13:30:00Z",
    status: "delivered",
    totalAmount: 49980,
    deliveryAddress: "г. Екатеринбург, ул. Малышева, д. 33, кв. 7",
    items: [{ productId: 4, quantity: 2, price: 24990 }],
  },
  {
    id: 7,
    userId: 5,
    orderDate: "2024-02-14T08:45:00Z",
    status: "processing",
    totalAmount: 169970,
    deliveryAddress: "г. Казань, ул. Баумана, д. 18, кв. 12",
    items: [
      { productId: 1, quantity: 1, price: 89990 },
      { productId: 2, quantity: 1, price: 79990 },
    ],
  },
  {
    id: 8,
    userId: 3,
    orderDate: "2024-02-07T15:20:00Z",
    status: "cancelled",
    totalAmount: 69990,
    deliveryAddress: "г. Новосибирск, ул. Красный проспект, д. 5, кв. 22",
    items: [{ productId: 5, quantity: 1, price: 69990 }],
  },
  {
    id: 9,
    userId: 4,
    orderDate: "2024-02-12T17:10:00Z",
    status: "shipped",
    totalAmount: 94980,
    deliveryAddress: "г. Екатеринбург, ул. Малышева, д. 33, кв. 7",
    items: [
      { productId: 6, quantity: 1, price: 39990 },
      { productId: 9, quantity: 1, price: 54990 },
    ],
  },
  {
    id: 10,
    userId: 5,
    orderDate: "2024-02-06T12:00:00Z",
    status: "delivered",
    totalAmount: 44980,
    deliveryAddress: "г. Казань, ул. Баумана, д. 18, кв. 12",
    items: [
      { productId: 7, quantity: 1, price: 29990 },
      { productId: 10, quantity: 1, price: 14990 },
    ],
  },
];

// Статусы заказов
export const orderStatuses = {
  pending: "Ожидает обработки",
  processing: "Обрабатывается",
  shipped: "Отправлен",
  delivered: "Доставлен",
  cancelled: "Отменен",
};

// Утилитарные функции для работы с данными
export const getUserById = (id) => users.find((user) => user.id === id);
export const getProductById = (id) =>
  products.find((product) => product.id === id);
export const getOrderById = (id) => orders.find((order) => order.id === id);

export const getUserOrders = (userId) =>
  orders.filter((order) => order.userId === userId);
export const getOrdersWithUserData = () => {
  return orders.map((order) => ({
    ...order,
    user: getUserById(order.userId),
    items: order.items.map((item) => ({
      ...item,
      product: getProductById(item.productId),
    })),
  }));
};

export const getProductsByCategory = (category) =>
  products.filter((product) => product.category === category);

export const getAvailableProducts = () =>
  products.filter((product) => product.inStock);

export const getTotalOrderValue = (orderId) => {
  const order = getOrderById(orderId);
  return order ? order.totalAmount : 0;
};

export const getUserTotalSpent = (userId) => {
  const userOrders = getUserOrders(userId);
  return userOrders
    .filter((order) => order.status !== "cancelled")
    .reduce((total, order) => total + order.totalAmount, 0);
};
