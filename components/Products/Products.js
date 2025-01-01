import Image from "next/image";
import styles from "./Products.module.css";
import Link from "next/link";
import { products } from "@/helper/api-utils";

export default function Products() {
  return (
    <div className={styles.products_container}>
      <div className={styles.products}>
        {products.map((product, index) => (
          <Link
            href={`/products/${product.id}`}
            className={styles.product_item}
            key={index}
          >
            <Image
              src={product.image}
              alt={product.id}
              height={320}
              width={300}
            />
            <div className={styles.products_information}>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
