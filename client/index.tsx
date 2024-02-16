import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#333333', // Use for very important text or accents.
    800: '#444444', // Ideal for headings and primary buttons.
    700: '#555555', // Secondary text or secondary buttons.
    600: '#666666', // Disabled state or tertiary elements.
    500: '#777777', // Borders or dividers.
    400: '#888888', // Placeholder text or less important elements.
    350: '#999999', // Slightly lighter border or divider.
    300: '#aaaaaa', // Backgrounds for cards or modals.
    250: '#bbbbbb', // Hover states or secondary backgrounds.
    200: '#cccccc', // Off-white backgrounds to reduce starkness.
    150: '#dddddd', // Backgrounds for selected list items or active states.
    100: '#eeeeee', // Main background color.
  },
}

const theme = extendTheme({
  styles: {
    global: {
      // Apply base styles globally
      body: {
        bg: 'brand.100',
        color: 'brand.800',
      },
    },
  },
  colors,
  components: {
    Button: {
      baseStyle: {
        _hover: {
          bg: 'brand.300',
        },
      },
    },
    Text: {
      baseStyle: {
        color: 'brand.700',
      },
    },
  },
})

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
