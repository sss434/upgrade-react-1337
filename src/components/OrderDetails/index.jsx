import {
  formatPrice,
  formatDate,
  formatOrderStatus,
  getStatusColor,
} from "../../utils/formatters.js";
import { products } from "../../mockData.js";
import {
  Modal,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  Paper,
  Grid,
} from "@mantine/core";
import { MODAL_SIZE } from "../../constants/orderDetails.js";

const OrderDetails = ({ order, onClose, onEdit }) => {
  // TODO - order можно деструктурировать, что бы код был более читаемым и модульным
  // const { id, orderDate, status, user, deliveryAddress, items, totalAmount } = order;

  if (!order) return null;

  return (
    <Modal
      opened={true}
      onClose={onClose}
      title={`Заказ #${order.id}`}
      size={MODAL_SIZE}
    >
      <Stack gap="lg">
        {/* Информация о заказе */}
        <Grid>
          <Grid.Col span={6}>
            <Stack gap="xs">
              <Text size="sm" fw={500} c="dimmed">
                Дата заказа
              </Text>
              <Text>{formatDate(order.orderDate)}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack gap="xs">
              <Text size="sm" fw={500} c="dimmed">
                Статус
              </Text>
              <Badge
                color={getStatusColor(order.status)}
                variant="filled"
                size="lg"
              >
                {formatOrderStatus(order.status)}
              </Badge>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Информация о клиенте */}
        <div>
          <Text fw={500} mb="sm">
            Информация о клиенте
          </Text>
          <Paper p="md" bg="gray.0">
            <Stack gap="xs">
              <Text fw={500}>{order.user?.name}</Text>
              <Text size="sm" c="dimmed">
                {order.user?.email}
              </Text>
              <Text size="sm" c="dimmed">
                {order.user?.phone}
              </Text>
            </Stack>
          </Paper>
        </div>

        {/* Адрес доставки */}
        <div>
          <Text fw={500} mb="sm">
            Адрес доставки
          </Text>
          <Text c="dimmed">{order.deliveryAddress}</Text>
        </div>

        {/* Товары в заказе */}
        <div>
          <Text fw={500} mb="sm">
            Товары ({order.items.length})
          </Text>
          <Stack gap="xs">
            {/* TODO - Такие карточки лучше в компонент отдельный вынести, что бы код был более читаемым и модульным */}
            {order.items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
              return (
                <Paper key={item.productId} p="md" withBorder>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500}>{product?.name}</Text>
                      <Text size="sm" c="dimmed">
                        {formatPrice(item.price)} × {item.quantity} шт.
                      </Text>
                      {product?.category && (
                        <Text size="xs" c="dimmed">
                          {product.category}
                        </Text>
                      )}
                    </div>
                    <Text fw={600} size="lg">
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                  </Group>
                </Paper>
              );
            })}
          </Stack>
        </div>

        {/* Итого */}
        <Paper p="md" bg="green.0">
          <Group justify="space-between">
            <Text fw={600} size="lg">
              Итого:
            </Text>
            <Text fw={700} size="xl" c="green">
              {formatPrice(order.totalAmount)}
            </Text>
          </Group>
        </Paper>

        <Group justify="flex-end" mt="xl">
          <Button variant="light" onClick={onClose}>
            Закрыть
          </Button>
          <Button onClick={() => onEdit(order)}>Редактировать</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default OrderDetails;
