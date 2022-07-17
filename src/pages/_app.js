import { ToastProvider } from 'react-toast-notifications'
import { PersistGate } from 'redux-persist/integration/react'
import { useStore } from 'react-redux'
import { wrapper } from '../redux'
import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import 'nprogress/nprogress.css'
import '../assets/scss/style.scss'
import * as gtag from '../utils/gtag'

// Router.events.on('routeChangeStart', () => NProgress.start())
// Router.events.on('routeChangeComplete', (url) => {
//   NProgress.done()
//   gtag.pageview(url)
// })
// Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  const store = useStore()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      console.log('start')
      setLoading(true)
    }
    const end = () => {
      console.log('findished')
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return loading ? (
    <div className='flone-preloader-wrapper'>
      <div className='flone-preloader'>
        <span></span>
        <span></span>
      </div>
    </div>
  ) : (
    <PersistGate persistor={store.__persistor} loading={null}>
      {() => (
        <ToastProvider placement='bottom-left'>
          <Component {...pageProps} />
        </ToastProvider>
      )}
    </PersistGate>
  )
}

export default wrapper.withRedux(MyApp)
