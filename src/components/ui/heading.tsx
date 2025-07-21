'use client'

import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react'
import { useColorModeValue } from './color-mode'

export default function Heading(props: HeadingProps) {
  const color = useColorModeValue('gray.800', 'gray.100')

  return (
    <ChakraHeading color={color} {...props} />
  )
}
