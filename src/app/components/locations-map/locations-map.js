import L from 'leaflet';
import BaseCustomElement from '../../core/base-custom-element';
import './locations-map.css';
import 'leaflet/dist/leaflet.css';

export default class LocationsMap extends BaseCustomElement {
  map = null;
  locationButtons = [];

  manualSelection = false;
  currentLocation = null; // { index: number, layer: L.Circle }

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
    {
      name: 'Curicó',
      coords: [-34.97602300490149, -71.23422608272696],
      radius: 3000,
      zoom: 12,
    },
    {
      name: 'Camarico',
      coords: [-35.22014478779119, -71.42311218417215],
      radius: 3000,
      zoom: 12,
    },
  ];

  htmlTemplate() {
    const locationsEl = this.locations.map((location, index) => `
      <li>
        <button class="location-button square-button button--secondary box-shadow-2" value="${index}" data-test="location-button">
          ${location.name}
        </button>
      </li>
      `).join('');

    return `
      <ul class="location-list list-style-none flex-justify-start flex-wrap">${locationsEl}</ul>
      <div class="locations-map b-rad-20 box-shadow-1" data-test="locations-map"></div>
    `;
  }

  afterFirstRender() {
    // Init map
    const mapSelector = this.querySelector('.locations-map');
    this.map = L.map(mapSelector).setView(this.origin.coords, 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);
    this.drawCirle(this.origin.name, this.origin.coords, this.origin.radius, false);

    // Select locations automatically
    this.autoSelectLocation();

    // Listen location buttons clicks
    this.locationButtons = this.querySelectorAll('.location-button');
    this.locationButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        this.manualSelection = true;

        // Restore previous location state
        if (this.currentLocation) {
          this.unfocusLocation(this.currentLocation.index, this.currentLocation.layer);
        }

        // Focus new location
        const index = e.target.value;
        const layer = this.focusLocation(index, true);
        this.currentLocation = { index, layer };
      });
    });
  }

  focusLocation(locationIndex, setView = false) {
    const location = this.locations[locationIndex];
    const locationButton = this.locationButtons[locationIndex];
    locationButton.classList.remove('button--secondary');
    locationButton.classList.add('button--primary');
    locationButton.classList.add('button--hover');
    if (setView) this.map.setView(location.coords, location.zoom);
    return this.drawCirle(location.name, location.coords, location.radius, true);
  }

  unfocusLocation(locationIndex, layer) {
    const locationButton = this.locationButtons[locationIndex];
    locationButton.classList.remove('button--primary');
    locationButton.classList.remove('button--hover');
    locationButton.classList.add('button--secondary');
    this.removeMapLayer(layer);
  }

  drawCirle(popup, coords, radius, diff) {
    const regularClr = 'var(--clr-secondary)';
    const diffColor = 'var(--clr-primary)';
    const circle = L.circle(coords, {
      color: diff ? diffColor : regularClr,
      fillColor: diff ? diffColor : regularClr,
      fillOpacity: diff ? 0.15 : 0.075,
      radius,
    }).addTo(this.map);

    if (popup) {
      circle.bindPopup(popup);
    }
    return circle;
  }

  removeMapLayer(layer) {
    this.map.removeLayer(layer);
  }

  autoSelectLocation() {
    // Stop if user interact with the map
    ['click', 'mousedown', 'mouseup'].forEach((e) => {
      this.map.addEventListener(e, () => {
        this.manualSelection = true;
      });
    });

    // Auto select locations
    let index = 0;
    const autoSelect = setInterval(() => {
      if (this.manualSelection) {
        clearInterval(autoSelect);
        return;
      }

      // Restore previous location state
      if (this.currentLocation) {
        this.unfocusLocation(this.currentLocation.index, this.currentLocation.layer);
      }

      // Focus new location
      const layer = this.focusLocation(index);
      this.currentLocation = { index, layer };

      index = index < this.locations.length - 1 ? index + 1 : 0;
    }, 1000);
  }
}
