'use client';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { locations, reviews, type Language, type Review } from '@/lib/content';
import { useLanguage } from './LanguageProvider';
function ReviewCard({ review, language }: { review: Review; language: Language }) {
  const location = locations.find(item => item.id === review.locationId);
  const long = review.quote[language].length > 175;
  return <article className={`review-card ${long ? 'review-card-long' : ''}`}><div className="review-stars" aria-label={`${review.stars} / 5`}>{Array.from({ length: review.stars }, (_, index) => <Star key={index} size={15} fill="currentColor" strokeWidth={1.5} />)}</div><blockquote>“{review.quote[language]}”</blockquote><div className="review-author"><span className="review-avatar" aria-hidden="true">{review.author.slice(0,1)}</span><div><strong>{review.author}</strong><span>Big Bowl · {location?.name[language]}</span></div></div></article>;
}
function GoogleLogo() {
  return <svg className="google-rating-logo" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#4285F4" d="M43.61 24.46c0-1.36-.12-2.66-.35-3.92H24v7.42h11a9.4 9.4 0 0 1-4.08 6.18v5.14h6.61c3.87-3.57 6.08-8.83 6.08-14.82Z" />
    <path fill="#34A853" d="M24 44c5.51 0 10.13-1.83 13.53-4.96l-6.61-5.14c-1.83 1.23-4.17 1.98-6.92 1.98-5.31 0-9.82-3.59-11.43-8.43H5.75v5.3A20 20 0 0 0 24 44Z" />
    <path fill="#FBBC05" d="M12.57 27.45A12 12 0 0 1 12 24c0-1.2.2-2.36.57-3.45v-5.3H5.75A20 20 0 0 0 4 24c0 3.23.78 6.28 1.75 8.75l6.82-5.3Z" />
    <path fill="#EA4335" d="M24 12.12c3.01 0 5.71 1.04 7.84 3.08l5.88-5.88C34.12 5.96 29.51 4 24 4A20 20 0 0 0 5.75 15.25l6.82 5.3C14.18 15.71 18.69 12.12 24 12.12Z" />
  </svg>;
}
export function ReviewsSection() {
  const { language, t } = useLanguage();
  return <section id="reviews" className="reviews-section" aria-labelledby="reviews-title"><div className="content-width">
    <div className="section-heading reviews-heading"><p className="eyebrow">Big Bowl · {t.city}</p><h2 id="reviews-title">{t.reviews}</h2><p>{t.reviewsIntro}</p></div>
    <div className="review-ratings" aria-label={t.rating}>{locations.map(location => <div className="google-rating-badge" key={location.id}>
      <GoogleLogo />
      <div className="google-rating-copy"><span className="google-rating-branch">Big Bowl {location.name[language]}</span><span className="google-rating-label">{language === 'pt' ? 'Avaliações Google' : 'Google reviews'}</span><div className="google-rating-score"><strong aria-label={`${location.rating.toFixed(1)} / 5`}>{location.rating.toFixed(1)}</strong><span className="rating-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={19} fill="currentColor" strokeWidth={0} />)}</span></div></div>
    </div>)}</div>
    <div className="reviews-stage"><Image src="/images/food-cta-2.webp" alt="" fill sizes="100vw" /><div className="reviews-stage-shade" /><div className="reviews-track"><div className="reviews-set">{reviews.map(review => <ReviewCard key={review.id} review={review} language={language} />)}</div><div className="reviews-set" aria-hidden="true" inert>{reviews.map(review => <ReviewCard key={review.id} review={review} language={language} />)}</div></div></div>
  </div></section>;
}
