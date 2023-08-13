import ContactButtons from './contact-buttons/contact-buttons';
import LocationsMap from './locations-map/locations-map';
import MainNavbar from './navbar/navbar';
import GoogleReviews from './google-reviews/google-reviews';

export default function defineCustomElements() {
  customElements.define('main-navbar', MainNavbar);
  customElements.define('google-reviews', GoogleReviews);
  customElements.define('locations-map', LocationsMap);
  customElements.define('contact-buttons', ContactButtons);
}
