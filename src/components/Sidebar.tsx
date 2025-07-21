'use client'

import { Box, Flex, Icon, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useColorModeValue } from './ui/color-mode';
import { FiFilm, FiHome } from 'react-icons/fi';

export default function Sidebar() {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bg = useColorModeValue('gray.100', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Box
      as="aside"
      w="250px"
      h="100vh"
      bg={bg}
      color={color}
      p={5}
      position="fixed"
      top={0}
      left={0}
      mt="60px"
      borderRight="1px solid"
      borderColor={borderColor}
    >

      <Flex direction="column" gap={3} >
        <Link
          as={NextLink}
          href="/"
          _hover={{ textDecoration: 'none', color: 'blue.600' }}
        >
          <Flex align="center" gap={4}>
            <Icon as={FiHome} boxSize={4} />
            <Text fontWeight="medium" fontSize="sm">Dashboard</Text>
          </Flex>
        </Link>

        <Link
          as={NextLink}
          href="/movies"
          _hover={{ textDecoration: 'none', color: 'blue.600' }}
        >
          <Flex align="center" gap={4}>
            <Icon as={FiFilm} boxSize={4} />
            <Text fontWeight="medium" fontSize="sm">List Movies</Text>
          </Flex>
        </Link>
      </Flex>
    </Box>
  )
}