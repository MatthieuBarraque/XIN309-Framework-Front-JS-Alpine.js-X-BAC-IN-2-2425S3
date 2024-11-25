import './carousel.css';
import testImage from '../../../assets/image/test.png';

const slides = [
    {
      title: 'Créez et partagez vos quizzes',
      subtitle: 'Personnalisation illimitée',
      description: 'Concevez des questionnaires captivants adaptés à tous les sujets et partagez-les facilement avec vos amis ou votre communauté.',
      buttonText: 'Commencer maintenant',
      image: testImage,
    },
    {
      title: 'Testez vos connaissances',
      subtitle: 'Thèmes variés et engageants',
      description: 'Explorez une large gamme de thèmes, des sciences à la culture générale, et mettez vos compétences à l’épreuve avec des défis interactifs.',
      buttonText: 'Explorer les thèmes',
      image: testImage,
    },
    {
      title: 'Suivez votre progression',
      subtitle: 'Tableaux de classement en direct',
      description: 'Défiez vos amis ou le monde entier, suivez vos scores et atteignez les sommets des classements en temps réel.',
      buttonText: 'Voir le classement',
      image: testImage,
    },
  ];
  

function createCarousel(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found.`);
    return;
  }

  let currentSlideIndex = 0;

  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';

  const slidesContainer = document.createElement('div');
  slidesContainer.className = 'carousel-slides';
  carouselContainer.appendChild(slidesContainer);

  slides.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    slideDiv.innerHTML = `
      <div class="carousel-image-container">
        <img src="${slide.image}" alt="${slide.title}" class="carousel-image" />
      </div>
      <div class="carousel-overlay">
        <div class="carousel-content">
          <h6 class="carousel-subtitle">${slide.subtitle}</h6>
          <h2 class="carousel-title">${slide.title}</h2>
          <p class="carousel-description">${slide.description}</p>
          <button class="carousel-button">${slide.buttonText}</button>
        </div>
      </div>
    `;
    slidesContainer.appendChild(slideDiv);
  });

  // Création des flèches de navigation
  const prevArrow = document.createElement('div');
  prevArrow.className = 'arrow prev-arrow';
  prevArrow.innerHTML = '<i class="fas fa-arrow-left"></i>';
  prevArrow.addEventListener('click', () => changeSlide(-1));
  carouselContainer.appendChild(prevArrow);

  const nextArrow = document.createElement('div');
  nextArrow.className = 'arrow next-arrow';
  nextArrow.innerHTML = '<i class="fas fa-arrow-right"></i>';
  nextArrow.addEventListener('click', () => changeSlide(1));
  carouselContainer.appendChild(nextArrow);

  // Création des points de navigation
  const dotsContainer = document.createElement('ul');
  dotsContainer.className = 'slick-dots';
  slides.forEach((_, index) => {
    const dot = document.createElement('li');
    dot.innerHTML = `<button data-slide="${index}" class="${index === 0 ? 'active' : ''}"></button>`;
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  carouselContainer.appendChild(dotsContainer);

  container.appendChild(carouselContainer);

  function changeSlide(direction) {
    const slideItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.slick-dots button');

    slideItems[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');

    currentSlideIndex = (currentSlideIndex + direction + slideItems.length) % slideItems.length;

    slideItems[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
  }

  function goToSlide(index) {
    const slideItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.slick-dots button');

    slideItems[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');

    currentSlideIndex = index;

    slideItems[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
  }
}

export default createCarousel;
