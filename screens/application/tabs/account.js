import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
//-----------------------------------------------------------------------------------------
import ButtonR2 from '../../../components/buttons/buttonR2';
import { logout, getProfile } from '../../../actions';
import ButtonA1 from '../../../components/buttons/buttonA1';
import { primaryBackground, dullOrangeColor, greyBlueColor } from '../../../assets/colors';
import ModalPanel from '../../../components/modal';
//------------------------------------------------------------------------------------------
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogoutModal: false,
            showChargeModal: false
        };
        this.handleLogoutModal = this.handleLogoutModal.bind(this)
        this.handleChargeModal = this.handleChargeModal.bind(this)

    }

    componentDidMount() {
        this.props.onGetProfile(this.props.authenticationReducer.userToken)
    }

    handleLogoutModal() {
        this.setState((state, props) => ({ showLogoutModal: !state.showLogoutModal }))
    }
    handleChargeModal() {
        this.setState((state, props) => ({ showChargeModal: !state.showChargeModal }))
    }

    renderBalance(balance) {
        return (
            <View style={styles.balanceContainer}>
                <View>
                    <Text style={styles.balanceText1}>Balance :</Text>
                    <Text style={styles.balanceText2}>$ {balance}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                    <ButtonR2
                        onPress={() => this.handleChargeModal}
                        text={"Charge Wallet"}
                        textStyle={{ fontFamily: 'Roboto-Regular', fontSize: 15 }}
                        btnStyle={{ backgroundColor: dullOrangeColor, width: 120, height: 35, }}
                    />
                </View>
            </View>
        )
    }

    render() {
        let { balance, wishlist, purchased } = this.props.profileReducer
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.contentContainer}>
                    {this.renderBalance(balance)}
                    <ButtonA1
                        onPress={() => this.props.navigation.navigate("Profile")}
                        text={"Profile"}
                        iconSource={require('../../../assets/icons/tabbar/profile-focus.png')}
                        btnStyle={{ borderTopWidth: 0 }}
                    />
                    <ButtonA1
                        onPress={() => this.props.navigation.navigate("Wishlist")}
                        text={"Wishlist"}
                        iconSource={require('../../../assets/icons/account-wishlist.png')}
                        counter={wishlist.length}
                    />
                    <ButtonA1
                        onPress={() => this.props.navigation.navigate("Purchases")}
                        text={"Purchases"}
                        iconSource={require('../../../assets/icons/purchases.png')}
                        counter={purchased.length}
                    />
                    <ButtonA1
                        onPress={() => this.handleLogoutModal()}  //this.props.onLogout(this.props.authenticationReducer.userToken)
                        text={"Log Out"}
                        noArrow={true}
                        iconSource={require('../../../assets/icons/logout.png')}
                    />
                </View>
                <ModalPanel headerSource={require('../../../assets/icons/logout.png')} headerImageStyle={{ left: 20 }} visible={this.state.showLogoutModal} onClose={this.handleLogoutModal}>
                    <>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16 }}>Are you sure you want to log out?</Text>
                        <View style={{ marginTop: 30, flexDirection: "row", justifyContent: 'space-evenly', width: "100%" }}>
                            <ButtonR2
                                onPress={() => this.props.onLogout(this.props.authenticationReducer.userToken)}
                                text={"Yes"}
                                containerStyle={{ width: 120 }}
                                btnStyle={{ backgroundColor: dullOrangeColor }}
                            />
                            <ButtonR2
                                onPress={this.handleLogoutModal}
                                text={"No"}
                                containerStyle={{ width: 120 }}
                            />
                        </View>
                    </>
                </ModalPanel>
                <ModalPanel headerSource={require('../../../assets/icons/logout.png')} headerImageStyle={{ left: 20 }} visible={this.state.showChargeModal} onClose={this.handleChargeModal}>
                    <>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16 }}>Are you sure you want to log out?</Text>
                        <View style={{ marginTop: 30, flexDirection: "row", justifyContent: 'space-evenly', width: "100%" }}>
                            <ButtonR2
                                onPress={() => this.props.onLogout(this.props.authenticationReducer.userToken)}
                                text={"Yes"}
                                containerStyle={{ width: 120 }}
                                btnStyle={{ backgroundColor: dullOrangeColor }}
                            />
                            <ButtonR2
                                onPress={this.handleLogoutModal}
                                text={"No"}
                                containerStyle={{ width: 120 }}
                            />
                        </View>
                    </>
                </ModalPanel>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        backgroundColor: primaryBackground
    },
    contentContainer: {
        marginHorizontal: 20,
        paddingTop: 5
    },
    balanceContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: greyBlueColor,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    balanceText1: {
        fontFamily: 'NewYorkLarge-Semibold',
        fontSize: 20,
        color: greyBlueColor
    },
    balanceText2: {
        fontFamily: 'NewYorkLarge-Bold',
        fontSize: 30,
        color: greyBlueColor
    }
})
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
        onLogout: (userToken) => {
            dispatch(logout(userToken))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
