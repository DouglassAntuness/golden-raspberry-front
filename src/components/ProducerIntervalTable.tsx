"use client";

import { useEffect, useState } from "react";
import {
  Table,
  Box
} from '@chakra-ui/react';
import Text from "./ui/text";
import Heading from "./ui/heading";
import { useColorModeValue } from "./ui/color-mode";

type ProducerInterval = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

type IntervalData = {
  min: ProducerInterval[];
  max: ProducerInterval[];
};

export default function ProducerIntervalTable() {
  // Cor do texto adaptada ao modo claro/escuro
  const color = useColorModeValue('gray.800', 'gray.100');

  // Estado para armazenar os dados dos intervalos
  const [data, setData] = useState<IntervalData>({ min: [], max: [] });

  // Carrega os dados na montagem do componente
  useEffect(() => {
    fetchMaxMinWinIntervalForProducers();
  }, []);

  // Função para buscar dados da API
  const fetchMaxMinWinIntervalForProducers = async () => {
    try {
      const res = await fetch('https://challenge.outsera.tech/api/movies/maxMinWinIntervalForProducers');

      if (!res.ok) {
        throw new Error(`Erro ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();
      // Pegando apenas os 3 primeiros estúdios
      setData(data);

    } catch (error) {
      alert("Não foi possível carregar os produtores com maior e menor intervalo de vitórias. Tente novamente mais tarde.");
      console.error("Erro ao carregar dados da API /maxMinWinIntervalForProducers:", error);
    }
  };

  // Função para renderizar a tabela
  const renderTable = (items: ProducerInterval[]) => (
    <Table.ScrollArea borderWidth="1px" rounded="md">
      <Table.Root size="sm" stickyHeader>
        <Table.Header >
          <Table.Row bg="bg.muted">
            <Table.ColumnHeader>Producer</Table.ColumnHeader>
            <Table.ColumnHeader>Interval</Table.ColumnHeader>
            <Table.ColumnHeader>Previous Year</Table.ColumnHeader>
            <Table.ColumnHeader>Following Year</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item, idx) => (
            <Table.Row key={idx}>
              <Table.Cell color={color}>{item.producer}</Table.Cell>
              <Table.Cell color={color}>{item.interval}</Table.Cell>
              <Table.Cell color={color}>{item.previousWin}</Table.Cell>
              <Table.Cell color={color}>{item.followingWin}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  )

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mt={2} w="49%">
      <Heading as="h2" size="md" mb={2}>
        Producers with longest and shortest interval between wins
      </Heading>

      <Box mb={4}>
        <Text>Maximum</Text>
        {renderTable(data.max)}
      </Box>

      <Box>
        <Text>Minimum</Text>
        {renderTable(data.min)}
      </Box>
    </Box>
  );
}
