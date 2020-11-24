import React from "react"
import { ThemeProvider } from "styled-components"
import Script from "./Script"
import { Theme, GlobalStyle } from "../css"

const Layout = ({ children }) => {
  return (
    <main>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        {children}
        {/* <Footer /> */}
      </ThemeProvider>
      <Script
        innerHTMLCode={`
            document.querySelector('.logo-btn').addEventListener('click', function (){
              document.querySelector('.nav-links').classList.toggle("show-nav");
            })
          `}
      />
    </main>
  )
}

export default Layout