import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Image, StyleSheet } from 'react-native';
//-----------------------------------------------------------------------------
import { BookStore, Profile, Search } from '../screens/application/tabs';
import CustomBottomTab from '../components/custom_bottom_tab';
import { blackColor, grayColor, veryLightGrayColor, primaryBackground, greyBlueColor } from '../assets/colors';
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
                                        {
                                            focused ?
                                                <Image source={require('../assets/icons/tabbar/book-focus.png')} style={styles.icons} />
                                                :
                                                <Image source={require('../assets/icons/tabbar/book.png')} style={styles.icons} />
                                        }
                                    </View>
                                )
                            case "Search":
                                return (
                                    <View style={styles.tabIconContainer}>
                                        {
                                            focused ?
                                                <Image source={require('../assets/icons/tabbar/search-focus.png')} style={[styles.icons, { top: 3 }]} />
                                                :
                                                <Image source={require('../assets/icons/tabbar/search.png')} style={[styles.icons, { top: 3 }]} />
                                        }
                                    </View>
                                )
                            case "Profile":
                                return (
                                    <View style={styles.tabIconContainer}>
                                        {
                                            focused ?
                                                <Image source={require('../assets/icons/tabbar/profile-focus.png')} style={[styles.icons, { top: 3 }]} />
                                                :
                                                <Image source={require('../assets/icons/tabbar/profile.png')} style={[styles.icons, { top: 3 }]} />
                                        }
                                    </View>
                                )
                        }
                    },
                })}
                tabBarOptions={{
                    tabStyle: {
                        backgroundColor: primaryBackground,
                    },
                    activeTintColor: "#6ab7bf",
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
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: 'center',
    },
    icons: { height: "100%", width: "100%" }
})