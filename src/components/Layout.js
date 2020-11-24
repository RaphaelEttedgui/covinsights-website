import React from "react"
import { ThemeProvider } from "styled-components"
import { Theme, GlobalStyle } from "../css"
import Paper from '@material-ui/core/Paper';

const Layout = ({ children }) => {
  return (
    <main>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        {children}
        {/* <Footer /> */}
      </ThemeProvider>
    </main>
  )
}

export default Layout
