import React from 'react';
import RatingsHeader from '@/lib/ui/screen-components/protected/ratings/header/screen-header';
import RatingMain from '@/lib/ui/screen-components/protected/ratings/main';

export default function RatingScreen() {
  return (
    <div className="screen-container">
      <RatingsHeader />
      <RatingMain />
    </div>
  );
}
