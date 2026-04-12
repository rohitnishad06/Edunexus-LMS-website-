import React, { use } from 'react'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const pathName = useLocation()
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[pathName]);
}

export default ScrollToTop