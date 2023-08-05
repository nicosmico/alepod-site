import './assets/styles/styles.css';
import defineWebComponents from './app/components/components';

function main() {
  defineWebComponents();

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
}

main();
