import React, { useState } from 'react';
// import { Link } from "react-router-dom";
import styles from './index.module.scss';
function TabBarComponent({ setFilterTab }) {
  const [active, setActive] = useState({ target: { outerText: 'All items' } });
  const tabList = [
    {
      title: 'All items',
      slug: 'all-items',
      link: '/all-items',
    },
    {
      title: 'Published',
      slug: 'published',
      link: '/published',
    },
    {
      title: 'Unpublished',
      slug: 'unpublished',
      link: '/unpublished',
    },
    {
      title: 'Archived',
      slug: 'archived',
      link: '/archived',
    },
    {
      title: 'Draft',
      slug: 'draft',
      link: '/draft',
    },
    {
      title: 'Trashed',
      slug: 'trashed',
      link: '/trashed',
    },
  ];
  return tabList ? (
    <ul className="list-unstyled d-flex border-bottom mb-24">
      {tabList.map((item, index) => {
        return (
          <li
            key={index}
            className={`${
              active.target?.outerText === item.title
                ? `${styles['active']} fw-bold position-relative`
                : styles['list-item']
            } pb-16 me-40 cursor-pointer`}
            onClick={(e) => {
              setFilterTab(e);
              setActive(e);
            }}
          >
            {/* <Link className={`text-decoration-none`}> */}
            {item.title}
            {/* </Link> */}
          </li>
        );
      })}
    </ul>
  ) : (
    ''
  );
}

export default TabBarComponent;
