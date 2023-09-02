import { AppProps } from "next/app";
import Head from "next/head";
import '../style.css'
import favicon from '../icons/favicon-32x32.png'

const App = ({ Component, pageProps }: AppProps) => {
  return (<>
    <Head>
      <link rel="icon" type="image/svg+xml" href="data:image/png;base64,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" />
      <link rel="apple-touch-icon" sizes="180x180" href="../icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="../icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="../icons/favicon-16x16.png" />
    </Head>
    <Component {...pageProps} />
  </>);
};

export default App;
