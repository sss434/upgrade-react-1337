import { useState, useEffect } from 'react';
import { users, products } from '../../mockData.js';
import { formatPrice } from '../../utils/formatters.js';
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
  Divider
} from '@mantine/core';
import { 
  STATUS_OPTIONS, 
  BUTTON_LABELS, 
  FORM_LABELS, 
  MODAL_TITLES, 
  DEFAULT_FORM_STATE, 
  DEFAULT_QUANTITY,
  FORM_VALIDATION_MESSAGES
} from '../../constants/orderForm.js';
import { 
  createUserOptions, 
  createProductOptions, 
  calculateTotalAmount, 
  validateForm,
  addItemToOrder,
  removeItemFromOrder,
  updateItemQuantity
} from '../../utils/components/orderForm.js';

const OrderForm = ({ order, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);

  useEffect(() => {
    if (order) {
      setFormData({
        userId: order.userId,
        deliveryAddress: order.deliveryAddress,
        status: order.status,
        items: [...order.items]
      });
    }
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) {
      alert(FORM_VALIDATION_MESSAGES.REQUIRED_FIELDS);
      return;
    }
    onSubmit(formData);
  };

  const addItem = () => {
    if (!selectedProduct) return;
    
    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (!product) return;

    const newItems = addItemToOrder(formData.items, product, quantity);
    setFormData(prev => ({ ...prev, items: newItems }));
    
    setSelectedProduct('');
    setQuantity(DEFAULT_QUANTITY);
  };

  const removeItem = (productId) => {
    const newItems = removeItemFromOrder(formData.items, productId);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleUpdateItemQuantity = (productId, newQuantity) => {
    const newItems = updateItemQuantity(formData.items, productId, newQuantity);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const userOptions = createUserOptions();
  const productOptions = createProductOptions();

  return (
    <Modal
      opened={true}
      onClose={onCancel}
      title={order ? MODAL_TITLES.EDIT : MODAL_TITLES.CREATE}
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Select
            label={FORM_LABELS.CLIENT}
            placeholder={FORM_VALIDATION_MESSAGES.SELECT_CLIENT}
            data={userOptions}
            value={formData.userId.toString()}
            onChange={(value) => setFormData(prev => ({ ...prev, userId: parseInt(value) || '' }))}
            required
            withAsterisk
          />

          <TextInput
            label={FORM_LABELS.DELIVERY_ADDRESS}
            placeholder={FORM_VALIDATION_MESSAGES.DELIVERY_ADDRESS}
            value={formData.deliveryAddress}
            onChange={(e) => setFormData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
            required
            withAsterisk
          />

          <Select
            label={FORM_LABELS.STATUS}
            data={STATUS_OPTIONS}
            value={formData.status}
            onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
          />

          <div>
            <Text fw={500} size="sm" mb="xs">{FORM_LABELS.PRODUCTS}</Text>
            
            {/* Добавление товара */}
            <Group mb="md">
              <Select
                placeholder={FORM_VALIDATION_MESSAGES.SELECT_PRODUCT}
                data={productOptions}
                value={selectedProduct}
                onChange={setSelectedProduct}
                style={{ flex: 1, minWidth: 200 }}
              />
              <NumberInput
                placeholder={FORM_VALIDATION_MESSAGES.QUANTITY_PLACEHOLDER}
                value={quantity}
                onChange={(value) => setQuantity(value || 1)}
                min={1}
                w={80}
              />
              <Button 
                onClick={addItem}
                disabled={!selectedProduct}
              >
                {BUTTON_LABELS.ADD}
              </Button>
            </Group>

            {/* Список добавленных товаров */}
            {formData.items.length === 0 ? (
              <Paper p="md" withBorder>
                <Text ta="center" c="dimmed">
                  {FORM_VALIDATION_MESSAGES.EMPTY_ITEMS}
                </Text>
              </Paper>
            ) : (
              <Stack gap="xs">
                {formData.items.map(item => {
                  const product = products.find(p => p.id === item.productId);
                  return (
                    <Paper key={item.productId} p="md" withBorder>
                      <Group justify="space-between">
                        <div style={{ flex: 1 }}>
                          <Text fw={500}>{product?.name}</Text>
                          <Group gap="xs" align="center">
                            <Text size="sm" c="dimmed">{formatPrice(item.price)} ×</Text>
                            <NumberInput
                              value={item.quantity}
                              onChange={(value) => handleUpdateItemQuantity(item.productId, value || 0)}
                              min={1}
                              w={80}
                              size="xs"
                            />
                            <Text size="sm" c="dimmed">шт.</Text>
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
                            {BUTTON_LABELS.DELETE}
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
                    <Text fw={600} size="lg">{FORM_LABELS.TOTAL_AMOUNT}</Text>
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
              {BUTTON_LABELS.CANCEL}
            </Button>
            <Button type="submit" color="green">
              {order ? BUTTON_LABELS.SAVE : BUTTON_LABELS.CREATE}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default OrderForm;