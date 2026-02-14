import { Paper, Title, Text, Table } from "@mantine/core";
import {
  EMPTY_STATE_MESSAGE,
  TABLE_MIN_WIDTH,
  TABLE_TITLE,
} from "../../constants/orderList.js";
import OrderRow from "../OrderRow";

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

  return (
    <Paper p="md" withBorder>
      <Title order={3} mb="md">
        {TABLE_TITLE} ({orders.length})
      </Title>
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
            {orders.map((row) => (
              <OrderRow
                key={row.id}
                order={row}
                onEditOrder={onEditOrder}
                onDeleteOrder={onDeleteOrder}
                onViewOrder={onViewOrder}
              />
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
  );
};

export default OrderList;
