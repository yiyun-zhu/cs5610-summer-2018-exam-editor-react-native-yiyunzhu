import React from 'react';
import {Alert, View, Picker} from 'react-native';
import {Button} from 'react-native-elements';

export default class WidgetTypePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgetType: 'Exam'
        };
    }
    render() {
        return (
            <View>
                <Picker
                    selectedValue={this.state.widgetType}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({widgetType: itemValue})}>
                    <Picker.Item value="Exam" label="Exam" />
                    <Picker.Item value="Assignment" label="Assignment" />
                </Picker>

                <Button title="Create New Widget"
                        backgroundColor="green"
                        color="white"
                        onPress={() => {
                            this.props.create(this.state.widgetType)}}/>
            </View>
        )}
}