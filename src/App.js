import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { loadTheme } from './Helpers/theme'

import Nav from './Nav'

const App = () => {
  const theme = loadTheme()

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Nav />
      </Router>
    </ThemeProvider>
  )
}

export default App
