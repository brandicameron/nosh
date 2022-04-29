import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nosh | Family Recipes</title>
        <meta name='description' content='Your family recipes, easy to share and maintain.' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0'></meta>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </div>
  );
}
