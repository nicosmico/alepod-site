import LocationsMap from './locations-map/locations-map';
import Navbar from './navbar/navbar';
import GoogleReviews from './reviews/reviews';

export default function defineCustomElements() {
  customElements.define('main-navbar', Navbar);
  customElements.define('google-reviews', GoogleReviews);
  customElements.define('locations-map', LocationsMap);
}
