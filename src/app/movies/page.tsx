'use client'

import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useColorModeValue } from '@/components/ui/color-mode'
import Text from '@/components/ui/text'
import {
  Table,
  Input,
  Select,
  Button,
  HStack,
  VStack,
  Box,
  IconButton,
  Flex,
  Icon,
  createListCollection,
  Portal,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

interface Movie {
  id: number;
  year: number;
  title: string;
  winner: boolean;
}


export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [winner, setWinner] = useState<string[]>([]);

  const listWinner = createListCollection({
    items: [
      { label: "yes", value: "yes" },
      { label: "no", value: "no" },
    ],
  })


  const color = useColorModeValue('gray.800', 'gray.100');
  const bg = useColorModeValue('gray.50', 'gray.900') // claro / escuro

  const fetchMovies = async () => {
    const query: Record<string, string> = { page: page.toString() };

    if (year) query.year = year;
    if (title) query.title = title;
    if (winner && winner[0]) query.winner = winner[0];

    const params = new URLSearchParams(query);

    const res = await fetch(`http://localhost:8000/filme?${params.toString()}`);

    const data = await res.json();
    setMovies(data.data);
    setTotalPages(data.pageCount || 1);
  };


  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchMovies();
  };

  return (
    <Flex>
      <Sidebar />

      <VStack flex="1">
        <Header />

        <VStack bg={bg} flex={1} w="full" minH="calc(100vh - 60px)" mt="60px" alignItems="flex-start" pl="270px" pr={6}>
          <Text fontSize="2xl" fontWeight="bold" mt={4}>
            List Movies
          </Text>

          <HStack gap={2}>
            <Input
              color={color}
              placeholder="Filter by year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <Input
              color={color}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Select.Root
              collection={listWinner}
              value={winner}
              onValueChange={(e) => setWinner(e.value)}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select Winner" color={color} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.ClearTrigger />
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {listWinner.items.map((winner) => (
                      <Select.Item item={winner} key={winner.value} color={color}>
                        {winner.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            <Button onClick={handleSearch}>Search</Button>
          </HStack>

          <Table.ScrollArea borderWidth="1px" rounded="md" w="100%">
            <Table.Root size="sm" stickyHeader>
              <Table.Header>
                <Table.Row bg="bg.muted">
                  <Table.ColumnHeader>ID</Table.ColumnHeader>
                  <Table.ColumnHeader>Year</Table.ColumnHeader>
                  <Table.ColumnHeader>Title</Table.ColumnHeader>
                  <Table.ColumnHeader>Winner</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {movies.map((movie, idx) => (
                  <Table.Row key={idx}>
                    <Table.Cell color={color}>{movie.id}</Table.Cell>
                    <Table.Cell color={color}>{movie.year}</Table.Cell>
                    <Table.Cell color={color}>{movie.title}</Table.Cell>
                    <Table.Cell color={color}>{movie.winner == true ? "yes" : "no"}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>

          <HStack gap={2} justifyContent="center" alignSelf="flex-end">
            <Button
              size="xs"
              aria-label="Previous"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}>
              <Icon as={FaAngleLeft} />
            </Button>
            <Text fontSize="xs">
              Page {page} of {totalPages}
            </Text>
            <Button
              size="xs"
              aria-label="Next"
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}>
              <Icon as={FaAngleRight} />
            </Button>
          </HStack>
        </VStack>
      </VStack >
    </Flex >
  )
}