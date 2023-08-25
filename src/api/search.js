import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getPicturesGallery(items) {
  const response = await axios.get(axios.defaults.baseURL, {
    params: {
      q: items.q.trim(),
      page: items.page,
      key: '38043357-f10dc93754f8f78d0f9509fe0',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: items.per_page,
    },
  });

  return response;
}

export { getPicturesGallery };
