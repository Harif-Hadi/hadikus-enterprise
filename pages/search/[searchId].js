import SearchedItem from "@/components/SearchedItem/SearchedItem";
import { getProductBySearch } from "@/helper/api-utils";

import Head from "next/head";
import { useRouter } from "next/router";

export default function SearchedDetail() {
  const router = useRouter();

  const searchedName = router.query.searchId;

  const productData = getProductBySearch(searchedName);

  return (
    <div>
      <Head>
        <title>Detail</title>
        <meta name="Searched Page" content="Searched Detail Page" />
      </Head>

      {productData.length === 0 || productData === undefined ? (
        <h2
          style={{ fontWeight: "400", textAlign: "center", marginTop: "2rem" }}
        >
          No products found
        </h2>
      ) : (
        <div>
          {productData.map((product, index) => (
            <SearchedItem searchedData={product} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
