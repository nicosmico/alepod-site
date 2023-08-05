import star from '../../../assets/icons/star.svg';
import starFilled from '../../../assets/icons/star-filled.svg';
import GooglePlaces from '../../services/google-places';
import BaseCustomElement from '../../core/base-custom-element';
import mockReviews from '../../mock/google-reviews.json';

export default class GoogleReviews extends BaseCustomElement {
  reviews = mockReviews;
  googlePlaces = new GooglePlaces();

  constructor() {
    super({ reactiveProperties: ['reviews'] });
  }

  afterFirstRender() {
    this.getGoogleReviews().then((data) => {
      this.reviews = data;
    });
  }

  render() {
    return this.reviews.map((review) => this.getReviewTemplate(review)).join('');
  }

  getReviewTemplate(review) {
    return `
    <div class="comment box-shadow-2 spaced-y-05">
      <div class="flex-align-center gap-05">
        <img class="comment__avatar" src="${review.user.picture}" alt="Foto de perfil de cliente.">
        <div>
          <p class="txt-shadow-1 f-weight-500">${review.user.name}</p>
          <div class="flex-align-center gap-05">
            <p class="ft-label">${review.review.since}</p>
            <p class="ft-label flex">${this.getStarRanking(review.review.rating)}</p>
          </div>
        </div>
      </div>
      <p>“${review.review.content}”</p>
    </div>`;
  }

  getStarRanking(ranking) {
    const starImg = `<img src="${star}" class="comment__star" alt="Estrella">`;
    const filledStarImg = `<img src="${starFilled}" class="comment__star" alt="Estrella completada">`;
    return filledStarImg.repeat(ranking) + starImg.repeat(5 - ranking);
  }

  getGoogleReviews() {
    return this.googlePlaces.getReviews()
      .then((data) => data.filter((review) => review.review.rating >= 4 && review.review.content));
  }
}
