import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getPicturesGallery(query, pageNumber) {
  const response = await axios.get(axios.defaults.baseURL, {
    params: {
      q: query,
      page: pageNumber,
      key: '38043357-f10dc93754f8f78d0f9509fe0',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return response;
}

export { getPicturesGallery };
