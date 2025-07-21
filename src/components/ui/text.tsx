'use client'

import { Text as ChakraText, TextProps } from '@chakra-ui/react'
import { useColorModeValue } from './color-mode'

export default function Text(props: TextProps) {
  const color = useColorModeValue('gray.800', 'gray.100');

  return (
    <ChakraText color={color} {...props} />
  )
}
