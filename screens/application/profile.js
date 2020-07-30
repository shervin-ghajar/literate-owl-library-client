import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ButtonR1 from '../../components/buttons/buttonR1';
//------------------------------------------------------------------------------------------
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <ButtonR1
                    onPress={() => { }}
                    text={"Logout"} />
            </View>
        );
    }
}
