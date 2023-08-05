import Navbar from './navbar/navbar';
import GoogleReviews from './reviews/reviews';

export default function defineWebComponents() {
  customElements.define('main-navbar', Navbar);
  customElements.define('google-reviews', GoogleReviews);
}
