import axios from 'axios';
const apiKey = '48601287-44eda15d36b20e5cccdc82f7d';

export const searchPhotos = async (searchedValue, page) => {
  try {
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q: searchedValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.status || "Network Error");
  };
};