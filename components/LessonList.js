import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Text, ListItem} from 'react-native-elements';

export default class LessonList
    extends React.Component{
    static navigationOptions = {
        title: 'Lesson'
    };
    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            courseId: 1,
            moduleId: 1
        };
    }
    componentDidMount(){
        const {navigation} = this.props;
        const courseId = navigation.getParam('courseId');
        const moduleId = navigation.getParam('moduleId');
        this.setState({
            courseId,
            moduleId
        });
        fetch('https://arcane-garden-97301.herokuapp.com/api/module/'+moduleId+'/lesson')
            .then(response => response.json())
            .then(lessons =>
                this.setState({lessons}));
    }
    render() {
        return (
            <View style={{padding: 15}}>

                {this.state.lessons.map((lesson, index) => (
                    <ListItem onPress={() =>
                        this.props.navigation.navigate(
                            'WidgetList',
                            {lessonId: lesson.id})}
                              title={lesson.title}
                              key={index}/>
                ))}
            </View>
        )

    }

}