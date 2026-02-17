import { useState, useEffect } from "react";
import { products } from "../../mockData.js";
import { formatPrice } from "../../utils/formatters.js";
import {
  Modal,
  TextInput,
  Select,
  Button,
  Group,
  Stack,
  Paper,
  Text,
  NumberInput,
  Divider,
} from "@mantine/core";
import {
  STATUS_OPTIONS,
  DEFAULT_FORM_STATE,
  DEFAULT_QUANTITY,
} from "../../constants/orderForm.js";
import {
  createUserOptions,
  createProductOptions,
  calculateTotalAmount,
  validateForm,
  addItemToOrder,
  removeItemFromOrder,
  updateItemQuantity,
} from "../../utils/components/orderForm.js";

const OrderForm = ({ order, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);

  // TODO: при передаче от родителя нового объекта order (новый reference) эффект срабатывает каждый раз; при частых ререндерах родителя лучше [order?.id]
  // TODO: хук зависит от внутреннего состояни, такого лучше не делать, так как хуки должны иметь в зависимостях только пропсы или внешние состояния и не должны использовать внутреннее состояние
  useEffect(() => {
    if (order) {
      setFormData({
        userId: order.userId,
        deliveryAddress: order.deliveryAddress,
        status: order.status,
        items: [...order.items],
      });
    }
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      alert("Заполните все обязательные поля и добавьте хотя бы один товар");
      return;
    }
    onSubmit(formData);
  };

  const addItem = () => {
    if (!selectedProduct) return;

    // TODO - products.find на каждый клик — при большом списке товаров лучше Map(products).get(id)
    const product = products.find((p) => p.id === parseInt(selectedProduct));
    if (!product) return;

    const newItems = addItemToOrder(formData.items, product, quantity);
    setFormData((prev) => ({ ...prev, items: newItems }));

    setSelectedProduct("");
    setQuantity(DEFAULT_QUANTITY);
  };

  const removeItem = (productId) => {
    const newItems = removeItemFromOrder(formData.items, productId);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleUpdateItemQuantity = (productId, newQuantity) => {
    const newItems = updateItemQuantity(formData.items, productId, newQuantity);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  // TODO - пересоздаются на каждый рендер, это константа, можно вынести за компоненту
  const userOptions = createUserOptions();

  // TODO - пересоздаются на каждый рендер, это константа, можно вынести за компоненту
  const productOptions = createProductOptions();

  console.log("rerender");

  // TODO - компонент слишком большой, стоит разбить на отдельные компоненты
  return (
    <Modal
      opened={true}
      onClose={onCancel}
      title={order ? "Редактировать заказ" : "Создать заказ"}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Select
            label="Клиент"
            placeholder="Выберите клиента"
            data={userOptions}
            value={formData.userId.toString()}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                userId: parseInt(value) || "",
              }))
            }
            required
            withAsterisk
          />

          {/* TODO -Вот тут происходате обновление фильтров на каждый ввод символа, сюда было бы неплохо добавить debounce */}
          <TextInput
            label="Адрес доставки"
            placeholder="Введите адрес доставки"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                deliveryAddress: e.target.value,
              }))
            }
            required
            withAsterisk
          />

          <Select
            label="Статус"
            data={STATUS_OPTIONS}
            value={formData.status}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
          />

          <div>
            <Text fw={500} size="sm" mb="xs">
              Товары *
            </Text>

            {/* TODO - Вот такой компонент лучше вынести отдельно, так как при каждом обновлении setQuantity ререндерится весь компонент, лучше вынести это в отдельный компонент, и при нажатии кнопки "Добавить" вызывать функцию addItem и обовлять основной стейт */}
            <Group mb="md">
              <Select
                placeholder="Выберите товар"
                data={productOptions}
                value={selectedProduct}
                onChange={setSelectedProduct}
                style={{ flex: 1, minWidth: 200 }}
              />
              <NumberInput
                placeholder="Кол-во"
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
                min={1}
                w={80}
              />
              <Button onClick={addItem} disabled={!selectedProduct}>
                Добавить
              </Button>
            </Group>

            {formData.items.length === 0 ? (
              <Paper p="md" withBorder>
                <Text ta="center" c="dimmed">
                  Товары не добавлены
                </Text>
              </Paper>
            ) : (
              <Stack gap="xs">
                {/* TODO - блок добавляемого товара лучше в компонент вынести, так как например при обновлении количества нового товара будет рендериться вся форма */}
                {formData.items.map((item) => {
                  // TODO - в цикле по items для каждой позиции products.find — O(items × products); лучше один раз Map(products) и .get(item.productId)
                  const product = products.find((p) => p.id === item.productId);
                  return (
                    <Paper key={item.productId} p="md" withBorder>
                      <Group justify="space-between">
                        <div style={{ flex: 1 }}>
                          <Text fw={500}>{product?.name}</Text>
                          <Group gap="xs" align="center">
                            <Text size="sm" c="dimmed">
                              {formatPrice(item.price)} ×
                            </Text>
                            <NumberInput
                              value={item.quantity}
                              onChange={(value) =>
                                handleUpdateItemQuantity(
                                  item.productId,
                                  value || 0,
                                )
                              }
                              min={1}
                              w={80}
                              size="xs"
                            />
                            <Text size="sm" c="dimmed">
                              шт.
                            </Text>
                          </Group>
                        </div>
                        <Group gap="md" align="center">
                          <Text fw={600} size="lg">
                            {formatPrice(item.price * item.quantity)}
                          </Text>
                          <Button
                            color="red"
                            variant="light"
                            size="xs"
                            onClick={() => removeItem(item.productId)}
                          >
                            Удалить
                          </Button>
                        </Group>
                      </Group>
                    </Paper>
                  );
                })}
              </Stack>
            )}

            {formData.items.length > 0 && (
              <>
                <Divider my="md" />
                <Paper p="md" bg="gray.0">
                  <Group justify="space-between">
                    <Text fw={600} size="lg">
                      Общая сумма:
                    </Text>
                    <Text fw={700} size="xl" c="green">
                      {formatPrice(calculateTotalAmount(formData.items))}
                    </Text>
                  </Group>
                </Paper>
              </>
            )}
          </div>

          <Group justify="flex-end" mt="xl">
            <Button variant="light" onClick={onCancel}>
              Отмена
            </Button>
            <Button type="submit" color="green">
              {order ? "Сохранить" : "Создать заказ"}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default OrderForm;
