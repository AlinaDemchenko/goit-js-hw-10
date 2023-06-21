import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '700px',
  position: 'left-top',
  backOverlay: true,
  backOverlayColor: 'rgba(20, 20, 20, 0.17)',
  fontSize: '26px',
  failure: {
    background: 'rgb(47, 37, 85)',
    notiflixIconColor: 'rgb(255, 255, 255)',
  },
});

const refs = {
  selection: document.querySelector('.breed-select'),
  card: document.querySelector('.cat-info'),
  loader: document.querySelector('#loader'),
};

refs.selection.setAttribute('hidden', true);

fetchBreeds()
  .then(data => {
    refs.selection.removeAttribute('hidden');
    data.map(({ id, name }) => {
      const markup = `<option value="${id}">${name}</option>`;
      refs.selection.insertAdjacentHTML('beforeend', markup);
    });
    new SlimSelect({ select: '.breed-select' });
  })
  .catch(error => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  }).finally(() => {refs.loader.classList.replace('loader', 'hidden');});

refs.selection.addEventListener('change', handlerOption);

function handlerOption(event) {
  refs.card.remove();
  refs.loader.classList.replace('hidden', 'loader');
  const id = event.currentTarget.value;
  fetchCatByBreed(id)
    .then(data => {refs.card.removeAttribute('hidden');
      const { url, breeds } = data[0];
      const { name, description, temperament } = breeds[0];
      const markup = `<div class="wrapper">
        <img src="${url}" alt="${name}" class="cat-img">
      </div>
<div class="thumb"><h1>${name}</h1>
  <h2>${temperament}</h2>
  <p>${description}</p>
</div>
    </div>`;
      refs.loader.after(refs.card);
      refs.card.innerHTML = markup;
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    }).finally(() => {refs.loader.classList.replace('loader', 'hidden');});
}
