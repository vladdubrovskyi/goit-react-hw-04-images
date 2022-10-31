import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getFetchImages = async (query, page = 1) => {
  const response = await axios({
    params: {
      key: '29821254-cc8d55b85aa42c363f8211fb8',
      image_type: 'photo',
      orientation: 'horizontal',
      page,
      per_page: 12,
      q: query,
    },
  });

  return response.data;
};


