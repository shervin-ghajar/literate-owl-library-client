import 'react-native-gesture-handler';
import React, { Component, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { fromLeft } from 'react-navigation-transitions';
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
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 3000);
    }

    render() {
        const config = {
            animation: 'spring',
            config: {
                speed: 1000,
                stiffness: 1000,
                damping: 500,
                bounciness: 1000,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01,
            },
        };
        // console.warn("userToken", this.props.authenticationReducer.userToken)
        return (
            <>
                <NavigationContainer>
                    <Stack.Navigator
                        headerMode="none"
                    >
                        {
                            this.state.isLoading ?
                                // <Intro />
                                <Stack.Screen name="Intro" component={Intro} />
                                :
                                <Stack.Screen name="AppStacks" component={AppStacks}
                                    options={{
                                        transitionSpec: {
                                            open: config,
                                            // close: config,
                                        },
                                    }}
                                />
                        }
                    </Stack.Navigator>
                </NavigationContainer>
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