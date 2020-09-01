import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { connect } from "react-redux";
import { primaryBackground, darkSlateBlueColor, greyBlueColor, blackColor } from '../../assets/colors';
import Input from '../../components/input';
import ButtonR1 from '../../components/buttons/buttonR1';
//-----------------------------------------------------------------

class Profile extends PureComponent {
    constructor(props) {
        super(props);
        let { username, email } = this.props.profileReducer
        this.state = {
            email: email,
            newUsername: username,
            newPassword: "012345678",
            usernameErr: null,
            passwordErr: null,
            isSecure: true
        };
    }

    // componentDidMount() {
    //     let {username,email}=this.props.profileReducer
    //     console.log(this.props.profileReducer)
    // }


    validate(text, type) {
        let username = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        let password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

        if (type == 'username') {
            if (!text || text == "") {
                this.setState({ usernameErr: "Username can not be empty" });
                return false
            } else {
                if (username.test(text)) {
                    this.setState({ usernameErr: "" });
                    return true
                }
                this.setState({ usernameErr: 'Username should contain minimum 5 characters, only use letters (a-z), numbers and periods!' });
                return false
            }
        } else if (type == 'password') {
            if (!text || text == "") {
                this.setState({ passwordErr: 'Password can not be empty' });
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
                <View style={styles.formsContainer}
                    pointerEvents={'none'}
                >
                    <Input
                        value={this.state.email}
                        labelTitle={"E-mail Address"}
                        editable={false}
                        containerStyle={{ opacity: 0.4 }}
                    />
                    <Input
                        value={this.state.newUsername}
                        labelTitle={"Username"}
                        onEndEditing={(e) => {
                            let newUsername = (e.nativeEvent.text).trim()
                            this.setState({ newUsername }, () => {
                                this.validate(newUsername, 'username')
                            })
                        }}
                        onChangeText={newUsername => {
                            this.setState({ newUsername });
                        }}
                        error={this.state.usernameErr}
                    />
                    <Input
                        value={this.state.newPassword}
                        labelTitle={"Password"}
                        isSecure={this.state.isSecure}
                        // hasSecureEye
                        onPressSecureEye={() => this.setState((state) => ({ isSecure: !state.isSecure }))}
                        onEndEditing={(e) => {
                            let newPassword = (e.nativeEvent.text).trim()
                            this.setState({ newPassword }, () => {
                                this.validate(newPassword, 'password')
                            })
                        }}
                        onChangeText={newPassword => {
                            this.setState({ newPassword });
                        }}
                        error={this.state.passwordErr}
                    />
                </View>
                {/* <View style={styles.footerContainer}>
                    <ButtonR1
                        onPress={() => this.handleSignup()}
                        text="Sign Up"
                        containerStyle={{ width: 235 }}
                        disabled={this.props.authenticationReducer.rtype == AUTHENTICATION_STARTED}
                    />
                    <View
                        style={{ flexDirection: "row", marginTop: 15 }}
                    // pointerEvents={this.props.authenticationReducer.rtype == AUTHENTICATION_STARTED ? 'none' : null}
                    >
                        <Text style={{ color: blackColor, marginRight: 5 }}>Already a member?</Text>
                        <TouchableOpacity hitSlop={{ top: 10, bottom: 50, right: 50, left: 50 }} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.signupStyle}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
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
        marginVertical: 40
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
    let { profileReducer, authenticationReducer } = state;
    return {
        profileReducer, authenticationReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (email, username, password) => {
            dispatch(signup(email, username, password));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
// ----------------------------------------------------------------
