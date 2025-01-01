import Image from "next/image";

import styles from "./Header.module.css";
import Link from "next/link";

import { WorkOutline, SearchOutlined } from "@mui/icons-material";
import { Fragment, useEffect, useState } from "react";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import BigSearch from "../BigSearch/BigSearch";
import Menu from "../Menu/Menu";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "@/firebase";

const Header = () => {
  const [enteredSearchQuery, setEnteredSearchQuery] = useState("");
  const [showBigSearch, setShowBigSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
    return () => unsuscribe();
  }, []);

  const router = useRouter();

  const showBigSearchHandler = () => {
    setShowBigSearch(true);
  };

  const hideBigSearchHandler = () => {
    setShowBigSearch(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    router.push(`/search/${enteredSearchQuery}`);
  };

  const onChangeHandler = (event) => {
    if (event.target.value !== "") setShowBigSearch(true);
    setEnteredSearchQuery(event.target.value);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Fragment>
      {!showBigSearch ? (
        <header className={styles.header}>
          <div>
            <Link href="/">
              <Image src="/images/logo.png" height={45} width={45} alt="Logo" />
            </Link>
          </div>
          <div className={styles.list_container}>
            <ul className={styles.ul_list}>
              <li className={styles.products}>
                <Link href="/products">Products</Link>
              </li>
              <li className={styles.about_us}>
                <Link href="/">About Us</Link>
              </li>
              <li className={styles.contact}>
                <Link href="/">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className={styles.right_side}>
            <form onSubmit={submitHandler} className={styles.input_form}>
              <div className={styles.search}>
                <div
                  className={styles.search_icon}
                  onClick={showBigSearchHandler}
                >
                  <SearchOutlined />
                </div>
                <input
                  placeholder="Search"
                  type="text"
                  value={enteredSearchQuery}
                  onChange={onChangeHandler}
                  autoFocus
                />
              </div>
            </form>

            <div className={styles.right_side_icon}>
              <Link href="/cart" className={styles.cart_container}>
                <WorkOutline className={styles.cart_icon} />
              </Link>
              {!isLoggedIn ? (
                <Link href="/signup" className={styles.signup_container}>
                  Sign up
                </Link>
              ) : (
                <button onClick={handleLogout}>Log out</button>
              )}
              <div className={styles.menu_icon}>
                <Menu />
              </div>
            </div>
          </div>
        </header>
      ) : (
        <Drawer
          open={showBigSearch}
          onClose={hideBigSearchHandler}
          anchor="top"
        >
          <Box role="presentation">
            <BigSearch
              onChange={(event) => setEnteredSearchQuery(event.target.value)}
              enteredSearchQuery={enteredSearchQuery}
              onCancel={hideBigSearchHandler}
              hideBigSearchHandler={hideBigSearchHandler}
            />
          </Box>
        </Drawer>
      )}
    </Fragment>
  );
};

export default Header;
