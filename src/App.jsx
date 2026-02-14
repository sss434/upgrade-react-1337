import { useState, useMemom, useCallback, useMemo } from "react";
import {
  MantineProvider,
  Container,
  Title,
  Button,
  Space,
} from "@mantine/core";
import "@mantine/core/styles.css";
import { useOrders } from "./hooks/useOrders.js";
import OrderList from "./components/OrderList";
import OrderForm from "./components/OrderForm";
import OrderDetails from "./components/OrderDetails";
import OrderFilters from "./components/OrderFilters";

function App() {
  const { createOrder, updateOrder, deleteOrder, ordersWithDetails } =
    useOrders();

  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    userId: "",
    search: "",
  });

  // Получаем заказы с полной информацией
  const filteredOrders = useMemo(() => {
    return ordersWithDetails.filter((order) => {
      // Фильтр по статусу
      if (filters.status && order.status !== filters.status) {
        return false;
      }

      // Фильтр по пользователю
      if (filters.userId && order.userId !== parseInt(filters.userId)) {
        return false;
      }

      // Поиск
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesOrderId = order.id.toString().includes(searchLower);
        const matchesUserName = order.user?.name
          .toLowerCase()
          .includes(searchLower);
        const matchesUserEmail = order.user?.email
          .toLowerCase()
          .includes(searchLower);

        if (!matchesOrderId && !matchesUserName && !matchesUserEmail) {
          return false;
        }
      }

      return true;
    });
  }, [ordersWithDetails, filters]);

  const handleCreateOrder = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleViewOrder = useCallback((order) => {
    // TODO - в этой функции по сути не нужен весь order, тут нужен только id
    const orderWithDetails = ordersWithDetails.find((o) => o.id === order.id);
    setViewingOrder(orderWithDetails);
  }, []);

  const handleFormSubmit = (formData) => {
    if (editingOrder) {
      updateOrder(editingOrder.id, formData);
    } else {
      createOrder(formData);
    }
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  // TODO - Вот тут тоже функция постоянно будет пересоздаваться на каждый рендер, следовательно memo в orderList не поможет
  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Вы уверены, что хотите удалить этот заказ?")) {
      deleteOrder(orderId);
    }
  };

  const handleCloseDetails = () => {
    setViewingOrder(null);
  };

  return (
    <MantineProvider>
      <Container size="xl" py="xl">
        <Title order={1} mb="xl">
          Управление заказами
        </Title>

        <OrderFilters filters={filters} onFiltersChange={setFilters} />

        <Space h="xl" />

        <Button color="green" size="md" onClick={handleCreateOrder} mb="xl">
          + Создать заказ
        </Button>

        <OrderList
          orders={filteredOrders}
          // TODO - надо вынести в отдельную функцию, хендлер для onEditOrder и использовать в callback, сейчас функцию пересоздается и не мемоизируется
          onEditOrder={(order) => {
            setEditingOrder(order);
            setShowForm(true);
            setViewingOrder(null);
          }}
          onDeleteOrder={handleDeleteOrder}
          onViewOrder={handleViewOrder}
        />

        {showForm && (
          <OrderForm
            order={editingOrder}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}

        {viewingOrder && (
          <OrderDetails
            order={viewingOrder}
            onClose={handleCloseDetails}
            // TODO - надо вынести в отдельную функцию, хендлер для onEditOrder и использовать в callback, сейчас функцию пересоздается и не мемоизируется, также происходит дублирование функции
            onEdit={(order) => {
              setEditingOrder(order);
              setShowForm(true);
              setViewingOrder(null);
            }}
          />
        )}
      </Container>
    </MantineProvider>
  );
}

export default App;
