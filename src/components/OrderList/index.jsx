import { formatPrice, formatDate, formatOrderStatus, getStatusColor } from '../../utils/formatters.js';
import { Paper, Title, Text, Table, Badge, Button, Group, Stack } from '@mantine/core';
import { EMPTY_STATE_MESSAGE, BUTTON_LABELS, TABLE_MIN_WIDTH } from '../../constants/orderList.js';

const OrderList = ({ orders, onEditOrder, onDeleteOrder, onViewOrder }) => {
  if (orders.length === 0) {
    return (
      <Paper p="xl" withBorder>
        <Text ta="center" c="dimmed" size="lg">
          {EMPTY_STATE_MESSAGE}
        </Text>
      </Paper>
    );
  }

  const rows = orders.map(order => (
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
            variant="light"
            size="xs"
            onClick={() => onViewOrder(order)}
          >
            {BUTTON_LABELS.VIEW}
          </Button>
          <Button 
            variant="filled"
            size="xs"
            onClick={() => onEditOrder(order)}
          >
            {BUTTON_LABELS.EDIT}
          </Button>
          <Button 
            variant="filled"
            color="red"
            size="xs"
            onClick={() => onDeleteOrder(order.id)}
          >
            {BUTTON_LABELS.DELETE}
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper p="md" withBorder>
      <Title order={3} mb="md">Список заказов ({orders.length})</Title>
      <Table.ScrollContainer minWidth={TABLE_MIN_WIDTH}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>№ заказа</Table.Th>
              <Table.Th>Клиент</Table.Th>
              <Table.Th>Дата</Table.Th>
              <Table.Th>Статус</Table.Th>
              <Table.Th>Сумма</Table.Th>
              <Table.Th>Товаров</Table.Th>
              <Table.Th>Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  );
};

export default OrderList;