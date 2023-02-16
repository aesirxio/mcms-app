import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnalyticsReact } from 'aesirx_analytics';
const AnalyticsContainer = () => {
  const location = useLocation();
  return <AnalyticsReact pathname={location.pathname} />;
};

export default AnalyticsContainer;
