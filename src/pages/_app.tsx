import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import { GlobalStyle } from '@/styles/globals'

import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <Component {...pageProps} />
    </>
  )
}
