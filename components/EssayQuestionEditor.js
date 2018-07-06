import React from 'react';
import { StyleSheet, ScrollView, View, TextInput } from 'react-native';
import {Text, FormLabel, FormInput, FormValidationMessage, Button, CheckBox} from 'react-native-elements';

export default class EssayQuestionEditor
    extends React.Component{
    static navigationOptions = {
        title: 'Essay'
    };
    constructor(props) {
        super(props);
        this.state = {
            questionId: 0,
            title: '',
            description: '',
            points: '0',
            type: '',
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
            type: question.type
        });
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
            type: this.state.type
        };
        params.update(question)
            .then(() =>
                this.props.navigation.goBack());
    }
    render() {
        return (
            <ScrollView contentProps>
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
                    <View style={{
                             borderColor: 'grey',
                             borderWidth: 1,
                            }}>
                    <TextInput
                        style={{height:100}}
                        underlineColorAndroid="transparent"
                        placeholder="Your essay here"
                        multiline={true}
                        numberOfLines={5}/>
                    </View>
                </View>
            </ScrollView>
        )
    }
}