import React from 'react';
import { StyleSheet, View,ScrollView, Alert, TextInput } from 'react-native';
import {Text, FormLabel, FormInput, FormValidationMessage, Button, Divider, CheckBox, Icon} from 'react-native-elements';

export default class FillInBlanksQuestionEditor
    extends React.Component{
    static navigationOptions = {
        title: 'Fill In Blanks'
    };
    constructor(props) {
        super(props);
        this.state = {
            questionId: '',
            title: '',
            description: '',
            points: '0',
            type: '',
            variables: '',
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
            variables: question.variables
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
            type: this.state.type,
            variables: this.state.variables
        };
        params.update(question)
            .then(() =>
                this.props.navigation.goBack());
    }
    parseText(text) {
        this.setState({description: text});
        let array = text.match(/(\[[^\[]*\])/g);
        if (array != null) {
            this.setState({variables: array.join(';')});
        }
    }
    renderDescription() {
        return (
            <View>
                {this.state.description
                    .split('\n').map((desItem, index1) => {
                        let array = desItem.split(/(\[[^\[]*\])/g);
                        if (array.length === 1) {
                            return <Text key={index1}>{desItem}</Text>
                        } else {
                            return (
                                <View style={{flexDirection: 'row'}}
                                      key={index1}>
                                    {array.map((arrayItem, index2) => {
                                        if (arrayItem.charAt(0) === '[') {
                                            return (
                                                <View style={{
                                                    borderColor: 'grey',
                                                    borderWidth: 1
                                                }}
                                                      key={index2}>
                                                    <TextInput style={{
                                                            width: 50, height:10}}
                                                           underlineColorAndroid="transparent"/>
                                                </View>
                                            )
                                        } else {
                                            return <Text key={index2}>{arrayItem}</Text>
                                        }
                                    })}
                                </View>
                            )
                        }
                    })}
            </View>
        )
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
                    <Text h1 style={{padding: 15}}>Editor</Text>
                    <FormLabel>Title</FormLabel>
                    <FormInput value={this.state.title}
                               onChangeText={
                                   text => this.setState({title: text}) }/>
                    <FormValidationMessage>
                        Title is required
                    </FormValidationMessage>

                    <FormLabel>Description</FormLabel>
                    <FormInput value={this.state.description}
                               multiline={true}
                               numberOfLines={5}
                               onChangeText={
                                   text => this.parseText(text)}/>
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
                    {this.renderDescription()}
                </View>
            </ScrollView>
        )
    }
}
