import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import {Button} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation';
import CourseList from './components/CourseList';
import ModuleList from './components/ModuleList';
import LessonList from './components/LessonList';
import WidgetList from './components/WidgetList';
import QuestionList from './components/QuestionList';
import TrueFalseQuestionEditor from './components/TrueFalseQuestionEditor';
import MultipleChoiceQuestionEditor from './components/MultipleChoiceQuestionEditor';
import EssayQuestionEditor from './components/EssayQuestionEditor';
import AssignmentEditor from './components/AssignmentEditor';
import FillInBlanksQuestionEditor from './components/FillInBlanksQuestionEditor'
import 'es6-symbol';

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                {/*<StatusBar barStyle="light-content"/>*/}
                {/*<FixedHeader/>*/}

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList')}/>
            </ScrollView>
        )
    }
}

const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    WidgetList,
    QuestionList,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor,
    EssayQuestionEditor,
    AssignmentEditor,
    FillInBlanksQuestionEditor
});

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
