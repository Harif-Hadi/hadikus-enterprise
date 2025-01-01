import Link from "next/link";
import styles from "./BigSearch.module.css";
import { SearchOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";

const BigSearch = ({
  onChange,
  enteredSearchQuery,
  onCancel,
  hideBigSearchHandler,
}) => {
  const router = useRouter();

  const submitHandler = (event) => {
    event.preventDefault();

    router.push(`/search/${enteredSearchQuery}`);
    hideBigSearchHandler();
  };

  return (
    <header className={`${styles.big_search_container}`}>
      <div className={styles.big_search_content}>
        <div className={styles.big_header_logo}>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Hadikus Enterprise Logo"
              width={40}
              height={40}
            />
          </Link>
        </div>
        <div>
          <form onSubmit={submitHandler}>
            <div className={styles.big_search}>
              <div className={styles.big_search_icon} onClick={onCancel}>
                <SearchOutlined />
              </div>
              <input
                placeholder="Search"
                type="text"
                value={enteredSearchQuery}
                onChange={onChange}
                autoFocus
              />
            </div>
          </form>
          <div className={styles.popular_search}>
            <h3>Popular Search Terms</h3>
            <div className={styles.popular_link}>
              <Link href="/search/apsonic" onClick={hideBigSearchHandler}>
                Apsonic
              </Link>
              <Link href="/search/axil" onClick={hideBigSearchHandler}>
                Axil
              </Link>
              <Link href="/search/haojin" onClick={hideBigSearchHandler}>
                Haojin
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.cancel_text} onClick={onCancel}>
          <h3>Cancel</h3>
        </div>
      </div>
    </header>
  );
};

export default BigSearch;
