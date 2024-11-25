export default function quizCreationData() {
    return {
      title: Alpine.$persist('').as('quizTitle'),
      description: Alpine.$persist('').as('quizDescription'),
      questions: Alpine.$persist([
        {
          text: '',
          answers: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
          ],
        },
      ]).as('quizQuestions'),
      showSuccessMessage: false,
      init() {
        console.log('Composant de création de quiz initialisé');
      },
      addQuestion() {
        this.questions.push({
          text: '',
          answers: [{ text: '', isCorrect: false }, { text: '', isCorrect: false }],
        });
      },
      removeQuestion(index) {
        this.questions.length > 1
          ? this.questions.splice(index, 1)
          : alert('Vous devez avoir au moins une question.');
      },
      addAnswer(questionIndex) {
        this.questions[questionIndex].answers.push({ text: '', isCorrect: false });
      },
      removeAnswer(questionIndex, answerIndex) {
        this.questions[questionIndex].answers.length > 2
          ? this.questions[questionIndex].answers.splice(answerIndex, 1)
          : alert('Chaque question doit avoir au moins deux réponses.');
      },
      submitQuiz() {
        try {
          if (!this.title.trim()) {
            throw new Error('TITLE_REQUIRED');
          }
          if (!this.description.trim()) {
            throw new Error('DESCRIPTION_REQUIRED');
          }
          if (this.questions.length === 0) {
            throw new Error('NO_QUESTIONS');
          }
  
          this.questions.forEach((question, qIndex) => {
            if (!question.text.trim()) {
              throw new Error(`QUESTION_TEXT_REQUIRED_${qIndex}`);
            }
            if (question.answers.length < 2) {
              throw new Error(`NOT_ENOUGH_ANSWERS_${qIndex}`);
            }
            const correctAnswers = question.answers.filter((answer) => answer.isCorrect);
            if (correctAnswers.length === 0) {
              throw new Error(`NO_CORRECT_ANSWER_${qIndex}`);
            }
            question.answers.forEach((answer, aIndex) => {
              if (!answer.text.trim()) {
                throw new Error(`ANSWER_TEXT_REQUIRED_${qIndex}_${aIndex}`);
              }
            });
          });
  
          console.log('Quiz soumis :', {
            title: this.title,
            description: this.description,
            questions: this.questions,
          });
  
          this.title = '';
          this.description = '';
          this.questions = [
            {
              text: '',
              answers: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
              ],
            },
          ];
  
          this.$persistedStore.remove('quizTitle');
          this.$persistedStore.remove('quizDescription');
          this.$persistedStore.remove('quizQuestions');
  
          this.showSuccessMessage = true;
  
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        } catch (error) {
          switch (error.message) {
            case 'TITLE_REQUIRED':
              alert('Le titre du quiz est requis.');
              break;
            case 'DESCRIPTION_REQUIRED':
              alert('La description du quiz est requise.');
              break;
            case 'NO_QUESTIONS':
              alert('Vous devez ajouter au moins une question.');
              break;
            default:
              if (error.message.startsWith('QUESTION_TEXT_REQUIRED_')) {
                const index = error.message.split('_')[3];
                alert(`Le texte de la question ${parseInt(index) + 1} est requis.`);
              } else if (error.message.startsWith('NOT_ENOUGH_ANSWERS_')) {
                const index = error.message.split('_')[3];
                alert(`La question ${parseInt(index) + 1} doit avoir au moins deux réponses.`);
              } else if (error.message.startsWith('NO_CORRECT_ANSWER_')) {
                const index = error.message.split('_')[3];
                alert(`La question ${parseInt(index) + 1} doit avoir au moins une réponse correcte.`);
              } else if (error.message.startsWith('ANSWER_TEXT_REQUIRED_')) {
                const indices = error.message.split('_').slice(3);
                alert(
                  `Le texte de la réponse ${parseInt(indices[1]) + 1} de la question ${
                    parseInt(indices[0]) + 1
                  } est requis.`
                );
              } else {
                alert('Une erreur est survenue.');
              }
              break;
          }
        }
      },
    };
  }
  