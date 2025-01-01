import Products from "@/components/Products/Products";
import Head from "next/head";

export default function AllProductsPage() {
  return (
    <div>
      <Head>
        <title>Products</title>
        <meta name="All products" content="All Products Page" />
      </Head>
      <Products />
    </div>
  );
}
