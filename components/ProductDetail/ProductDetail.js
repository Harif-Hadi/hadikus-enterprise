import Image from "next/image";
import styles from "./ProductDetail.module.css";
import { Add, Remove } from "@mui/icons-material";
import { useState } from "react";
import { sendCartData } from "@/helper/api-utils";

export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantityHandler = () => {
    if (quantity === 10) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantityHandler = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const { name, image, price, id } = product[0];

  const finalPrice = price * quantity;

  const submitFormHandler = async (event) => {
    event.preventDefault();

    const addedProductToCart = {
      id,
      data: {
        name,
        image,
        finalPrice,
        quantity,
      },
    };

    await sendCartData(addedProductToCart);
  };

  return (
    <div className={styles.product_container}>
      <div className={styles.product_content}>
        <Image src={image} alt={id} height={380} width={400} priority="true" />
        <div className={styles.product_info}>
          <h1>{name}</h1>
          <form className={styles.form} onSubmit={submitFormHandler}>
            <div className={styles.quantity}>
              <Add
                sx={{
                  cursor: "pointer",
                  margin: "auto 0.5rem auto 0",
                }}
                onClick={increaseQuantityHandler}
              />
              <h2>{quantity}</h2>
              <Remove
                sx={{ cursor: "pointer", margin: "auto 0 auto 0.5rem" }}
                onClick={decreaseQuantityHandler}
              />
            </div>
            <h3
              className={styles.price}
            >{`GHS${finalPrice.toLocaleString()}`}</h3>
            <button>Add to Cart</button>
          </form>
        </div>
      </div>
    </div>
  );
}
