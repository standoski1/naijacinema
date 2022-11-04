import * as React from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/AdminLayout'
import { useRouter } from 'next/router';
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { mongoConnect } from '../utils/dbConnect';
import Script from 'next/script'
import * as gtag from '../components/lib/gtag'
import { useEffect } from 'react';


function MyApp({ Component, pageProps }: AppProps) {
   
  const connectdb = async()=>{
    await mongoConnect();
  }
  connectdb()

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])


  
    return (
      <React.Fragment>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       {()=> (
        <Layout>
          <Component {...pageProps} />
        </Layout>
        )}
       </PersistGate>
     </Provider>

     <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
     </React.Fragment>
  )
  
}

export default MyApp
