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
  // Cor do texto adaptada ao modo claro/escuro
  const color = useColorModeValue('gray.800', 'gray.100');

  // Estado para armazenar os estúdios com contagem de vitórias
  const [data, setData] = useState<Studio[]>([]);

  // Carrega os dados na montagem do componente
  useEffect(() => {
    fetchStudiosWithWinCount();
  }, []);

  // Função para buscar dados da API
  const fetchStudiosWithWinCount = async () => {
    try {
      const res = await fetch('https://challenge.outsera.tech/api/movies/studiosWithWinCount');

      if (!res.ok) {
        throw new Error(`Erro ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();
      // Pegando apenas os 3 primeiros estúdios
      setData(data.studios.slice(0, 3));

    } catch (error) {
      alert("Não foi possível carregar os estúdios com contagem de vitórias. Tente novamente mais tarde.");
      console.error("Erro ao carregar dados da API /studiosWithWinCount:", error);
    }
  };

  // Função para renderizar a tabela
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