import Layout from '../components/Layouts/Layout';
import '../styles/global.scss';
import { Provider } from 'react-redux';
import { store } from 'store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
// import SSRProvider from 'react-bootstrap/SSRProvider';

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <SSRProvider> */}
        {/* <Layout> */}
        <Component {...pageProps} />
        {/* </Layout> */}
        {/* </SSRProvider> */}
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
