import './QuizCreationForm.css';

export default function QuizCreationForm() {
  return `
    <div class="quiz-creation" x-data="quizCreationData()" x-init="init()" x-cloak>
      <h2 class="quiz-creation__title">Créer un nouveau quiz</h2>
      <div
        x-show="showSuccessMessage"
        x-transition
        class="quiz-creation__success-message"
      >
        Votre quiz a été créé avec succès !
      </div>
      <form @submit.prevent="submitQuiz" class="quiz-creation__form">
        <div class="quiz-creation__field">
          <label for="title" class="quiz-creation__label">Titre du quiz</label>
          <input
            type="text"
            id="title"
            x-model="title"
            x-validate="title"
            class="quiz-creation__input"
            required
          />
        </div>
        <div class="quiz-creation__field">
          <label for="description" class="quiz-creation__label">Description</label>
          <textarea
            id="description"
            x-model="description"
            x-validate="description"
            class="quiz-creation__textarea"
            required
          ></textarea>
        </div>
        <div class="quiz-creation__questions">
          <template x-for="(question, index) in questions" :key="index">
            <div class="quiz-creation__question" x-transition>
              <h3 class="quiz-creation__question-title">
                Question <span x-text="index + 1"></span>
              </h3>
              <div class="quiz-creation__field">
                <label class="quiz-creation__label">Texte de la question</label>
                <input
                  type="text"
                  x-model="question.text"
                  x-validate="question.text"
                  class="quiz-creation__input"
                  required
                />
              </div>
              <div class="quiz-creation__answers">
                <template x-for="(answer, idx) in question.answers" :key="idx">
                  <div class="quiz-creation__answer" x-transition>
                    <input
                      type="text"
                      x-model="answer.text"
                      x-validate="answer.text"
                      class="quiz-creation__input"
                      placeholder="Réponse"
                      required
                    />
                    <label class="quiz-creation__checkbox-label">
                      <input
                        type="checkbox"
                        x-model="answer.isCorrect"
                        class="quiz-creation__checkbox"
                      />
                      Correcte
                    </label>
                    <button
                      type="button"
                      @click="removeAnswer(index, idx)"
                      class="quiz-creation__button quiz-creation__button--remove"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </template>
                <button
                  type="button"
                  @click="addAnswer(index)"
                  class="quiz-creation__button quiz-creation__button--add"
                >
                  <i class="fas fa-plus"></i> Ajouter une réponse
                </button>
              </div>
              <button
                type="button"
                @click="removeQuestion(index)"
                class="quiz-creation__button quiz-creation__button--remove-question"
              >
                <i class="fas fa-trash-alt"></i> Supprimer la question
              </button>
            </div>
          </template>
          <button
            type="button"
            @click="addQuestion"
            class="quiz-creation__button quiz-creation__button--add-question"
          >
            <i class="fas fa-plus"></i> Ajouter une question
          </button>
        </div>
        <button type="submit" class="quiz-creation__submit-button">
          Créer le quiz
        </button>
      </form>
    </div>
  `;
}
