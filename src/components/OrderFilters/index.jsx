import {
  Paper,
  Title,
  TextInput,
  Select,
  Button,
  Group,
  Grid,
} from "@mantine/core";
import {
  FILTER_LABELS,
  PLACEHOLDERS,
  STATUS_OPTIONS,
} from "../../constants/orderFilters.js";
import {
  createUserOptions,
  hasActiveFilters,
} from "../../utils/components/orderFilters.js";

const OrderFilters = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: "",
      userId: "",
      search: "",
    });
  };

  const userOptions = createUserOptions();
  const showClearButton = hasActiveFilters(filters);

  return (
    <Paper p="md" withBorder>
      <Group justify="space-between" mb="md">
        <Title order={3}>{FILTER_LABELS.TITLE}</Title>
        {showClearButton && (
          <Button variant="light" size="sm" onClick={clearFilters}>
            {FILTER_LABELS.CLEAR}
          </Button>
        )}
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <TextInput
            label={FILTER_LABELS.SEARCH}
            value={filters.search}
            placeholder={PLACEHOLDERS.SEARCH}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Select
            label={FILTER_LABELS.STATUS}
            data={STATUS_OPTIONS}
            value={filters.status}
            onChange={(value) => handleFilterChange("status", value || "")}
            clearable
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Select
            label={FILTER_LABELS.CLIENT}
            data={userOptions}
            value={filters.userId}
            onChange={(value) => handleFilterChange("userId", value || "")}
            clearable
          />
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default OrderFilters;
