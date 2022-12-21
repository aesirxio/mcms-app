/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const classNames = (isBorder) => {
  return {
    menu: ({ theme }) => (theme.className += ' bg-white border-1'),
    control: ({ theme }) =>
      isBorder ? (theme.className += ' border') : (theme.className += ' border-0 '),
  };
};

export default classNames;
