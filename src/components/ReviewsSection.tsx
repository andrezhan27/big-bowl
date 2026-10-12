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
export function ReviewsSection() {
  const { language, t } = useLanguage();
  return <section id="reviews" className="reviews-section" aria-labelledby="reviews-title"><div className="content-width">
    <div className="section-heading reviews-heading"><p className="eyebrow">Big Bowl · {t.city}</p><h2 id="reviews-title">{t.reviews}</h2><p>{t.reviewsIntro}</p></div>
    <div className="review-ratings" aria-label={t.rating}>{locations.map(location => <div key={location.id}><span>Big Bowl {location.name[language]}</span><strong>{location.rating.toFixed(1)}</strong><span className="rating-stars" aria-hidden="true">★</span></div>)}</div>
    <div className="reviews-stage"><Image src="/images/food-cta-2.png" alt="" fill sizes="100vw" /><div className="reviews-stage-shade" /><div className="reviews-track"><div className="reviews-set">{reviews.map(review => <ReviewCard key={review.id} review={review} language={language} />)}</div><div className="reviews-set" aria-hidden="true" inert>{reviews.map(review => <ReviewCard key={review.id} review={review} language={language} />)}</div></div></div>
  </div></section>;
}
