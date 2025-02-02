const apiKey = '48601287-44eda15d36b20e5cccdc82f7d';
export const searchPhotos = searchedValue => {
  const params = new URLSearchParams({
    key: apiKey,
    q: searchedValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`https://pixabay.com/api/?${params.toString()}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
};