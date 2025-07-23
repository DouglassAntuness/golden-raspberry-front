// components/Pagination.tsx
'use client';

import { HStack, Button, Icon, Text } from '@chakra-ui/react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useColorModeValue } from './ui/color-mode';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (newPage: number) => void;
}

export const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  const color = useColorModeValue('gray.800', 'gray.100');
  const isFirstPage = page <= 0;
  const isLastPage = page + 1 >= totalPages;

  return (
    <HStack gap={2} justifyContent="center" alignSelf="flex-end">
      <Button
        size="xs"
        aria-label="Previous"
        onClick={() => onChange(page - 1)}
        disabled={isFirstPage}
      >
        <Icon as={FaAngleLeft} />
      </Button>

      <Text fontSize="xs" color={color}>
        Page {page + 1} of {totalPages}
      </Text>

      <Button
        size="xs"
        aria-label="Next"
        onClick={() => onChange(page + 1)}
        disabled={isLastPage}
      >
        <Icon as={FaAngleRight} />
      </Button>
    </HStack>
  );
};