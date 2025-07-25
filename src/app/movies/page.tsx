'use client'

import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useColorModeValue } from '@/components/ui/color-mode'
import Text from '@/components/ui/text'
import {
  Table,
  Input,
  Button,
  HStack,
  VStack,
  Box, Flex
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Select } from '@/components/Select'
import { Pagination } from '@/components/Pagination'
import { getMovies, type Movie } from '@/lib/api/movies'

// Opções do filtro
const listWinner = [
  { label: "yes", value: "true" },
  { label: "no", value: "false" },
];

const pageSizes = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
];

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState<string[]>(['10']);
  const [year, setYear] = useState("");
  const [winner, setWinner] = useState<string[]>([]);

  // Cores dinâmicas conforme tema (claro/escuro)
  const color = useColorModeValue('gray.800', 'gray.100');
  const bg = useColorModeValue('gray.50', 'gray.900') // claro / escuro

  const fetchMovies = async () => {
    try {
      const data = await getMovies({
        page,
        size: pageSize[0],
        year,
        winner: winner[0],
      });

      setMovies(data.content);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      alert("Erro ao carregar filmes");
      console.error("Erro ao carregar filmes:", error);
    }
  };

  // Refaz a busca ao alterar o tamanho da página
  useEffect(() => {
    handleUpdateTable();
  }, [pageSize]);

  // Refaz a busca ao alterar a página
  useEffect(() => {
    fetchMovies();
  }, [page]);

  // Atualiza a tabela voltando para página 0
  const handleUpdateTable = () => {
    setPage(0);
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

          {/* Filtros */}
          <HStack justifyContent="space-between" alignItems="center" w="100%">
            <HStack gap={2} alignItems="center">
              {/* Filtro por ano */}
              <Input
                minW={120}
                color={color}
                placeholder="Filter by year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />

              {/* Filtro por vencedor */}
              <Box minW={150}>
                <Select
                  value={winner}
                  onChange={setWinner}
                  placeholder="Select Winner"
                  options={listWinner}
                  clearable={true}
                />
              </Box>

              <Button onClick={handleUpdateTable}>Search</Button>
            </HStack>

            {/* Info + page size */}
            <HStack
              flexWrap="wrap"
              gap="$4"
              alignItems="center"
              justifyContent="flex-end"
              w="100%"
            >
              {/* Tamanho por página */}
              <HStack alignItems="center" flexWrap="wrap" gap="$2">
                <Text fontSize="sm" color={color}>
                  Results per page
                </Text>

                <Box minW={70} ml={2}>
                  <Select
                    value={pageSize}
                    onChange={setPageSize}
                    placeholder="size"
                    options={pageSizes}
                  />
                </Box>
              </HStack>
            </HStack>
          </HStack>

          {/* Tabela de filmes com scroll */}
          <Table.ScrollArea borderWidth="1px" rounded="md" w="100%" maxHeight="450px">
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
                  <Table.Row key={movie.id}>
                    <Table.Cell color={color}>{movie.id}</Table.Cell>
                    <Table.Cell color={color}>{movie.year}</Table.Cell>
                    <Table.Cell color={color}>{movie.title}</Table.Cell>
                    <Table.Cell color={color}>{movie.winner == true ? "yes" : "no"}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Table.ScrollArea>

          {/* Paginação */}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </VStack>
      </VStack>
    </Flex>
  )
}