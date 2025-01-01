import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { getFeaturedProduct, getProductById } from "@/helper/api-utils";
import Head from "next/head";

export default function ProductDetailPage(props) {
  const product = props.selectedProduct;

  return (
    <div>
      <Head>
        <title>ProductDetail</title>
        <meta name="product detail" content="Products Detail Page" />
      </Head>
      <ProductDetail product={product} />
    </div>
  );
}

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const product = await getProductById(productId);

  return {
    props: {
      selectedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const products = await getFeaturedProduct();

  const paths = products.map((product) => ({
    params: { productId: product.id },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}
