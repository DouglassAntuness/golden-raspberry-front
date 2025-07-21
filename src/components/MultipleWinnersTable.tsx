"use client";
import { Box, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useColorModeValue } from "./ui/color-mode";
import Heading from "./ui/heading";

interface YearWinner {
  year: number;
  winCount: number;
}

export default function MultipleWinnersTable() {
  const color = useColorModeValue('gray.800', 'gray.100');
  const [data, setData] = useState<YearWinner[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/filme/years-with-multiple-winners")
      .then((res) => res.json())
      .then((json) => { setData(json) });
  }, []);

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
              <Table.Cell color={color}>{item.winCount}</Table.Cell>
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
