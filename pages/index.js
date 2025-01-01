import Head from "next/head";

import Homepage from "@/components/Homepage/Homepage";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Hadikus Enterprise</title>
        <meta name="description" content="Online shop" />
      </Head>
      <Homepage />
    </div>
  );
}
