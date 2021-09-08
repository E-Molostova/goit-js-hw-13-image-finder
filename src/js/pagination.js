import { refs } from './refs';
import makeImgMarkup from '../templates/img.hbs';
import ApiService from './api-servce';

const api = new ApiService();

refs.form.addEventListener('submit', handleShowImages);
refs.loadMoreBtn.addEventListener('click', handleShowNextImg);

function handleShowImages(e) {
  e.preventDefault();
  clearBody();
  api.resetPage();
  getImg();
}

function handleShowNextImg() {
  api.incPage();
  refs.loadMoreBtn.disabled = true;
  getImg();
}

function renderImg({ hits }) {
  const markup = makeImgMarkup(hits);
  refs.list.insertAdjacentHTML('beforeend', markup);
}

function getImg() {
  api
    .fetchImg()
    .then(data => {
      renderImg(data);
      refs.loadMoreBtn.classList.remove('is-hidden');
      refs.loadMoreBtn.disabled = false;
    })
    .catch(error => {
      clearBody();
      refs.list.innerHTML = error.message;
      refs.loadMoreBtn.classList.add('is-hidden');
    });
}

function clearBody() {
  refs.list.innerHTML = '';
}
