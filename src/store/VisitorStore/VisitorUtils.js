class VisitorUtils {
  transformVisitorResponseIntoModel = (response) => {
    let transformResponse = response.length
      ? response.map((item) => {
          return { name: item.date, line: item.visits };
        })
      : [];
    return transformResponse;
  };

  transformResponseIntoSearchItems = (response) => {
    return response;
  };
}

const utils = new VisitorUtils();

export default utils;
