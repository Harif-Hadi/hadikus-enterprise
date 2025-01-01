import Link from "next/link";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero_container}>
      <div>
        <h1>Image</h1>
        <h2>Name</h2>
        <p>Price</p>
        <Link href="" className={styles.shop_now}>
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Hero;
