/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxApiInstance from 'aesirx-dma-lib/src/gateway/Instance';
import BaseRoute from 'aesirx-dma-lib/src/Abstract/BaseRoute';

class CmsItemsRoute extends BaseRoute {
  getListRequest = (filter) =>
    AesirxApiInstance.get(
      this.createRequestURL({
        option: 'items',
        ...filter,
      })
    );

  getFields = (contentType) => {
    console.log('get Fields', contentType);
    return true;
    // AesirxApiInstance.get(
    //   this.createRequestURL({
    //     option: 'items',
    //     id: contentType,
    //   })
    // );
  };
  getDetail = (id = 0, dataFilter = {}) => {
    return AesirxApiInstance.get(
      this.createRequestURL({
        option: this.option,
        id: id,
        ...dataFilter,
      })
    );
  };

  create = (data) => {
    return AesirxApiInstance.post(
      this.createRequestURL({
        option: this.option,
      }),
      data
    );
  };
  update = (data) => {
    return AesirxApiInstance.put(
      this.createRequestURL({
        option: this.option,
      }),
      data,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  };
  deleteItems = (data) => {
    console.log(data);
    // return AesirxApiInstance.delete(
    //   this.createRequestURL({
    //     option: this.option,
    //   }),
    //   {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     data: { id: id },
    //   }
    // );
  };
  toggleFeatured = (id, isFeatured) => {
    return AesirxApiInstance.post(
      this.createRequestURL({
        option: this.option,
        id,
        isFeatured,
      })
    );
  };
}

export default CmsItemsRoute;
