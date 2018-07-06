import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Text, ListItem} from 'react-native-elements';

export default class ModuleList
    extends React.Component{
    static navigationOptions = {
        title: 'Module'
    };
    constructor(props) {
        super(props);
        this.state = {
            modules: [],
            courseId: 1
        };
    }
    componentDidMount(){
        const courseId = this.props.navigation.getParam('courseId', 1);
        this.setState({
            courseId: courseId
        });
        // fetch('http://192.168.0.14:8080/api/course/'+courseId+'/module')
        fetch('https://arcane-garden-97301.herokuapp.com/api/course/'+courseId+'/module')
            .then(response => response.json())
            .then(modules =>
                this.setState({modules: modules}));
    }
    render() {
        return (
            <View style={{padding: 15}}>
                {this.state.modules.map((module, index) => (
                    <ListItem onPress={() =>
                        this.props.navigation.navigate(
                            'LessonList',
                            {moduleId: module.id})}
                              title={module.title}
                              key={index}/>
                ))}
            </View>
        )

    }

}