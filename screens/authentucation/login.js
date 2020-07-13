import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
//-----------------------------------------------------------------------------------------
import { primaryBackground, darkSlateBlueColor, greyBlueColor, blackColor } from '../../assets/colors';
import Input from '../../components/input';
import ButtonR1 from '../../components/buttons/buttonR1';
//-----------------------------------------------------------------------------------------


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerContainer}>
                    <Image source={require('../../assets/images/login-header.png')} style={styles.headerImage} />
                </View>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Log In</Text>
                </View>
                <View style={styles.formsContainer}>
                    <Input
                        value={this.state.email}
                        labelTitle={"E-mail Address"}
                        // onEndEditing={}
                        onChangeText={email => {
                            this.setState({ email });
                        }}
                    />
                    <Input
                        value={this.state.password}
                        labelTitle={"Password"}
                        isSecure
                        // onEndEditing={}
                        onChangeText={password => {
                            this.setState({ password });
                        }}
                    />
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.fpStyle}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerContainer}>
                    <ButtonR1 text="Log In" containerStyle={{ width: 235 }} />
                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <Text style={{ color: blackColor, marginRight: 5 }}>Don’t have an account?</Text>
                        <TouchableOpacity hitSlop={{ top: 10, bottom: 50, right: 50, left: 50 }} onPress={() => this.props.navigation.navigate("Signup")}>
                            <Text style={styles.signupStyle}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const flexWidth = deviceWidth / 1.24
const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: primaryBackground,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: "center",
    },
    headerImage: {
        width: 348,
        height: 268
    },
    headerTitleContainer: {
        paddingVertical: 25,
        paddingLeft: 40,
    },
    headerTitle: {
        fontFamily: "Roboto-Medium",
        fontSize: 30
    },
    formsContainer: {
        flex: 0.1,
        marginHorizontal: 40,
        flexDirection: "column",
        // justifyContent: "space-between",
        // backgroundColor: "red"
        marginBottom: 40
    },
    fpStyle: {
        color: darkSlateBlueColor,
        opacity: 0.7,
        fontSize: 14,
        textAlign: "right"
    },
    footerContainer: {
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 20
    },
    signupStyle: {
        color: greyBlueColor,
        textDecorationLine: 'underline'
    }
})
