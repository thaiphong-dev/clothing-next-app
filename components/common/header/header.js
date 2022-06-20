import React, { useState, useContext } from "react";
import Image from "next/image";
import logo1 from "./../../../public/images/icons/logo-01.png";
import iconClose2 from "./../../../public/images/icons/icon-close2.png";
import Link from "next/link";
import { cartItemsContext } from "../layout/layout";
import Dropdown from "react-bootstrap/Dropdown";

export default function Header() {
  const cartContext = useContext(cartItemsContext);
  const [scroll, setScroll] = useState("wrap-menu-desktop");
  const [activeMenu, setActiveMenu] = useState(1);
  const scrolled = () => {
    if (window.pageYOffset > 85) {
      setScroll("wrap-menu-desktop active");
    } else {
      setScroll("wrap-menu-desktop");
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", scrolled);
  });

  return (
    <div>
      <header>
        {/* <!-- Header desktop --> */}
        <div className="container-menu-desktop">
          {/* <!-- Topbar --> */}
          <div className={scroll}>
            <nav className="limiter-menu-desktop container">
              {/* <!-- Logo desktop -->		 */}
              <a href="/" className="logo">
                <Image src={logo1} alt="IMG-LOGO-DESKTOP" />
              </a>
              {/* <!-- Menu desktop --> */}
              <div className="menu-desktop">
                <ul className="main-menu">
                  <li
                    className={activeMenu === 1 ? "active-menu" : ""}
                    onClick={() => setActiveMenu(1)}
                  >
                    <Link href="/" passHref>
                      Home
                    </Link>
                  </li>
                  <li
                    className={activeMenu === 2 ? "active-menu" : ""}
                    onClick={() => setActiveMenu(2)}
                  >
                    <Link href="/shop" passHref>
                      Shop
                    </Link>
                  </li>
                  <li
                    className={activeMenu === 3 ? "active-menu" : ""}
                    onClick={() => setActiveMenu(3)}
                  >
                    <Link href="/about" passHref>
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <!-- Icon header --> */}
              <div className="wrap-icon-header flex-w flex-r-m">
                <Link href="/cart" passHref>
                  <div
                    className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                    data-notify={cartContext.cartItems.length}
                  >
                    <i className="zmdi zmdi-shopping-cart"></i>
                  </div>
                </Link>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <i className="zmdi zmdi-account zmdi-hc-lg" size="10px"></i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/account">Tài Khoản</Dropdown.Item>
                    <Dropdown.Item href="/yourorder">Đơn Mua</Dropdown.Item>
                    <Dropdown.Item href="/login" style={{ color: "red" }}>
                      Đăng Xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </nav>
          </div>
        </div>
        {/* <!-- Header Mobile --> */}
        <div className="wrap-header-mobile">
          {/* <!-- Logo moblie -->		 */}
          <div className="logo-mobile">
            <a href="index.html">
              <Image alt="IMG-LOGO" src={logo1} />
            </a>
          </div>
          {/* <!-- Icon header --> */}
          <div className="wrap-icon-header flex-w flex-r-m m-r-15">
            <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
              <i className="zmdi zmdi-search"></i>
            </div>
            <Link href="/cart" passHref>
              <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
                data-notify={cartContext.cartItems.length}
              >
                <i className="zmdi zmdi-shopping-cart"></i>
              </div>
            </Link>
            <a
              href="#"
              className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
              data-notify="0"
            >
              <i className="zmdi zmdi-favorite-outline"></i>
            </a>
          </div>
          {/* <!-- Button show menu --> */}
          <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </div>
        </div>
        {/* <!-- Menu Mobile --> */}
        <div className="menu-mobile">
          <ul className="main-menu-m">
            <li>
              <a href="index.html">Home</a>
              <span className="arrow-main-menu-m">
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </span>
            </li>
            <li>
              <a href="product.html">Shop</a>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
          </ul>
        </div>
        {/* <!-- Modal Search --> */}
        <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
          <div className="container-search-header">
            <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
              <Image src={iconClose2} alt="CLOSE" />
            </button>
            <form className="wrap-search-header flex-w p-l-15">
              <button className="flex-c-m trans-04">
                <i className="zmdi zmdi-search"></i>
              </button>
              <input
                className="plh3"
                type="text"
                name="search"
                placeholder="Search..."
              />
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}
