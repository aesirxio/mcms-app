import { Component } from 'react';
import axios from 'axios';
import { ItemsItemModel, ItemsModel } from './CMSItemsModel';
import CMSItemsRoute from './CMSItemsRoute';

class AesirxCmsItemsApiService extends Component {
  route = null;

  constructor(props) {
    super(props);
    this.route = new CMSItemsRoute();
  }
  getList = async (filter) => {
    try {
      // const data = await this.route.getListRequest(filter);
      let results = null;
      const data = [
        {
          id: '260',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 100,
          featured: true,
        },
        {
          id: '261',
          name: 'Social Media Marketing for Free, how to ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: -2,
          featured: false,
        },
        {
          id: '262',
          name: 'Organic strategy, the lost discipline in digit...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 2,
          featured: true,
        },
        {
          id: '263',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '264',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: -2,
          featured: true,
        },
        {
          id: '265',
          name: 'Social Media Marketing for Free, how to ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: false,
        },
        {
          id: '266',
          name: 'Organic strategy, the lost discipline in digit...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 0,
          featured: true,
        },
        {
          id: '267',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '268',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: -2,
          featured: true,
        },
        {
          id: '2611',
          name: 'Social Media Marketing for Free, how to ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 0,
          featured: false,
        },
        {
          id: '2632',
          name: 'Organic strategy, the lost discipline in digit...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '2643',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '12',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '345',
          name: 'Social Media Marketing for Free, how to ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: false,
        },
        {
          id: '3452',
          name: 'Organic strategy, the lost discipline in digit...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 0,
          featured: true,
        },
        {
          id: '2345',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '565',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '262341',
          name: 'Social Media Marketing for Free, how to ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: false,
        },
        {
          id: '65',
          name: 'Organic strategy, the lost discipline in digit...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 2,
          featured: true,
        },
        {
          id: '897',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '4534',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '978',
          name: 'Social Media Marketing for Free, how to ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 2,
          featured: false,
        },
        {
          id: '567',
          name: 'Organic strategy, the lost discipline in digit...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '2344',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '657',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '2876861',
          name: 'Social Media Marketing for Free, how to ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: false,
        },
        {
          id: '89',
          name: 'Organic strategy, the lost discipline in digit...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '5634',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '678',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '67987',
          name: 'Social Media Marketing for Free, how to ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: false,
        },
        {
          id: '53',
          name: 'Organic strategy, the lost discipline in digit...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 1,
          featured: true,
        },
        {
          id: '263667',
          name: 'AesirX DMA: Open Source automation tool ...',
          type: 'Services',
          categories: 'News',
          author: 'John Dee',
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: 2,
          featured: true,
        },
      ];
      console.log('test', filter);
      if (data) {
        results = new ItemsModel({ _embedded: { item: data } });
      }
      return results;
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };

  delete = (data) => {
    console.log(data);
  };

  create = async (data) => {
    try {
      const result = await this.route.create(data);
      if (result) {
        return result.result;
      }
      return { message: 'Something have problem' };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };

  update = async (data) => {
    try {
      const result = await this.route.update(data);
      console.log('resultenee', result);
      if (result) {
        return result.result;
      }
      return { message: 'Something have problem' };
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };

  getDetail = async (id = 0) => {
    try {
      const data = await this.route.getDetail(id);
      let results = null;
      if (data) {
        results = new ItemsItemModel(data);
      }
      if (results) {
        results = results.toJSON();
      }

      return results;
    } catch (error) {
      if (axios.isCancel(error)) {
        return { message: 'isCancel' };
      } else throw error;
    }
  };
}

export default AesirxCmsItemsApiService;
