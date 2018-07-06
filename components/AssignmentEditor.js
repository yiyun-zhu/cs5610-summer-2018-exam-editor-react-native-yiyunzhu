import React from 'react';
import { StyleSheet, ScrollView, View, TextInput } from 'react-native';
import {Text, FormLabel, FormInput, FormValidationMessage, Button, Divider, CheckBox} from 'react-native-elements';

export default class AssignmentEditor
    extends React.Component{
    static navigationOptions = {
        title: 'Assignment'
    };
    constructor(props) {
        super(props);
        this.state = {
            lessonId: 0,
            assignmentId: 0,
            title: 'new title',
            description: 'new description',
            points: '',
            preview: false
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        const lessonId = navigation.getParam('lessonId');
        this.setState({lessonId});
        const assignment = navigation.getParam('assignment');
        this.setState({
            assignmentId: assignment.id,
            title: assignment.title,
            description: assignment.description,
            points: assignment.points,
        });
    }
    cancelEditing() {
        this.props.navigation.goBack();
    }
    updateAssignment() {
        let assignment = {
            id: this.state.assignmentId,
            title: this.state.title,
            description: this.state.description,
            points: this.state.points,
        };
        const {params} = this.props.navigation.state;
        params.update(assignment)
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
                        justifyContent: 'flex-start'
                    }}>
                        <Button title="Cancel" backgroundColor="red"
                                color="white" buttonStyle={{width: 100}}
                                onPress={() => this.cancelEditing()}/>
                        <Button title="Save" backgroundColor="blue"
                                color="white" buttonStyle={{width: 100}}
                                onPress={() => this.updateAssignment()}/>
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
                    <Text style={{fontWeight: 'bold'}}>Essay answer</Text>
                    <View style={{borderColor: 'grey',
                                  borderWidth: 1}}>
                        <TextInput style={{
                                        height:50,
                                        justifyContent: "flex-start",
                                        alignItems: 'flex-start'}}
                                underlineColorAndroid="transparent"
                                placeholder="Your answer here"
                                multiline={true}/>
                    </View>
                    <Text style={{fontWeight: 'bold'}}>Upload a file</Text>
                    <View style={{flexDirection: 'row',
                                  borderColor: 'grey',
                                  borderWidth: 1}}>
                        <Button title="Choose File"
                                buttonStyle={{
                                    width: 100}}/>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="No file chosen"/>
                    </View>
                    <Text style={{fontWeight: 'bold'}}>
                        Submit a link</Text>
                    <View style={{borderColor: 'grey',
                                  borderWidth: 1}}>
                        <TextInput
                            style={{
                                height:30,
                                justifyContent: "flex-start",
                                alignItems: 'flex-start'}}
                            multiline={true}
                            underlineColorAndroid="transparent"
                            placeholder="Your answer here"/>
                    </View>
                </View>
            </ScrollView>
        )
    }
}