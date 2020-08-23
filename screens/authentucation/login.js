import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { connect } from "react-redux";
//-----------------------------------------------------------------------------------------
import { primaryBackground, darkSlateBlueColor, greyBlueColor, blackColor } from '../../assets/colors';
import Input from '../../components/input';
import ButtonR1 from '../../components/buttons/buttonR1';
import { login } from '../../actions';
import { AUTHENTICATION_STARTED } from '../../actions/types';
//-----------------------------------------------------------------------------------------
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            emailErr: "",
            password: "",
            passwordErr: "",
            isSecure: true
        };
        this.isFormValidate = this.isFormValidate.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleLogin() {
        if (this.isFormValidate()) {
            this.props.onLogin(this.state.email, this.state.password)
        }
    }

    isFormValidate() {
        return (
            this.validate(this.state.email, 'email')
            && this.validate(this.state.password, 'password')
        )
    }

    validate(text, type) {
        let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
        if (type == 'email') {
            if (!text || text == "") {
                this.setState({ emailErr: 'Please enter a valid email address!' });
                return false
            } else {
                if (email.test(text)) {
                    this.setState({ emailErr: "" });
                    return true
                }
                this.setState({ emailErr: 'Email is invalid, example: email@address.com' });
                return false
            }
        } else if (type == 'password') {
            if (!text || text == "") {
                this.setState({ passwordErr: 'Please enter password!' });
                return false
            }
            this.setState({ passwordErr: "" });
            return true
        }
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
                        autoCapitalize='none'
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
                        value={this.state.password}
                        labelTitle={"Password"}
                        autoCapitalize='none'
                        isSecure={this.state.isSecure}
                        hasSecureEye
                        onPressSecureEye={() => this.setState((state) => ({ isSecure: !state.isSecure }))}
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
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={styles.fpStyle}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerContainer}>
                    <ButtonR1
                        onPress={() => this.handleLogin()}
                        text="Log In" containerStyle={{ width: 235 }}
                        disabled={this.props.authenticationReducer.rtype == AUTHENTICATION_STARTED}
                    />
                    <View
                        style={{ flexDirection: "row", marginTop: 15 }}
                        pointerEvents={this.props.authenticationReducer.rtype == AUTHENTICATION_STARTED ? 'none' : null}
                    >
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
// ----------------------------------------------------------------
const mapStateToProps = state => {
    let { authenticationReducer } = state;
    return {
        authenticationReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => {
            dispatch(login(email, password));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
// ----------------------------------------------------------------
