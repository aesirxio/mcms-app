import { observer } from 'mobx-react';
import React from 'react';
import styles from './index.module.scss';
const tabList = [
  {
    title: 'All items',
    slug: 'all',
  },
  {
    title: 'Published',
    slug: 'published',
  },
  {
    title: 'Unpublished',
    slug: 'unpublished',
  },
  {
    title: 'Archived',
    slug: 'archived',
  },
  {
    title: 'Draft',
    slug: 'draft',
  },
  {
    title: 'Trashed',
    slug: 'trashed',
  },
];
const TabBarComponent = observer(({ viewModel }) => {
  return (
    <ul className="list-unstyled d-flex border-bottom mb-24">
      {tabList.map((item, index) => {
        return (
          <li
            key={index}
            className={`${
              viewModel.filters.views == item.slug
                ? `${styles['active']} fw-bold position-relative`
                : styles['list-item']
            } pb-16 me-40 cursor-pointer`}
            onClick={() => {
              viewModel.getListByFilter((viewModel.filters.views = item.slug));
            }}
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
});

export default TabBarComponent;
