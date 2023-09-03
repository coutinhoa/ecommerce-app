export function getAverageRating(reviews) {
  let sum = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += reviews[i].rating;
  }
  return (sum / reviews.length).toFixed(1);
}
