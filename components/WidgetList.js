import React from 'react';
import { StyleSheet, View, Alert, ScrollView } from 'react-native';
import {Text, ListItem} from 'react-native-elements';
import WidgetTypePicker from '../elements/WidgetTypePicker';
import WidgetService from '../services/WidgetService';

export default class WidgetList
    extends React.Component{
    static navigationOptions = {
        title: 'Widget'
    };
    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            lessonId: 1,
            input: false
        };
        this.createWidget = this.createWidget.bind(this);
        this.widgetService = WidgetService.instance;
    }
    componentDidMount(){
        const {navigation} = this.props;
        const lessonId = navigation.getParam('lessonId');
        this.setState({
            lessonId
        });
        this.findAllWidgets(lessonId)
    }
    findAllWidgets(lessonId) {
        this.widgetService
            .findAllWidgets(lessonId)
            .then(widgets =>
                this.setState({widgets}));
    }
    createWidget(widgetType) {
        if (widgetType === 'Exam') {
            let exam = {
                title: 'New Exam',
                description: 'to be edited',
            };
           this.widgetService.createExam
                (this.state.lessonId, exam)
               .then(() => {
                    this.findAllWidgets
                    (this.state.lessonId)})
        }
        if (widgetType === 'Assignment') {
            let assignment = {
                title: 'New Assignment',
                description: 'to be edited',
                points: 0
            };
            this.widgetService.createAssignment
                (this.state.lessonId, assignment)
                .then(() => {
                this.findAllWidgets
                (this.state.lessonId)})
        }
    }
    updateAssignment(assignment) {
        return this.widgetService
            .updateAssignment(assignment)
            .then(() =>
            this.findAllWidgets(this.state.lessonId));
    }
    updateExam(exam) {
        return this.widgetService
            .updateExam(exam)
            .then(() =>
                this.findAllWidgets(this.state.lessonId));
    }
    render() {
        return (
            <ScrollView>
                <View style={{padding: 15}}>
                    <Text h2 style={{padding: 15}}>Widget List</Text>
                    {this.state.widgets.map((widget, index) => (
                        <ListItem onPress={() => {
                                if (widget.widgetType === 'Exam') {
                                    this.props.navigation.navigate(
                                        'QuestionList',
                                        {exam: widget,
                                        update: this.updateExam.bind(this)})
                                }
                                if (widget.widgetType === 'Assignment') {
                                    this.props.navigation.navigate(
                                        'AssignmentEditor',
                                        {assignment: widget,
                                        lessonId: this.state.lessonId,
                                        update: this.updateAssignment.bind(this)})
                                }}}
                              title={widget.title}
                              key={index}/>
                        ))}
                    <Text h2 style={{padding: 15}}>Add Widget</Text>
                    <WidgetTypePicker create={this.createWidget}/>

                </View>
            </ScrollView>
        )

    }

}