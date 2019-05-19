import Head from "next/head";

const Meta = ({ title = "" }) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <title>
      {title ? title + " - " + process.env.APP_NAME : process.env.APP_NAME}
    </title>
  </Head>
);

export default Meta;
