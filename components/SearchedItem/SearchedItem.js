import Image from "next/image";
import Link from "next/link";

import styles from "./SearchItem.module.css";
import { East } from "@mui/icons-material";

export default function SearchedItem({ searchedData }) {
  const { name, image, id } = searchedData;

  return (
    <>
      <p className={styles.search_results}>Search results</p>
      <div className={styles.searched_container}>
        <div className={styles.searched_content}>
          <Image src={image} height={120} width={150} alt={id} />
          <h2>{name}</h2>
          <Link href={`/products/${id}`} className={styles.shop_link}>
            <p>Shop Now</p>
            <East
              sx={{
                height: "1rem",
                width: "1rem",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
