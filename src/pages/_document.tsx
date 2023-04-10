import { Html, Head, Main, NextScript } from 'next/document'
import { GlobalStyle } from '@/styles/globals'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <GlobalStyle />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
