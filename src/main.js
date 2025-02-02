import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import {createGallery} from './js/render-functions';
import {searchPhotos} from "./js/pixabay-api";

const searchedValue = document.querySelector(".input");
const button = document.querySelector(".button-submit");
const gallery = document.querySelector(".gallery");
const form = document.querySelector('.group-form');
const loader = document.querySelector('.loader');

form.addEventListener('submit', imageSearch);

loader.style.display = 'none';

const galleryModal = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

function imageSearch (event) {
    event.preventDefault();
    gallery.innerHTML='';
    if (!searchedValue.value.trim()) {
        iziToast.error({
          title: 'Error',
          message: "Please enter your search terms",
          position: 'topRight',
          backgroundColor: '#ef4040',
          messageColor: '#fff',
          titleColor: '#fff',
        });
        return;
      }
    
    loader.style.display = 'inline-block';

    searchPhotos(searchedValue.value)
    .then(sValue => {
        if (sValue.hits.length === 0) {
            iziToast.show({
              title: '',
              backgroundColor: '#EF4040',
              messageColor: '#FFFFFF',
              message: `Sorry, there are no images matching your search query. Please try again!`,
              position: 'topCenter',
            });
        };
        gallery.insertAdjacentHTML('beforeend', createGallery(sValue.hits));
        galleryModal.refresh();
        loader.style.display = 'none';
    })
    .catch(error => {
        console.log(error.message)
    })
    .finally(() => {
        loader.style.display = 'none';
        form.reset();
      });
}

