import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createGallery } from './js/render-functions';
import { searchPhotos } from './js/pixabay-api';

import axios from 'axios';

let page = 1;
const per_page = 15;

const searchedValue = document.querySelector('.input');
const button = document.querySelector('.button-submit');
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.group-form');
const loader = document.querySelector('.loader');
const LMbtn = document.querySelector('.lm-btn');


form.addEventListener('submit', imageSearch);
LMbtn.addEventListener('click', loadMore);

loader.style.display = 'none';
LMbtn.style.display = 'none';

const galleryModal = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

async function imageSearch(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  if (!searchedValue.value.trim()) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter your search terms',
      position: 'topRight',
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      titleColor: '#fff',
    });
    return;
  }
  loader.style.display = 'inline-block';
  try {
    const sValue = await searchPhotos(searchedValue.value, page);
    if (sValue.hits.length === 0) {
      iziToast.show({
        title: '',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: 'topCenter',
      });
    }
    page = 1;

    gallery.insertAdjacentHTML('beforeend', createGallery(sValue.hits));
    galleryModal.refresh();
    loader.style.display = 'none';

    if (page * per_page < sValue.totalHits) {
      LMbtn.style.display = 'inline-block';
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    loader.style.display = 'none';
  }
}

async function loadMore() {
  page += 1;
  LMbtn.disabled = true;

  LMbtn.style.display = 'none';
  loader.style.display = 'inline-block';

  try {
    const sValue = await searchPhotos(searchedValue.value, page);

    gallery.insertAdjacentHTML('beforeend', createGallery(sValue.hits));
    galleryModal.refresh();
    loader.style.display = 'none';

    if (page * per_page >= sValue.totalHits) {
      LMbtn.style.display = 'none';
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomCenter',
        timeout: 1000,
      });
      form.reset();
    } else {
      LMbtn.style.display = 'inline-block';
    }

    // Scroll
    const pageHeight = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;
    window.scrollBy({
      top: pageHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    alert(error.message);
  } finally {
    LMbtn.disabled = false;
  }
}
