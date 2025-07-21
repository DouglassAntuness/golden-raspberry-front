'use client';

import { useHasMounted } from '@/hooks/useHasMounted';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

export function Provider({ children }: { children: React.ReactNode }) {
  const hasMounted = useHasMounted();

  if (!hasMounted) return null; // evita renderização inicial no SSR

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ChakraProvider value={defaultSystem}>
        {children}
      </ChakraProvider>
    </ThemeProvider>
  );
}
