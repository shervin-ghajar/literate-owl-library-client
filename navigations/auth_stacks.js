import 'react-native-gesture-handler';
import React, { Component, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from "react-redux";

//----------------------------------------------------------------------------------------------
import Intro from '../screens/intro';
import AppStacks from './app_stacks';
//----------------------------------------------------------------------------------------------
class AuthStacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }
    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ isLoading: false })
        // }, 3000);
    }
    render() {
        // console.warn("userToken", this.props.authenticationReducer.userToken)
        return (
            <>
                {
                    this.state.isLoading ?
                        <Intro />
                        :
                        <NavigationContainer>
                            <Stack.Navigator
                                headerMode="none"
                            >
                                <Stack.Screen name="AppStacks" component={AppStacks} />
                            </Stack.Navigator>
                        </NavigationContainer>
                }
            </>

        );
    }
}
const Stack = createStackNavigator();

const mapStateToProps = state => {
    let { authenticationReducer } = state;
    return { authenticationReducer };
};

const mapDispatchToProps = dispatch => {
    return {
        onSync: (userToken) => {
            dispatch(sync({ userToken }))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthStacks);