import AesirxApiInstance from 'aesirx-dma-lib/src/gateway/Instance';
import BaseRoute from 'aesirx-dma-lib/src/Abstract/BaseRoute';

class CmsCategoriesRoute extends BaseRoute {
  option = '';

  getList = () => {
    return AesirxApiInstance().get(
      this.createRequestURL({
        option: 'reditem',
        view: 'category_with_org_check_metaverse_categories_63',
      })
    );
  };
  getDetail = (id = 0) => {
    return AesirxApiInstance().get(
      this.createRequestURL({
        option: 'reditem',
        view: 'category_with_org_check_metaverse_categories_63',
        id: id,
      })
    );
  };

  create = (data) => {
    return AesirxApiInstance().post(
      this.createRequestURL({
        option: 'reditem',
        view: 'category_with_org_check_metaverse_categories_63',
      }),
      data
    );
  };
  update = (data) => {
    return AesirxApiInstance().put(
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
  delete = (id) => {
    return AesirxApiInstance().delete(
      this.createRequestURL({
        option: 'reditem',
        view: 'category_with_org_check_metaverse_categories_63',
        id: id,
      })
    );
  };
}

export default CmsCategoriesRoute;
