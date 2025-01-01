import styles from "./Cart.module.css";

import Image from "next/image";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { sendCartForm } from "@/helper/api-utils";
// import { sendCartForm } from "@/helper/api-utils";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "@/firebase";

export default function Cart({ data }) {
  const [updatedData, setUpdatedData] = useState(data);

  let updatedDataIsEmpty;
  if (data !== null) updatedDataIsEmpty = Object.keys(updatedData).length === 0;

  if (data === null || undefined || updatedDataIsEmpty) {
    return (
      <h2 style={{ fontWeight: "400", textAlign: "center", marginTop: "2rem" }}>
        No products added to cart
      </h2>
    );
  }

  const totalPrice = Object.keys(updatedData).reduce((sum, key) => {
    return sum + data[key].finalPrice;
  }, 0);

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      setUpdatedData((prevState) => {
        const newData = { ...prevState };
        delete newData[id];
        return newData;
      });
    } catch (error) {
      console.log("Failed to delete");
    }
  };

  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) {
  //       // User is signed in, get their email
  //       setUser(currentUser.email);
  //     } else {
  //       // User is signed out
  //       setUser(null);
  //     }
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  const sendCartToEmail = async () => {
    await sendCartForm();
  };

  return (
    <div className={styles.cart_container}>
      <div className={styles.cart}>
        {Object.keys(updatedData).map((key, index) => {
          const product = updatedData[key];

          return (
            <div key={index} className={styles.cart_product}>
              <div className={styles.left_side_content}>
                <h3 className={styles.quantity}>{product.quantity}</h3>

                <Image
                  src={product.image}
                  height={60}
                  width={60}
                  alt={product.name}
                />
                <h3 className={styles.product_name}>{product.name}</h3>
              </div>
              <div className={styles.right_side_content}>
                <p>{`GHS ${product.finalPrice.toLocaleString()}`}</p>
                <Delete
                  onClick={() => handleDelete(key)}
                  sx={{
                    color: "red",
                    marginLeft: "1rem",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.total}>
        <h2>Total</h2>
        <div className={styles.total_info}>
          <p>{`GHS ${totalPrice.toLocaleString()}`}</p>
          <button onClick={sendCartToEmail}>Send</button>
        </div>
      </div>
    </div>
  );
}
