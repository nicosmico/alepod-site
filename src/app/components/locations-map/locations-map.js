import L from 'leaflet';
import BaseCustomElement from '../../core/base-custom-element';
import './locations-map.css';
import 'leaflet/dist/leaflet.css';

/**
 * TODO: Reducir la cantidad de localidades para que se vea completo en mobile (localidades + mapa)
 */

export default class LocationsMap extends BaseCustomElement {
  map = null;
  origin = {
    name: null,
    coords: [-35.116206612939614, -71.2835424547279],
    radius: 18000,
    zoom: 12,
  };

  locations = [
    {
      name: 'Molina',
      coords: [-35.11225501154037, -71.29345605089958],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Tres Esquinas',
      coords: [-35.16778982317412, -71.21549184521827],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Buena Paz',
      coords: [-35.1625496, -71.1724157],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Fuente de Agua',
      coords: [-35.2603668783353, -71.15065594710998],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Valdesina',
      coords: [-35.21919241622903, -71.19865496693272],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'El Yacal',
      coords: [-35.18785810483697, -71.11586941392153],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Potrero Grande',
      coords: [-35.18133745951146, -71.0992855665929],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Camarico',
      coords: [-35.22014478779119, -71.42311218417215],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Lontué',
      coords: [-35.05627034478617, -71.26958577818152],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Casa Blanca',
      coords: [-35.0723520725785, -71.25620401939693],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Pichingal',
      coords: [-35.11723257542867, -71.21467527081698],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Pedregoso',
      coords: [-35.16590538650141, -71.20943115875654],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Curicó',
      coords: [-34.97602300490149, -71.23422608272696],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Cordillerilla',
      coords: [-35.12364208512587, -71.14732308050735],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Los Niches',
      coords: [-35.06650976597492, -71.16560299320798],
      radius: 3000,
      zoom: 12,
    },
  ];

  render() {
    const locationsEl = this.locations.map((location, index) => `
      <li>
        <button class="location-button square-button--primary-container box-shadow-2" value="${index}">
          ${location.name}
        </button>
      </li>
      `).join('');

    return `
      <ul class="location-list list-style-none flex-justify-start flex-wrap m-b-1">${locationsEl}</ul>
      <div id="map" class="locations-map-container b-rad-20"></div>
    `;
  }

  afterFirstRender() {
    const locationButtons = document.querySelectorAll('.location-button');
    locationButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const locationIndex = e.target.value;
        const location = this.locations[locationIndex];
        this.map.setView(location.coords, location.zoom);
        this.drawCirle(location.name, location.coords, location.radius, true);
      });
    });

    // Init map
    this.map = L.map('map').setView(this.origin.coords, 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    this.drawCirle(this.origin.name, this.origin.coords, this.origin.radius, false);
  }

  drawCirle(popup, coords, radius, diff) {
    const clrPrimary = 'var(--clr-primary)';
    const clrSecondary = 'var(--clr-secondary)';
    const circle = L.circle(coords, {
      color: diff ? clrPrimary : clrSecondary,
      fillColor: diff ? clrPrimary : clrSecondary,
      fillOpacity: diff ? 0 : 0.3,
      radius,
    }).addTo(this.map);

    if (popup) {
      circle.bindPopup(popup);
    }
  }
}
