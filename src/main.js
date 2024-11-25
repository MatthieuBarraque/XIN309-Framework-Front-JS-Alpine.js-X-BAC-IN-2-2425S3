import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';
import { setupRouter } from './routes/router.js';
import quizCreationData from './components/QuizCreationForm/quizCreationStore.js';

window.Alpine = Alpine;

Alpine.plugin(persist);

Alpine.directive('validate', (el, { expression }, { effect, evaluateLater }) => {
  const getValue = evaluateLater(expression);
  effect(() => {
    getValue((value) => {
      if (!value || value.trim() === '') {
        el.classList.add('is-invalid');
      } else {
        el.classList.remove('is-invalid');
      }
    });
  });
});

Alpine.data('quizCreationData', quizCreationData);

Alpine.start();

setupRouter();
