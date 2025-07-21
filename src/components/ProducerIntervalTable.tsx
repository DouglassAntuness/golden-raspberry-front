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
  const color = useColorModeValue('gray.800', 'gray.100');
  const [data, setData] = useState<IntervalData>({ min: [], max: [] });

  useEffect(() => {
    fetch("http://localhost:8000/filme/intervals")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

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
