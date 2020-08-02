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
import NavigationService from '../services/navigators';
import CustomHeader from '../components/custom_stack_header';
import Profile from '../screens/application/profile';
import { getProfile, getAllBooks } from '../actions';
import { GET_PROFILE_SUCCESS, GET_PROFILE_DEFAULT, GET_PROFILE_STARTED } from '../actions/types';
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
        if (this.props.authenticationReducer.userToken) {
            this.props.onGetProfile(this.props.authenticationReducer.userToken)
            this.props.onGetAllBooks(this.props.authenticationReducer.userToken)
        }
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
                <NavigationContainer
                    ref={navigationRef => {
                        this.navigationRef = navigationRef;
                        NavigationService.setContainer(navigationRef, () => this.setState({ update: !this.state.update }));
                    }}
                >
                    <Stack.Navigator
                        headerMode="screen"
                        initialRouteName={this.props.authenticationReducer.userToken ? "Tabs" : "Login"}
                    // screenOptions={{
                    //     header: (props) => <CustomHeader {...props} />
                    // }}
                    >
                        {
                            this.state.isLoading ?
                                < Stack.Screen
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
                                                name="Profile"
                                                component={Profile}
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
    let { authenticationReducer, profileReducer } = state;
    return { authenticationReducer, profileReducer };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetProfile: (userToken) => {
            dispatch(getProfile(userToken))
        },
        onGetAllBooks: (userToken) => {
            dispatch(getAllBooks(userToken))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Stacks);