import React from 'react';
import { StyleSheet, View,ScrollView, Alert } from 'react-native';
import {Text, FormLabel, FormInput, FormValidationMessage, Button, ListItem, CheckBox, Icon} from 'react-native-elements';

export default class MultipleChoiceQuestionEditor
    extends React.Component{
    static navigationOptions = {
        title: 'Multiple Choice'
    };
    constructor(props) {
        super(props);
        this.state = {
            questionId: '',
            title: '',
            description: '',
            points: '0',
            type: '',
            options: [],
            correctOption: 0,
            currentOption:'',
            preview: false
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const question = navigation.getParam('question');
        this.setState({
            questionId: question.id,
            title: question.title,
            description: question.description,
            points: question.points,
            type: question.type,
            correctOption: question.correctOption
        });
        if (question.options != null) {
            this.setState({options: question.options.split('\n')});
        }
    }
    cancelEditing() {
        this.props.navigation.goBack();
    }
    updateQuestion() {
        const {params} = this.props.navigation.state;
        let question = {
            id: this.state.questionId,
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
            type: this.state.type,
            options: this.state.options.join('\n'),
            correctOption: this.state.correctOption
        };
        params.update(question)
            .then(() =>
                this.props.navigation.goBack());
    }
    deleteOption(index) {
        let array = this.state.options;
        array.splice(index, 1);
        if (index === this.state.correctOption) {
            this.setState({correctOption: undefined});
        }
        this.setState({options: array});
    };
    addOption() {
        this.setState({
            options: [...this.state.options,
                this.state.currentOption]});
    }
    renderChoices() {
        if (this.state.options != null) {
            return this.state.options.map((option, index) => (
                <View style={{
                    flex:1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
                      key={index}>
                     <CheckBox title={option}
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          checked={!this.state.preview
                            && this.state.correctOption === index}
                          onPress={() => {
                              if (!this.state.preview) {
                                  this.setState({correctOption: index})
                              }}}/>
                    {!this.state.preview &&
                        <Icon name='trash-o'
                          type='font-awesome'
                          onPress={() =>
                              this.deleteOption(index)}/>}
                </View>
            ))
        }
    }
    render() {
        return (
            <ScrollView>
                <CheckBox title="Preview Mode"
                          checkedIcon='dot-circle-o'
                          uncheckedIcon='circle-o'
                          checked={this.state.preview}
                          onPress={() =>
                              this.setState({
                                  preview: !this.state.preview})}/>
                {!this.state.preview &&
                    <View>
                        <Text h2 style={{padding: 15}}>Editor</Text>
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

                        <FormLabel>Points</FormLabel>
                        <FormInput value={this.state.points}
                                   onChangeText={
                                   text => this.setState({points: text}) }/>
                        <FormValidationMessage>
                            Points is required
                        </FormValidationMessage>
                        <FormLabel>Options</FormLabel>

                        <FormInput
                            placeholder="enter one option"
                            onChangeText={
                                text => this.setState({currentOption: text})}/>
                        <Button title="Add Option" backgroundColor="green"
                                color="white" buttonStyle={{width: 100}}
                                onPress={() => this.addOption()}/>

                        <View style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-start'}}>
                            <Button title="Cancel" backgroundColor="red"
                                    color="white" buttonStyle={{width: 100}}
                                    onPress={() => this.cancelEditing()}/>
                            <Button title="Save" backgroundColor="blue"
                                    color="white" buttonStyle={{width: 100}}
                                    onPress={() => this.updateQuestion()}/>
                        </View>
                    </View>}


                <View style={{padding: 15}}>
                    {!this.state.preview && <Text h2>Preview</Text>}
                    <View style={{flexDirection: 'row'}}>
                        <Text h4>{this.state.title}</Text>
                        <Text h4 style={{position: 'absolute', right: 0}}>
                            {this.state.points}pts</Text>
                    </View>
                    <Text>{this.state.description}</Text>
                    {this.renderChoices()}
                </View>
            </ScrollView>
        )
    }
}