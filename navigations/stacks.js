import 'react-native-gesture-handler';
import React, { Component, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from "react-redux";
//----------------------------------------------------------------------------------------------
import Intro from '../screens/intro';
import Login from '../screens/authentucation/login';
import Signup from '../screens/authentucation/signup';
import Tabs from './tabs';
import CustomHeader from '../components/custom_stack_header';
//----------------------------------------------------------------------------------------------
const Stack = createStackNavigator();
//----------------------------------------------------------------------------------------------
class Stacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            update: false
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 2000);
    }

    render() {
        const config = {
            animation: 'spring',
            config: {
                stiffness: 1000,
                damping: 500,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
            },
        };
        return (
            <>
                <NavigationContainer>
                    <Stack.Navigator
                        headerMode="screen"
                    // screenOptions={{
                    //     header: (props) => <CustomHeader {...props} />
                    // }}
                    >
                        {
                            this.state.isLoading ?
                                <Stack.Screen
                                    name="Intro"
                                    component={Intro}
                                    options={{
                                        headerShown: false
                                    }}
                                />
                                :
                                (
                                    !this.props.authenticationReducer.userToken ?// Must be !
                                        // Authentication Stacks
                                        <>
                                            <Stack.Screen
                                                name="Login"
                                                component={Login}
                                                options={{
                                                    headerShown: false
                                                }}
                                            />
                                            <Stack.Screen
                                                name="Signup"
                                                component={Signup}
                                                options={{
                                                    headerShown: false
                                                }}
                                            />
                                        </>
                                        :
                                        // Application Stacks
                                        <>
                                            <Stack.Screen
                                                name="Tabs"
                                                component={Tabs}
                                            />
                                            <Stack.Screen
                                                name="Login" // test
                                                component={Login}
                                            />
                                        </>
                                )
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            </>

        );
    }
}
//------------------------------------------------------------------------------------
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
export default connect(mapStateToProps, mapDispatchToProps)(Stacks);