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