import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Image, StyleSheet } from 'react-native';
//-----------------------------------------------------------------------------
import BookStore from '../screens/application/book_store';
import Search from '../screens/application/search';
import Profile from '../screens/application/profile';
import CustomBottomTab from '../components/custom_bottom_tab';
import { blackColor, grayColor, veryLightGrayColor, primaryBackground } from '../assets/colors';
//-----------------------------------------------------------------------------
const Tab = createBottomTabNavigator();
//-----------------------------------------------------------------------------
export default class AppStacks extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Tab.Navigator
                initialRouteName={"BookStore"}
                backBehavior={"initialRoute"}
                // tabBar={props => <CustomBottomTab {...props} />}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        switch (route.name) {
                            case "Book Store":
                                return (
                                    <View style={styles.tabIconContainer}>
                                        <Image source={require(`../assets/icons/tabbar/books.png`)} style={[{ height: 23, width: 28, opacity: focused ? 1 : 0.5 }]} />
                                    </View>
                                )
                            case "Search":
                                return (
                                    <View style={styles.tabIconContainer}>
                                        <Image source={require(`../assets/icons/tabbar/search.png`)} style={[{ height: 23, width: 23, opacity: focused ? 1 : 0.5 }]} />
                                    </View>
                                )
                            case "Profile":
                                return (
                                    <View style={styles.tabIconContainer}>
                                        <Image source={require(`../assets/icons/tabbar/profile.png`)} style={[{ height: 23, width: 21, opacity: focused ? 1 : 0.5 }]} />
                                    </View>
                                )
                        }
                    },
                })}
                tabBarOptions={{
                    tabStyle: {
                        backgroundColor: primaryBackground,
                    },
                    activeTintColor: blackColor,
                    // activeBackgroundColor: "lightgray",
                    inactiveTintColor: grayColor,
                    labelStyle: {
                        fontFamily: "Roboto-Regular",
                    },
                    style: {
                        backgroundColor: "red",
                        height: 51,
                    }
                }}
            >
                <Tab.Screen name="Book Store" component={BookStore} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    tabIconContainer: {
        padding: 15,
    }
})