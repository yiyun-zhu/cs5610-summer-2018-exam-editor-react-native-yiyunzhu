import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import {Text, ListItem} from 'react-native-elements';

export default class CourseList
            extends React.Component{
    static navigationOptions = {
        title: 'Course'
    };
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
        // fetch('http://192.168.0.14:8080/api/course')
        fetch('https://arcane-garden-97301.herokuapp.com/api/course')
            .then(response => response.json())
            .then(courses =>
                this.setState({courses: courses}));
        // Alert.alert('wow');
    }
    render() {
        return (
            <View style={{padding: 15}}>
                {this.state.courses.map((course, index) => (
                    <ListItem onPress={() =>
                                this.props.navigation.navigate(
                                    'ModuleList',
                                    {courseId: course.id})}
                            title={course.title}
                            key={index}/>
                    ))}
            </View>
        )
    }

}