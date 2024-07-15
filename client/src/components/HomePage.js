import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <Link to="/register">{t('register')}</Link>
      <Link to="/login">{t('login')}</Link>
    </div>
  );
}

export default HomePage;
