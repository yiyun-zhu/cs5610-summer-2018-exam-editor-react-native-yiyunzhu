import React from 'react';

export default class QuestionEditor extends React.Component {
    static navigationOptions = {
        title: 'Question'
    };
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            examId: 1
        };
    }
    componentDidMount(){
        const {navigation} = this.props;
        const examId = navigation.getParam('examId');
        this.setState({
            examId
        });
        fetch('http://10.0.3.2:8080/api/exam/'+examId+'/question')
            .then(response => response.json())
            .then(questions =>
                this.setState({questions}));
    }
    render() {

    }
}
