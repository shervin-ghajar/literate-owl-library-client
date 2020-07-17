import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
//-----------------------------------------------------------------------------------------
import { primaryBackground, darkSlateBlueColor, greyBlueColor, blackColor } from '../../assets/colors';
import Input from '../../components/input';
import ButtonR1 from '../../components/buttons/buttonR1';
//-----------------------------------------------------------------------------------------


export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            usernameErr: "",
            email: "",
            emailErr: "",
            password: "",
            passwordErr: ""
        };
        this.isFormValidate = this.isFormValidate.bind(this);
        this.validate = this.validate.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
    }
    handleSignup() {
        if (this.isFormValidate()) {

        }
    }
    isFormValidate() {
        return (
            this.validate(this.state.email, 'email')
            && this.validate(this.state.username, 'username')
            && this.validate(this.state.password, 'password')
        )
    }

    validate(text, type) {
        let username = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
        if (type == 'username') {
            if (!text || text == "") {
                this.setState({ usernameErr: 'Please enter username!' });
                return false
            } else {
                if (username.test(text)) {
                    this.setState({ usernameErr: "" });
                    return true
                }
                this.setState({ usernameErr: 'Username should contain minimum 5 characters, only use letters (a-z), numbers and periods!' });
                return false
            }
        } else if (type == 'email') {
            if (!text || text == "") {
                this.setState({ emailErr: 'Please enter a valid email address!' });
                return false
            } else {
                if (email.test(text)) {
                    this.setState({ emailErr: "" });
                    return true
                }
                this.setState({ emailErr: 'Please enter a valid email address!' });
                return false
            }
        } else if (type == 'password') {
            if (!text || text == "") {
                this.setState({ passwordErr: 'Please enter password!' });
                return false
            } else {
                if (password.test(text)) {
                    this.setState({ passwordErr: "" });
                    return true
                }
                this.setState({ passwordErr: 'Password should contain minimum 5 characters and have at least one letter and one number!' });
                return false
            }
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerContainer}>
                    <Image source={require('../../assets/images/signup-header.png')} style={styles.headerImage} />
                </View>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Sign Up</Text>
                </View>
                <View style={styles.formsContainer}>
                    <Input
                        value={this.state.email}
                        labelTitle={"E-mail Address"}
                        onEndEditing={(e) => {
                            let email = (e.nativeEvent.text).trim()
                            this.setState({ email }, () => {
                                this.validate(email, 'email')
                            })
                        }}
                        onChangeText={email => {
                            this.setState({ email });
                        }}
                        error={this.state.emailErr}
                    />
                    <Input
                        value={this.state.username}
                        labelTitle={"Username"}
                        onEndEditing={(e) => {
                            let username = (e.nativeEvent.text).trim()
                            this.setState({ username }, () => {
                                this.validate(username, 'username')
                            })
                        }}
                        onChangeText={username => {
                            this.setState({ username });
                        }}
                        error={this.state.usernameErr}
                    />
                    <Input
                        value={this.state.password}
                        labelTitle={"Password"}
                        isSecure
                        onEndEditing={(e) => {
                            let password = (e.nativeEvent.text).trim()
                            this.setState({ password }, () => {
                                this.validate(password, 'password')
                            })
                        }}
                        onChangeText={password => {
                            this.setState({ password });
                        }}
                        error={this.state.passwordErr}
                    />
                </View>
                <View style={styles.footerContainer}>
                    <ButtonR1 onPress={() => this.handleSignup()} text="Sign Up" containerStyle={{ width: 235 }} />
                    <View style={{ flexDirection: "row", marginTop: 15 }}>
                        <Text style={{ color: blackColor, marginRight: 5 }}>Already a member?</Text>
                        <TouchableOpacity hitSlop={{ top: 10, bottom: 50, right: 50, left: 50 }} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.signupStyle}>Log In</Text>
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
