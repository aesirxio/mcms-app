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
        borderColor: isBorder ? 'var(--bs-border-color)' : 'transparent',
        '&:hover': {
          borderColor: isBorder ? 'var(--bs-border-color)' : 'transparent',
        },
        backgroundColor: 'transparent',
        cursor: 'pointer',
        borderRadius: '5px',
        width: 'auto',
        padding: '0 .5rem 0 .5rem',
      };
    },

    menu: (styles) => {
      return {
        ...styles,
        margin: 0,
        border: '1px solid var(--bs-border-color)',
        boxShadow: '0 3px 5px rgb(0 0 0 / 5%)',
        backgroundColor: 'var(--bs-info)',
        width: '100%',
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        cursor: 'pointer',
        color: state.isSelected ? 'var(--bs-success)' : 'var(--bs-body-color)',
        backgroundColor: state.isSelected ? 'var(--bs-green-light)' : 'transparent',
        '&:hover': {
          color: 'var(--bs-success)',
          backgroundColor: 'var(--bs-green-light)',
        },
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
