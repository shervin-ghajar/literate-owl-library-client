import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
//-----------------------------------------------------------------------------------------
import ButtonR2 from '../../../components/buttons/buttonR2';
import Input from '../../../components/input';
import { logout, getProfile, chargeBalance } from '../../../actions';
import ButtonA1 from '../../../components/buttons/buttonA1';
import { primaryBackground, dullOrangeColor, greyBlueColor } from '../../../assets/colors';
import ModalPanel from '../../../components/modal';
import { numberSeperator, numberJoiner } from '../../../helper';
//------------------------------------------------------------------------------------------
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogoutModal: false,
            showChargeModal: false,
            chargeAmount: undefined,
        };
        this.handleLogoutModal = this.handleLogoutModal.bind(this)
        this.handleChargeModal = this.handleChargeModal.bind(this)
        this.handleCharge = this.handleCharge.bind(this)
    }

    componentDidMount() {
        // this.props.navigation.addListener('focus', () => {
        //     this.props.onGetProfile(this.props.authenticationReducer.userToken)
        // })
    }

    handleLogoutModal() {
        this.setState((state, props) => ({ showLogoutModal: !state.showLogoutModal }))
    }
    handleChargeModal() {
        this.setState((state, props) => ({ showChargeModal: !state.showChargeModal, chargeAmount: undefined }))
    }
    handleCharge() {
        this.setState((state, props) => ({ showChargeModal: !state.showChargeModal, }), () => {
            this.props.onChargeBalance(this.props.authenticationReducer.userToken, this.state.chargeAmount)
        })
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
                        onPress={this.handleChargeModal}
                        text={"Charge Wallet"}
                        textStyle={{ fontFamily: 'Roboto-Regular', fontSize: 15 }}
                        btnStyle={{ backgroundColor: dullOrangeColor, width: 130, height: 35, }}
                    />
                </View>
            </View>
        )
    }

    render() {
        let { balance, wishlist, purchased } = this.props.profileReducer
        let chargeAmountNotValid = !this.state.chargeAmount || this.state.chargeAmount == 0 || this.state.chargeAmount == ""
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
                            />
                            <ButtonR2
                                onPress={this.handleLogoutModal}
                                text={"No"}
                                containerStyle={{ width: 120 }}
                                btnStyle={{ backgroundColor: dullOrangeColor }}
                            />
                        </View>
                    </>
                </ModalPanel>
                <ModalPanel headerImageStyle={{ left: 20 }} visible={this.state.showChargeModal} onClose={this.handleChargeModal}>
                    <>
                        <Text style={{ width: 300, textAlign: "center", fontFamily: 'Roboto-Regular', fontSize: 16 }}>Please enter the amount you wish to charge your wallet.</Text>
                        <Input
                            value={this.state.chargeAmount}
                            keyboardType={"numeric"}
                            placehoalder={0}
                            autoFocus
                            containerStyle={{ width: 100, marginTop: 30 }}
                            style={{ textAlign: "center", height: 40 }}
                            onEndEditing={(e) => {
                                let chargeAmount = (e.nativeEvent.text).trim()
                                this.setState({ chargeAmount })
                            }}
                            isAmount
                            onChangeText={chargeAmount => {
                                chargeAmount = numberJoiner(chargeAmount)
                                if (chargeAmount != "NaN") {
                                    if (chargeAmount > 0) {
                                        chargeAmount = numberSeperator(chargeAmount)
                                        console.warn(2, chargeAmount)
                                    }
                                } else {
                                    chargeAmount = this.state.chargeAmount || ""
                                }
                                this.setState({ chargeAmount })
                            }}
                            error={this.state.chargeAmountErr}
                        />
                        <View style={{ marginTop: 30, flexDirection: "row", justifyContent: 'space-evenly', width: "100%" }}>
                            <ButtonR2
                                onPress={() => this.handleCharge()}
                                disabled={chargeAmountNotValid}
                                text={"Charge"}
                                containerStyle={{ width: 250 }}
                                btnStyle={{ backgroundColor: dullOrangeColor }}
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
        onChargeBalance: (userToken, chargeAmount) => {
            dispatch(chargeBalance(userToken, chargeAmount))
        },
        onLogout: (userToken) => {
            dispatch(logout(userToken))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
