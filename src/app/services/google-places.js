export default class GooglePlaces {
  apiUrl = 'https://google-places-api-qpqs.onrender.com/';

  getReviews() {
    return fetch(this.apiUrl)
      .then((response) => response.json());
  }
}
