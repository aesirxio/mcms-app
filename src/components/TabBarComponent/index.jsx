import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
function TabBarComponent({ view, tabList }) {
  return tabList ? (
    <ul className="list-unstyled d-flex border-bottom mb-24">
      {tabList.map((item, index) => {
        return (
          <li
            key={index}
            className={`${
              view === item.slug
                ? `${styles["active"]} fw-bold position-relative`
                : styles["list-item"]
            } pb-16 me-4`}
          >
            <Link className={`text-decoration-none`} to={item.link}>
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  ) : (
    ""
  );
}

export default TabBarComponent;
