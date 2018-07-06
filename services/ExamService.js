import {StyleSheet, View, Picker, Alert, ScrollView} from 'react-native';

let _singleton = Symbol();

const url = 'https://arcane-garden-97301.herokuapp.com';
// const url = 'http://192.168.0.14:8080';

export default class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }
    findAllQuestions(examId) {
        return fetch(url+ '/api/exam/'+examId+'/question')
            .then(response => response.json())
    }

    createMultipleChoiceQuestion(examId, question) {
        return fetch(url + '/api/exam/'+examId+'/choice', {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'},
            method: 'POST'
        })
    }
    createTrueFalseQuestion(examId, question) {
        return fetch(url + '/api/exam/'+examId+'/truefalse', {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'},
            method: 'POST'
        })
    }
    createFillInBlanksQuestion(examId, question) {
        return fetch(url + '/api/exam/'+examId+'/blanks', {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'},
            method: 'POST'
        })
    }
    createEssayQuestion(examId, question) {
        return fetch(url + '/api/exam/'+examId+'/essay', {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'},
            method: 'POST'
        })
    }
    updateMultipleChoiceQuestion(question) {
        return fetch(url + '/api/question/' + question.id + '/choice', {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
    }
    updateTrueFalseQuestion(question) {
        return fetch(url + '/api/question/' + question.id + '/truefalse', {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
    }
    updateFillInBlanksQuestion(question) {
        return fetch(url + '/api/question/' + question.id + '/blanks', {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
    }
    updateEssayQuestion(question) {
        return fetch(url + '/api/question/' + question.id + '/essay', {
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        })
    }
}