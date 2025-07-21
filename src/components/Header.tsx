'use client'

import {
  Text,
  Button,
  HStack,
} from '@chakra-ui/react'
import { RiMoonFill, RiSunFill } from 'react-icons/ri'
import { useColorMode, useColorModeValue } from './ui/color-mode'

export default function Header() {
  const bg = useColorModeValue('whiteAlpha.900', 'gray.700')
  const color = useColorModeValue('gray.800', 'white')
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack
      as="header"
      flex={1}
      w="100%"
      h="60px"
      bg={bg}
      color={color}
      position="fixed"
      top={0}
      boxShadow="md"
      zIndex={10}
      px={6}
      justifyContent="space-between"
      alignItems="center"
    >

      <Text fontSize="xl" fontWeight="bold">
        Golden Raspberry
      </Text>

      <Button
        onClick={toggleColorMode}
      >
        {colorMode === 'light'
          ? <RiMoonFill size={20} />
          : <RiSunFill size={20} />}
      </Button>
    </HStack>
  )
}
