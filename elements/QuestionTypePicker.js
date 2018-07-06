import React from 'react';
import {Alert, View, Picker} from 'react-native';
import {Button} from 'react-native-elements';

export default class QuestionTypePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionType: 'MC'
        };
    }
    render() {
        return (
            <View>
                <Picker
                    selectedValue={this.state.questionType}
                    onValueChange={(itemValue, itemIndex) =>
                                    this.setState({questionType: itemValue})}>
                    <Picker.Item value="MC" label="Multiple choice" />
                    <Picker.Item value="ES" label="Essay" />
                    <Picker.Item value="TF" label="True or false" />
                    <Picker.Item value="FB" label="Fill in the blanks" />
                </Picker>

                <Button title="Create New Question"
                        backgroundColor="green"
                        color="white"
                        onPress={() => {
                           this.props.create(this.state.questionType)}}/>
            </View>
        )}
}