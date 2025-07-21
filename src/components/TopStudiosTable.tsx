'use client';

import { Table, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useColorModeValue } from './ui/color-mode';
import Heading from './ui/heading';

type Studio = {
  name: string;
  winCount: number;
};

export default function TopStudiosTable() {
  const [data, setData] = useState<Studio[]>([]);
  const color = useColorModeValue('gray.800', 'gray.100');

  useEffect(() => {
    fetch('http://localhost:8000/filme/top-studios')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const renderTable = (items: Studio[]) => (
    <Table.ScrollArea borderWidth="1px" rounded="md">
      <Table.Root size="sm" stickyHeader>
        <Table.Header >
          <Table.Row bg="bg.muted">
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Win Count</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item, idx) => (
            <Table.Row key={idx}>
              <Table.Cell color={color}>{item.name}</Table.Cell>
              <Table.Cell color={color}>{item.winCount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} w="49%">
      <Heading size="md" mb={4}>Top 3 studios with winners</Heading>
      {renderTable(data)}
    </Box>
  );
}