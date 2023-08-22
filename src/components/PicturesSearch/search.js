import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function getPicturesGallery(items, showLoader) {
  const response = await axios.get(axios.defaults.baseURL, {
    params: {
      q: items.q.trim(),
      page: items.page,
      key: items.key,
      image_type: items.image_type,
      orientation: items.orientation,
      per_page: items.per_page,
    },
  });

  return response;
}

export { getPicturesGallery };
