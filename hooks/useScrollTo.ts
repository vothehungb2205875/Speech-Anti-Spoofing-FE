'use client';

import { useCallback } from 'react';

export function useScrollTo() {
  return useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    const id = href?.slice(1);
    
    if (id) {
      // Update URL with hash
      window.history.pushState(null, "", href);
      
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 80; // Navbar height + padding
        const elementPosition = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top: elementPosition, behavior: "smooth" });
      }
    }
  }, []);
}
