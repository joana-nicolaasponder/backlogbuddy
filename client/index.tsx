import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { extendTheme } from '@chakra-ui/react'

import { ChakraProvider } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#333333',
    800: '#444444',
    700: '#555555',
    600: '#666666',
    500: '#777777',
    400: '#888888',
    350: '#999999',
    300: '#aaaaaa',
    250: '#bbbbbb',
    200: '#cccccc',
    150: '#dddddd',
    100: '#eeeeee',
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
