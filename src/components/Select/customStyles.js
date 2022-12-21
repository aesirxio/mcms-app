/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const customStyles = (isBorder, isShadow = false, isSemibold = false) => {
  return {
    control: (provided) => {
      return {
        ...provided,
        minHeight: 48,
        boxShadow: isShadow ? '0 3px 5px rgb(0 0 0 / 5%)' : 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        borderRadius: '5px',
        width: 'auto',
      };
    },

    menu: (styles) => {
      return {
        ...styles,
        top: 'calc(100% - 2px)',
        margin: 0,
        boxShadow: '0 3px 5px rgb(0 0 0 / 5%)',
        width: '100%',
      };
    },
    indicatorSeparator: () => ({ display: 'none' }),

    dropdownIndicator: (base) => ({
      ...base,
      color: 'var(--bs-success)',
      '&:hover': {
        color: 'var(--bs-success)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--bs-body-color)',
      fontWeight: 400,
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: 'var(--bs-body-color)',
        fontWeight: isSemibold ? 600 : 400,
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--view-active-bg)',
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--bs-body-color)',
    }),
  };
};

export default customStyles;
