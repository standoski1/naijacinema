import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
        <link rel="stylesheet" href="/css/style.css"/>
        <link rel="stylesheet" href="/css/adminstyles.css"/>
        <script async src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js" crossOrigin="anonymous"></script>
        <link rel="manifest" href="/icons/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
        <meta name="theme-color" content="#f69435" />
        <meta charSet="utf-8"/>
        <meta property="og:type" content="website"></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="mobile-web-app-capable" content="yes"/>
        <link rel="canonical" href="https://naijacinemas.com" />
        <meta name="msapplication-TileColor" content="#f69435"/>
        <meta name="language" content="en"/>
        <meta name="distribution" content="global"/>
        <meta name="author" content="naijacinemas"></meta>  
        <meta name="twitter:card" content="summary_large_image"></meta> 
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="S0VFRCbm6Z6jK-txpke_W10FIKOCcP5A10qt2QBld9c" />
        </Head>
        <body>
          <Main />
          <NextScript />


        <script async src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
        <script async src="/js/active.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument