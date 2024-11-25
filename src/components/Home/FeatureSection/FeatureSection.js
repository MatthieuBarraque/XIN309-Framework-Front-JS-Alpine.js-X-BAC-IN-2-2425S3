import './FeatureSection.css';

export default class FeatureSection {
  constructor() {
    this.features = [
      {
        title: 'Bibliothèque de Sujets Variés',
        description: 'Explorez des quiz en science, histoire, littérature et bien plus.',
        icon: 'fas fa-book',
        isNew: false,
      },
      {
        title: 'Classements en Direct',
        description: 'Voyez où vous vous situez parmi vos amis et les joueurs du monde entier.',
        icon: 'fas fa-trophy',
        isNew: false,
      },
      {
        title: 'Défis Quotidiens',
        description: 'Relevez de nouveaux défis chaque jour pour gagner des récompenses.',
        icon: 'fas fa-calendar-check',
        isNew: true,
      },
      {
        title: 'Retour Personnalisé',
        description: 'Obtenez des explications détaillées pour améliorer vos connaissances.',
        icon: 'fas fa-chalkboard-teacher',
        isNew: false,
      },
      {
        title: 'Créez et Partagez des Quiz',
        description: 'Concevez vos propres quiz et partagez-les avec la communauté.',
        icon: 'fas fa-edit',
        isNew: false,
      },
      {
        title: 'Support Multi-Plateforme',
        description: 'Jouez sur votre téléphone, tablette ou ordinateur.',
        icon: 'fas fa-desktop',
        isNew: false,
      },
      {
        title: 'Succès et Badges',
        description: 'Débloquez des badges en progressant et montrez votre expertise.',
        icon: 'fas fa-award',
        isNew: true,
      },
      {
        title: 'Partage Social',
        description: 'Partagez vos scores et défiez vos amis sur les réseaux sociaux.',
        icon: 'fas fa-share-alt',
        isNew: false,
      },
    ];
  }

  getFeatureItemHTML = (feature) => {
    if (!feature || !feature.title || !feature.description || !feature.icon) {
      throw new Error('Les données de la fonctionnalité sont invalides');
    }

    const newBadge = feature.isNew
      ? '<span class="feature-item__badge">Nouveau</span>'
      : '';

    return `
      <div class="feature-item" aria-label="${feature.title}">
        ${newBadge}
        <i class="${feature.icon} feature-item__icon" aria-hidden="true"></i>
        <h3 class="feature-item__title">${feature.title}</h3>
        <p class="feature-item__description">${feature.description}</p>
      </div>
    `;
  };

  render() {
    const featureItemsHTML = this.features
      .map((feature) => this.getFeatureItemHTML(feature))
      .join('');

    return `
      <section class="feature-section">
        <h2 class="feature-section__title">Découvrez les fonctionnalités de notre application de quiz</h2>
        <p class="feature-section__subtitle">
          Testez vos connaissances et amusez-vous avec nos quiz interactifs.
        </p>
        <div class="feature-section__grid">
          ${featureItemsHTML}
        </div>
      </section>
    `;
  }
}
