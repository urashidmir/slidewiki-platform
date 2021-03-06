import {BaseStore} from 'fluxible/addons';

class ContentQuestionsStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.questions = [];
        this.question = null;
        this.selector = {};
        this.questionsCount = 0;
        this.showAddBox = false;
        this.showExamList = false;
        this.showCorrectExamAnswers = false;
        this.downloadQuestions = [];
    }
    addQuestion(payload) {
        this.questions.push(payload.question);
        this.showAddBox = false;
        this.showExamList = false;
        this.emitChange();
    }
    updateQuestion(payload) {
        this.question.title = payload.question.title;
        this.question.difficulty = payload.question.difficulty;
        this.question.answers = payload.question.answers;
        this.question.explanation = payload.question.explanation;
        this.question.isExamQuestion = payload.question.isExamQuestion;
        this.question = null;

        this.emitChange();
    }
    updateQuestions(payload) {
        payload.modifiedSelections.forEach((modifiedSelection) => {
            let index = this.questions.findIndex((question) => question.id === modifiedSelection.id);
            if (index > -1) {
                this.questions[index].isExamQuestion = !this.questions[index].isExamQuestion;
            }
        });

        this.showExamList = false;
        this.emitChange();
    }
    deleteQuestion(payload) {
        let index = this.questions.findIndex((qst) => {return (qst.id === payload.questionId);});
        if (index !== -1) {
            this.questions.splice(index, 1);
        }
        this.question = null;
        this.emitChange();
    }
    loadQuestions(payload) {
        this.questions = payload.questions;
        this.question = null;
        this.showExamList = false;
        this.showAddBox = false;
        this.selector = payload.selector;
        this.questionsCount = this.questions.length;
        this.showCorrectExamAnswers = false;
        this.emitChange();
    }
    loadQuestion(payload) {
        this.question = this.questions.find((qst) => qst.id === payload.qstid);
        this.emitChange();
    }
    cancelQuestion(payload) {
        this.question = null;
        this.emitChange();
    }
    toggleAnswers(payload) {
        this.question = this.questions.find((qst) => qst.id === payload.qstid);
        let question = payload.question;
        if (question.answersShown) {
            question.answersShown = false;
        }
        else {
            question.answersShown = true;
        }
        this.emitChange();
    }
    resetAnswers() {
        this.showCorrectExamAnswers = false;
        this.questions.forEach((question) => {
            const answers = question.answers;
            for(let answer of answers) {
                delete answer.selectedAnswer;
            }
        });
    }
    invertAddBoxFlag() {
        this.showAddBox = !this.showAddBox;
        this.emitChange();
    }

    invertExamListFlag() {
        this.showExamList = !this.showExamList;
        this.emitChange();
    }
    updateSelectedAnswer(payload) {
        this.questions[payload.questionIndex].answers[payload.answerIndex].selectedAnswer = payload.selected;
    }
    displayCorrectExamAnswers(payload) {
        this.showCorrectExamAnswers = true;
        this.emitChange();
    }

    updateDownloadQuestions(payload){
        if((payload.downloadQuestions===[])||(typeof payload.downloadQuestions === 'undefined')){
            this.downloadQuestions = [];
        }else{
            this.downloadQuestions = payload.downloadQuestions;
        }
        this.emitChange();
    }
    getState() {
        return {
            questions: this.questions,
            question: this.question,
            selector: this.selector,
            questionsCount: this.questionsCount,
            showAddBox: this.showAddBox,
            showExamList: this.showExamList,
            showCorrectExamAnswers: this.showCorrectExamAnswers,
            downloadQuestions: this.downloadQuestions,
        };
    }
    dehydrate() {
        return this.getState();
    }
    rehydrate(state) {
        this.questions = state.questions;
        this.question = state.question;
        this.selector = state.selector;
        this.questionsCount = state.questionsCount;
        this.showAddBox = state.showAddBox;
        this.showExamList = state.showExamList;
        this.showCorrectExamAnswers = state.showCorrectExamAnswers;
        this.downloadQuestions = state.downloadQuestions;
    }
}

ContentQuestionsStore.storeName = 'ContentQuestionsStore';
ContentQuestionsStore.handlers = {
    'LOAD_CONTENT_QUESTIONS_SUCCESS': 'loadQuestions',
    'LOAD_QUESTION': 'loadQuestion',
    'CANCEL_QUESTION': 'cancelQuestion',
    'TOGGLE_ANSWERS': 'toggleAnswers',
    'RESET_ANSWERS': 'resetAnswers',
    'UPDATE_QUESTION': 'updateQuestion',
    'UPDATE_QUESTIONS': 'updateQuestions',
    'ADD_QUESTION': 'addQuestion',
    'DELETE_QUESTION': 'deleteQuestion',
    'INVERT_ADD_QUESTION_BOX_FLAG': 'invertAddBoxFlag',
    'INVERT_EXAM_LIST_FLAG': 'invertExamListFlag',
    'QUESTION_ANSWER_SELECTED': 'updateSelectedAnswer',
    'SHOW_CORRECT_EXAM_ANSWERS': 'displayCorrectExamAnswers',
    'UPDATE_DOWNLOAD_QUESTIONS': 'updateDownloadQuestions',
};

export default ContentQuestionsStore;
