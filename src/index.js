import './assets/styles/styles.css';

import Navbar from './app/components/navbar';
import GooglePlaces from './app/components/services/google-places';

function main() {
  const navbar = new Navbar();
  navbar.init();

  const locations = [
    'Molina',
    'Tres Esquinas',
    'Buena Paz',
    'Fuente de Agua',
    'Valdesina',
    'El Yacal',
    'Potrero Grande',
    'Camarico',
    'Lontué',
    'Casa Blanca',
    'Pichingal',
    'Pedregoso',
    'Curicó',
    'Cordillerilla',
    'Los Niches',
  ];

  const locationList = document.querySelector('.location-list');
  locations.forEach((location) => {
    locationList.innerHTML += `<li><button class="square-button--primary-container box-shadow-1">${location}</button></li>`;
  });

  // Reviews
  GooglePlaces.getReviews().then((data) => {
    console.log(data);
    data.forEach((review) => {
      const reviews = document.querySelector('.reviews');

      if (review.review.rating > 4 && review.review.content) {
        reviews.innerHTML += `<div class="comment box-shadow-2 spaced-y-05">
          <div class="flex-align-center gap-05">
            <img class="comment__avatar" src="${review.user.picture}" alt="Foto de perfil de cliente.">
            <div>
              <p class="txt-shadow-1 f-weight-500">${review.user.name}</p>
              <p class="ft-label">${review.review.since}</p>
              <p class="ft-label">${review.review.rating}</p>
            </div>
          </div>
          <p>“${review.review.content}”</p>
        </div>`;
      }
    });
  });
}

main();
