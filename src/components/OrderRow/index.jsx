import { formatPrice, formatDate, formatOrderStatus, getStatusColor } from '../../utils/formatters.js';
import { Table, Badge, Button, Group, Stack, Text } from '@mantine/core';
import { BUTTON_VARIANTS, BUTTON_COLORS, BUTTON_SIZE } from '../../constants/orderRow.js';

const OrderRow = ({ order, onEditOrder, onDeleteOrder, onViewOrder }) => {
  return (
    <Table.Tr key={order.id}>
      <Table.Td>#{order.id}</Table.Td>
      <Table.Td>
        <Stack gap={4}>
          <Text fw={500}>{order.user?.name}</Text>
          <Text size="sm" c="dimmed">{order.user?.email}</Text>
        </Stack>
      </Table.Td>
      <Table.Td>{formatDate(order.orderDate)}</Table.Td>
      <Table.Td>
        <Badge 
          color={getStatusColor(order.status)}
          variant="filled"
        >
          {formatOrderStatus(order.status)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fw={600}>{formatPrice(order.totalAmount)}</Text>
      </Table.Td>
      <Table.Td>{order.items.length}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button 
            variant={BUTTON_VARIANTS.VIEW}
            size={BUTTON_SIZE}
            onClick={() => onViewOrder(order)}
          >
            Просмотр
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.EDIT}
            size={BUTTON_SIZE}
            onClick={() => onEditOrder(order)}
          >
            Изменить
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.DELETE}
            color={BUTTON_COLORS.DELETE}
            size={BUTTON_SIZE}
            onClick={() => onDeleteOrder(order.id)}
          >
            Удалить
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};

export default OrderRow;