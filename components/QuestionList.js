import React from 'react';
import {StyleSheet, View, Picker, Alert, ScrollView} from 'react-native';
import {Text, ListItem, FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements';
import QuestionTypePicker from '../elements/QuestionTypePicker';
import ExamService from '../services/ExamService';

export default class QuestionList
    extends React.Component{
    static navigationOptions = {
        title: 'Question'
    };
    constructor(props) {
        super(props);
        this.state = {
            examId: 0,
            title: '',
            description: '',
            questions: []
        };
        this.createQuestion = this.createQuestion.bind(this);
        this.examService = ExamService.instance;
    }
    componentDidMount(){
        const {navigation} = this.props;
        const exam = navigation.getParam('exam');
        this.setState({
            examId: exam.id,
            title: exam.title,
            description: exam.description
        });
        this.findAllQuestions(exam.id);
    }
    findAllQuestions(examId) {
        this.examService.findAllQuestions(examId)
            .then(questions =>
                this.setState({questions}));
    }
    updateExamInformation() {
        let exam = {
            id: this.state.examId,
            title: this.state.title,
            description: this.state.description
        };
        let examId = this.state.examId;
        const {params} = this.props.navigation.state;
        params.update(exam);
        Alert.alert('Save Successfully!');
    }
    createQuestion(questionType) {
        let question = {
            title: '',
            description: 'to be edited',
            points: '0',
        };
        let examId = this.state.examId;
        if (questionType === 'MC') {
            question.title = 'New Multiple Choice Question';
            this.examService
                .createMultipleChoiceQuestion
                (this.state.examId, question)
            .then(() => {
                this.findAllQuestions
                (this.state.examId)})
        }
        if (questionType === 'TF') {
            question.title = 'New True and False Question';
            this.examService
                .createTrueFalseQuestion
                (this.state.examId, question)
            .then(() => {
                this.findAllQuestions
                (this.state.examId)})
        }
        if (questionType === 'FB') {
            question.title = 'New Fill In Blank Question';
            this.examService
                .createFillInBlanksQuestion
                (this.state.examId, question)
           .then(() => {
                this.findAllQuestions
                (this.state.examId)})
        }
        if (questionType === 'ES') {
            question.title = 'New Essay Question';
            this.examService
                .createEssayQuestion
                (this.state.examId, question)
           .then(() => {
                this.findAllQuestions
                (this.state.examId)})
        }
    }
    updateQuestion(question) {
        if (question.type === 'TrueFalse') {
            return this.examService
                .updateTrueFalseQuestion(question)
                .then(() => {
                this.findAllQuestions
                (this.state.examId)
            })
        }
        if (question.type === 'Essay') {
            return this.examService
                .updateEssayQuestion(question)
                .then(() => {
                this.findAllQuestions
                (this.state.examId)
            })
        }
        if (question.type === 'MultipleChoice') {
            return this.examService
                .updateMultipleChoiceQuestion(question)
                .then(() => {
                this.findAllQuestions
                (this.state.examId)
            })
        }
        if (question.type === 'FillInBlanks') {
            return this.examService
                .updateFillInBlanksQuestion(question)
                .then(() => {
                this.findAllQuestions
                (this.state.examId)
            })
        }
    }
    navigationToEditors(question) {
        if (question.type === 'TrueFalse') {
            this.props.navigation.navigate(
                'TrueFalseQuestionEditor',
                {question: question,
                    update: this.updateQuestion.bind(this)})
        }
        if (question.type === 'MultipleChoice') {
            this.props.navigation.navigate(
                'MultipleChoiceQuestionEditor',
                {question: question,
                    update: this.updateQuestion.bind(this)})
        }
        if (question.type === 'FillInBlanks') {
            this.props.navigation.navigate(
                'FillInBlanksQuestionEditor',
                {question: question,
                    update: this.updateQuestion.bind(this)})
        }
        if (question.type === 'Essay') {
            this.props.navigation.navigate(
                'EssayQuestionEditor',
                {question: question,
                    update: this.updateQuestion.bind(this)})
        }
    }
    selectIcon(questionType) {
        if (questionType === 'MultipleChoice') {
            return {name: 'list'}
        }
        if (questionType === 'TrueFalse') {
            return {name: 'check'}
        }
        if (questionType === 'FillInBlanks') {
            return {name :'code'}
        }
        if (questionType === 'Essay') {
            return {name: 'subject'}
        }
    }
    render() {
        return (
            <ScrollView>
                <Text h2 style={{padding: 15}}>Edit Information</Text>
                <FormLabel>Title</FormLabel>
                <FormInput value={this.state.title}
                           onChangeText={
                               text => this.setState({title: text}) }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>
                <FormLabel>Description</FormLabel>
                <FormInput value={this.state.description}
                           onChangeText={
                               text => this.setState({description: text}) }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <View style={{padding: 15}}>
                    <Button title="Save" backgroundColor="blue"
                            onPress={() => this.updateExamInformation()}/>
                </View>

                <View style={{padding: 15}}>
                    <Text h2 style={{padding: 15}}>Question List</Text>
                    {this.state.questions.map((question, index) => (
                        <ListItem onPress={() =>
                                        this.navigationToEditors(question)}
                                  title={question.title}
                                  subtitle={question.subtitle}
                                  key={index}
                                  leftIcon={this.selectIcon(question.type)}
                                  />
                    ))}
                    <Text h2 style={{padding: 15}}>Add Question</Text>
                    <QuestionTypePicker create={this.createQuestion}/>
                </View>
            </ScrollView>
        )
    }
}
