import {
  Select as ChakraSelect,
  createListCollection,
  Portal,
} from '@chakra-ui/react';
import { useColorModeValue } from './ui/color-mode';

interface SelectItem {
  label: string;
  value: string;
}

interface GenericSelectProps {
  value: string[] | undefined;
  onChange: (val: string[]) => void;
  options: SelectItem[];
  placeholder?: string;
  clearable?: boolean; 
}

export const Select = ({
  value,
  onChange,
  options,
  placeholder = 'Selecione...',
  clearable = false,
}: GenericSelectProps) => {

  const color = useColorModeValue('gray.800', 'gray.100');
  const list = createListCollection<SelectItem>({
    items: options
  });

  return (
    <ChakraSelect.Root
      collection={list}
      value={value}
      onValueChange={(e) => onChange(e.value)}
    >
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder={placeholder} color={color} />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          {clearable ? <ChakraSelect.ClearTrigger /> : null}
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>

      <Portal>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {list.items.map((item) => (
              <ChakraSelect.Item item={item} key={item.value} color={color}>
                {item.label}
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
};
