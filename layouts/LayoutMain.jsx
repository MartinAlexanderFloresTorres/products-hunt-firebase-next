import Head from "next/head";
import Header from "../components/Header";

export default function LayoutMain({ titulo, children }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {/* SEO */}
        <link rel='icon' href='/icono.svg' />
        <meta name='description' content='Proyecto con next.js' />
        <meta name='keywords' content='Next.js, React.js' />
        <meta name='author' content='Martin Alexander Flores Torres' />
        <meta name='robots' content='index, follow' />
        <meta name='language' content='ES' />
        <meta name='revisit-after' content='7 days' />
        <meta name='distribution' content='web' />

        <title>{titulo}</title>
      </Head>

      <Header />
      <main className='contenedor'>{children}</main>
    </>
  );
}
