import './assets/styles/styles.css';

import Navbar from './app/components/navbar';

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
    locationList.innerHTML += `<li><button class="chip--primary-container box-shadow-1">${location}</button></li>`;
  });
}

main();
