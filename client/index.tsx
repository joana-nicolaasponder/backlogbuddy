import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as React from 'react'
import { extendTheme } from '@chakra-ui/react'
import * as ReactDom from 'react-dom/client'

import { ChakraProvider } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#22223b',
    800: '#4a4e69',
    700: '#9a8c98',
    600: '#c9ada7',
    500: '#f2e9e4',
  },
}
const theme = extendTheme({ colors })
const router = createBrowserRouter(routes)

const queryClient = new QueryClient()

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </ChakraProvider>
)
