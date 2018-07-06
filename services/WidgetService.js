let _singleton = Symbol();

const url = 'https://arcane-garden-97301.herokuapp.com';
// const url = 'http://192.168.0.14:8080';

export default class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton]
    }
    findAllWidgets(lessonId) {
        return fetch(url + '/api/lesson/'+lessonId+'/widget')
            .then(response => response.json());
    }
    createExam(lessonId, exam) {
        return fetch(url + '/api/lesson/'+lessonId+'/exam', {
            body: JSON.stringify(exam),
            headers: {
                'Content-Type': 'application/json'},
            method: 'POST'
        })
    }
    createAssignment(lessonId, assignment) {
        return fetch(url + '/api/lesson/'+lessonId+'/assignment', {
            body: JSON.stringify(assignment),
            headers: {
                'Content-Type': 'application/json'},
            method: 'POST'
        })
    }
    updateExam(exam) {
        return fetch(url + '/api/exam/'+exam.id+'/update', {
            body: JSON.stringify(exam),
            headers: {
                'Content-Type': 'application/json'},
            method: 'PUT'
        })
    }
    updateAssignment(assignment) {
        return fetch(url + '/api/assignment/'+assignment.id+'/update', {
            body: JSON.stringify(assignment),
            headers: {
                'Content-Type': 'application/json'},
            method: 'PUT'
        })
    }
}