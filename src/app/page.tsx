'use client';

import { Flex, HStack, VStack } from '@chakra-ui/react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useColorModeValue } from '@/components/ui/color-mode'
import Text from '@/components/ui/text'
import ProducerIntervalTable from '@/components/ProducerIntervalTable';
import WinnersByYearTable from '@/components/WinnersByYearTable';
import MultipleWinnersTable from '@/components/MultipleWinnersTable';
import TopStudiosTable from '@/components/TopStudiosTable';

export default function Home() {
  const bg = useColorModeValue('gray.50', 'gray.900') // claro / escuro

  return (
    <Flex>
      <Sidebar />

      <VStack flex="1">
        <Header />

        <VStack bg={bg} flex={1} w="full" minH="calc(100vh - 60px)" mt="60px" alignItems="flex-start" pl="270px">
          <Text fontSize="2xl" fontWeight="bold" mt={4}>
            Bem-vindo ao Dashboard
          </Text>

          <HStack w="full" justifyContent="space-between" flexWrap="wrap" pr="6" align="start">
            <MultipleWinnersTable />
            <TopStudiosTable />
            <ProducerIntervalTable />
            <WinnersByYearTable />
          </HStack>
        </VStack>
      </VStack>
    </Flex>
  )
}
