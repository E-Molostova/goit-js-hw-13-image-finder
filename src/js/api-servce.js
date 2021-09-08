import { refs } from './refs';

export default class ApiService {
  #KEY = '23291361-b9834d1407f849d06e39836e0';
  BASE_URL = 'https://pixabay.com/api';

  constructor() {
    this.page = 1;
  }

  fetchImg(e) {
    const input = refs.form.elements.search.value;
    const queryParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      q: input,
      page: this.page,
      per_page: 12,
      key: this.#KEY,
    });
    return fetch(`${this.BASE_URL}/?${queryParams}`).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error');
    });
  }

  incPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
