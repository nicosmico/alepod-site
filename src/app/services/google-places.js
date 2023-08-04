export default class GooglePlaces {
  static getReviews() {
    const requestOptions = {
      method: 'GET',
    };
    return fetch('https://google-places-api-qpqs.onrender.com/', requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error) => console.error('error', error));
  }
}
