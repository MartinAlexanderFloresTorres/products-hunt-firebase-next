import LayoutMain from "../layouts/LayoutMain";
import AuthProvider from "../provider/AuthProvider";
import ProductosProvider from "../provider/ProductosProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const pageTitle = Component?.title || "Next"; // si no hay titulo, se pone Next
  return (
    <AuthProvider>
      <ProductosProvider>
        <LayoutMain titulo={pageTitle}>
          <Component {...pageProps} />
        </LayoutMain>
      </ProductosProvider>
    </AuthProvider>
  );
}

export default MyApp;
