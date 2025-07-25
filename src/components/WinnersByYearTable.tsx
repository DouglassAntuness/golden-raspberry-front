'use client';

import { Box, Button, HStack, Icon, Input, Table } from '@chakra-ui/react';
import { useState } from 'react';
import Heading from './ui/heading';
import { useColorModeValue } from './ui/color-mode';
import { FaSearch } from 'react-icons/fa';
import { getWinnersByYear, type Winner } from '@/lib/api/movies';

export default function WinnersByYearTable() {
  // Cor do texto adaptada ao modo claro/escuro
  const color = useColorModeValue('gray.800', 'gray.100');

  // Estado para armazenar o ano de pesquisa
  const [year, setYear] = useState('');

  // Estado para armazenar os vencedores por ano
  const [data, setData] = useState<Winner[]>([]);

  const fetchWinnersByYear = async () => {
    try {
      const winners = await getWinnersByYear(year);
      setData(winners);
    } catch (error) {
      alert("Não foi possível carregar os vencedores por ano. Tente novamente mais tarde.");
      console.error("Erro ao carregar dados da API /winnersByYear:", error);
    }
  };

  // Função para renderizar a tabela
  const renderTable = (items: Winner[]) => (
    <Table.ScrollArea borderWidth="1px" rounded="md">
      <Table.Root size="sm" stickyHeader>
        <Table.Header >
          <Table.Row bg="bg.muted">
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Year</Table.ColumnHeader>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item, idx) => (
            <Table.Row key={idx}>
              <Table.Cell color={color}>{item.id}</Table.Cell>
              <Table.Cell color={color}>{item.year}</Table.Cell>
              <Table.Cell color={color}>{item.title}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mt={2} w="49%">
      <Heading size="md" mb={4}>List movie winners by year</Heading>

      <HStack mb="2">
        <Input
          placeholder="Search by Year"
          value={year}
          color={color}
          onChange={(e) => setYear(e.target.value)}
          onKeyUp={(e) => { e.key === 'Enter' && fetchWinnersByYear() }}
        />
        <Button onClick={fetchWinnersByYear}>
          <Icon as={FaSearch} data-testid="icon-moon" />
        </Button>
      </HStack>

      {renderTable(data)}
    </Box>
  );
}
