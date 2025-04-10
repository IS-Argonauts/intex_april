import { useRef, useEffect } from 'react';
import './ContentCarousel.css';

const posters = [
    '/posters/2012.jpg',
    '/posters/a-ghost-story.jpg',
    '/posters/apollo-18.jpg',
    '/posters/engineering-girls.jpg',
    '/posters/journey-to-greenland.jpg',
    '/posters/kevin-hart-what-now.jpg',
    '/posters/kung-fu-panda.jpg',
    '/posters/la-grande-chaumiere-violette.jpg',
    '/posters/last-knights.jpg',
    '/posters/legend-of-the-guardians.jpg',
    '/posters/running-out-of-time.jpg',
    '/posters/the-promised-neverland.jpg'
  ];

const ContentCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      if (carousel) {
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          scrollAmount = 0;
          carousel.scrollLeft = 0;
        } else {
          scrollAmount += 1;
          carousel.scrollLeft += 1;
        }
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="carousel-section">
      <div className="carousel-container">
        <h2 className="text-4xl font-josefin">Trending among Cinephiles</h2>
        <div className="carousel" ref={carouselRef}>
          {posters.map((src, idx) => (
            <img src={src} alt={`Poster ${idx + 1}`} key={idx} className="poster" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentCarousel;
