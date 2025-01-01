import Cart from "@/components/Cart/Cart";
import Head from "next/head";

import { database } from "@/firebase";
import { ref, get } from "firebase/database";

const Carts = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta name="cart" content="Cart Page" />
      </Head>
      <div>
        <Cart data={data} />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const dbRef = ref(database, "cart");
  let data = null;

  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      data = snapshot.val();
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return {
    props: {
      data,
    },
  };
}

export default Carts;
