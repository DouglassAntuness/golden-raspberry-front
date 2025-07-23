"use client";
import { Box, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useColorModeValue } from "./ui/color-mode";
import Heading from "./ui/heading";

interface YearWinner {
  year: number;
  winnerCount: number;
}

export default function MultipleWinnersTable() {
  // Cor do texto adaptada ao modo claro/escuro
  const color = useColorModeValue('gray.800', 'gray.100');

  // Estado para armazenar os anos com múltiplos vencedores
  const [data, setData] = useState<YearWinner[]>([]);

   // Carrega os dados na montagem do componente
  useEffect(() => {
    fetchYearsWithMultipleWinners();
  }, []);

  // Função para buscar dados da API
  const fetchYearsWithMultipleWinners = async () => {
    try {
      const res = await fetch(`https://challenge.outsera.tech/api/movies/yearsWithMultipleWinners`);

      if (!res.ok) {
        throw new Error(`Erro ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();
      setData(data.years);

    } catch (error) {
      alert("Não foi possível carregar os anos com múltiplos vencedores. Tente novamente mais tarde.");
      console.error("Erro ao carregar dados da API /yearsWithMultipleWinners:", error);
    }
  };

  // Função para renderizar a tabela
  const renderTable = (items: YearWinner[]) => (
    <Table.ScrollArea borderWidth="1px" rounded="md">
      <Table.Root size="sm" stickyHeader>
        <Table.Header >
          <Table.Row bg="bg.muted">
            <Table.ColumnHeader>Year</Table.ColumnHeader>
            <Table.ColumnHeader>Win Count</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item, idx) => (
            <Table.Row key={idx}>
              <Table.Cell color={color}>{item.year}</Table.Cell>
              <Table.Cell color={color}>{item.winnerCount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} w="49%">
      <Heading size="md" mb={4}>List years with multiple winners</Heading>
      {renderTable(data)}
    </Box>
  );
}
