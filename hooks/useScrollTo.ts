'use client';

export function useScrollTo() {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("href")?.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
}
