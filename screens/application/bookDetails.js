import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Rating, AirbnbRating } from 'react-native-ratings';
//-------------------------------------------------------------------------------------
import { serverIPAddress } from '../../config';
import { greyBlueColor, dullOrangeColor, primaryBackground, greyBlueBackground } from '../../assets/colors';
import { numberSeperator } from '../../helper';
import ButtonR2 from '../../components/buttons/buttonR2';
import ModalPanel from '../../components/modal';
import { handleWishlist, purchase } from '../../actions';
//----------------------------------------------------------------------------------
class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.bookData = {}
        if ('bookData' in this.props.route.params
            && this.props.route.params.bookData) {
            this.bookData = this.props.route.params.bookData
        } else {
            this.props.navigation.pop()
        }
        this.state = {
            wished: false,
            showPurchaseModal: false
        };
        this.handleWishlist = this.handleWishlist.bind(this)
        this.handlePurchaseModal = this.handlePurchaseModal.bind(this)
    }

    handleWishlist(bookData, bookId) {
        this.props.onHandleWishlist(this.props.authenticationReducer.userToken, bookData, bookId)
    }

    handlePurchaseModal() {
        this.setState((state, props) => ({ showPurchaseModal: !state.showPurchaseModal }))
    }

    handlePurchase(bookId) {
        this.setState({ showPurchaseModal: false }, () => {
            this.props.onHandlePurchase(this.props.authenticationReducer.userToken, bookId)
        })
    }

    render() {
        let { id, image_url, title, authors, price, rating, rating_count, desc, genres, pages, year } = this.bookData
        let isWished = false
        if (this.props.profileReducer.wishlist.length > 0) {
            isWished = this.props.profileReducer.wishlist.includes(id)
        }
        let isBalanceValid = (this.props.profileReducer.balance >= price)
        let isPurchased = false
        if (this.props.profileReducer.purchased.length > 0)
            isPurchased = this.props.profileReducer.purchased.includes(id)
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.headerContainer}>
                    <View style={[styles.headerImageContainer]}>
                        {
                            image_url ?
                                <Image
                                    source={{ uri: serverIPAddress + image_url }}
                                    style={styles.headerImage}
                                />
                                :
                                <Image source={require("../../assets/images/book-placehoalder.png")} style={styles.imagePlacehoalder} />
                        }
                    </View>
                    <Text style={[styles.headerTitle, {}]}>{title}</Text>
                    <Text style={[styles.headerSubTitle, { marginVertical: 10 }]}>{authors[0]}</Text>
                    <View
                        style={styles.ratingStyle}
                        pointerEvents={"none"}
                    >
                        <Rating
                            type='custom'
                            startingValue={rating}
                            ratingColor={dullOrangeColor}
                            ratingBackgroundColor={"#ededed"}
                            ratingCount={5}
                            imageSize={16}
                            showRating={false}
                        />
                        <Text style={[styles.text, { fontSize: 12, bottom: 1, opacity: 0.5, paddingLeft: 10 }]}>({numberSeperator(rating_count)})</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 20 }}>
                    <ButtonR2
                        onPress={() => this.handlePurchaseModal()}
                        textStyle={{ fontSize: 15 }}
                        text={isPurchased ? "Purchased" : (price == 0 ? 'Free' : `Buy $${price}`)}
                        disabled={isPurchased}
                        containerStyle={{ opacity: 1 }}
                        btnStyle={[{ width: 260, height: 45, marginRight: 10 }, isPurchased ? { backgroundColor: dullOrangeColor } : {}]}
                    />
                    <ButtonR2
                        onPress={() => this.handleWishlist(this.bookData, id)}
                        iconSource={
                            isWished ?
                                require('../../assets/icons/wishlist-focus.png')
                                :
                                require('../../assets/icons/wishlist.png')
                        }
                        iconStyle={{ width: 17, height: 21 }}
                        btnStyle={[{ width: 70, height: 45 }, isWished ? { backgroundColor: dullOrangeColor } : {}]}
                    />
                </View>
                <View style={styles.decriptionContainer}>
                    <Text style={{ fontFamily: 'NewYorkLarge-Bold', fontSize: 23, marginBottom: 10 }}>Description</Text>
                    <Text numberOfLines={this.state.showMore ? null : 5} ellipsizeMode={'clip'}
                        style={{ textAlign: "justify", lineHeight: 22 }}>
                        {desc}
                    </Text>
                    {
                        !this.state.showMore ?
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ showMore: true })}>
                                <Text style={{ fontFamily: "Roboto-Regular" }}>
                                    ...
                                </Text>
                                <Text style={{ fontFamily: "Roboto-Regular", opacity: 0.5 }}>
                                    {" More"}
                                </Text>
                            </TouchableOpacity>
                            : null
                    }
                </View>
                <View style={styles.moreInfoContainer}>
                    <View style={styles.moreInfoContentContainer}>
                        <Text style={styles.moreInfoHeader}>Genre</Text>
                        <Text style={styles.moreInfoContent}>{genres[0]}</Text>
                    </View>
                    <View style={[styles.moreInfoContentContainer, { borderStartWidth: 1, borderEndWidth: 1 }]}>
                        <Text style={styles.moreInfoHeader}>Pages</Text>
                        <Text style={styles.moreInfoContent}>{pages}</Text>
                    </View>
                    <View style={styles.moreInfoContentContainer}>
                        <Text style={styles.moreInfoHeader}>Year</Text>
                        <Text style={styles.moreInfoContent}>{year}</Text>
                    </View>
                </View>
                <ModalPanel headerImageStyle={{ left: 20 }} visible={this.state.showPurchaseModal} onClose={this.handlePurchaseModal}>
                    <>
                        <View style={styles.modalImageContainer}>
                            {
                                image_url ?
                                    <Image
                                        style={styles.modalImage}
                                        source={{ uri: serverIPAddress + image_url }}
                                    />
                                    :
                                    <Image source={require("../../assets/images/book-placehoalder.png")} style={styles.modalImagePlacehoalder} />
                            }
                        </View>
                        <View style={{ alignItems: "center", width: "75%" }}>
                            <Text style={[{ marginTop: 20, fontFamily: 'Roboto-Regular', fontSize: 15 }]}>Title :  {title}</Text>
                            <Text style={[{ marginTop: 5, fontFamily: 'Roboto-Regular', fontSize: 15 }]}>Author :  {authors[0]}</Text>
                            <Text style={[{ marginTop: 5, fontFamily: 'Roboto-Regular', fontSize: 15 }]}>Price :  ${price}</Text>
                            <Text style={[{ marginTop: 20, fontFamily: 'Roboto-Regular', fontSize: 15, color: isBalanceValid ? greyBlueColor : dullOrangeColor }]}>Your Balance : ${this.props.profileReducer.balance}</Text>
                        </View>
                        <View style={{ marginTop: 30, flexDirection: "row", justifyContent: 'space-evenly', width: "100%" }}>
                            <ButtonR2
                                onPress={() => this.handlePurchase(id, price)}
                                disabled={!isBalanceValid}
                                text={"Confirm"}
                                containerStyle={{ width: 250 }}
                                btnStyle={{ backgroundColor: greyBlueBackground }}
                            />
                        </View>
                    </>
                </ModalPanel>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        backgroundColor: primaryBackground
    },
    headerContainer: {
        // backgroundColor: "red",
        alignItems: "center",
        justifyContent: 'center',
    },
    headerImageContainer: {
        width: 200,
        height: 270,
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: greyBlueColor,
        marginTop: 20,
        marginBottom: 15
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
    imagePlacehoalder: {
        height: "100%",
        width: "100%",
        resizeMode: 'contain',
        top: 32.5
    },
    headerTitle: {
        width: 250,
        textAlign: "center",
        fontFamily: "NewYorkLarge-Medium",
        fontSize: 16
    },
    headerSubTitle: {
        fontFamily: "Roboto-Regular",
    },
    ratingStyle: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    },
    decriptionContainer: {
        marginHorizontal: 25,
        marginVertical: 15
    },
    moreInfoContainer: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    },
    moreInfoContentContainer: {
        alignItems: 'center',
        paddingHorizontal: 30
    },
    moreInfoHeader: {
        fontFamily: "NewYorkLarge-Bold",
        fontSize: 18,
        marginBottom: 5
    },
    moreInfoContent: {
        fontFamily: "Roboto-Regular",
        fontSize: 15
    },
    modalImageContainer: {
        height: 120,
        width: 90,
        backgroundColor: greyBlueColor,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    modalImage: {
        height: "100%",
        width: "100%",
        resizeMode: 'stretch',
    },
    modalImagePlacehoalder: {
        height: "100%",
        width: "100%",
        resizeMode: 'contain',
        top: 16
    },
})


//------------------------------------------------------------------------------------
const mapStateToProps = state => {
    let { authenticationReducer, profileReducer } = state;
    return { authenticationReducer, profileReducer };
};
const mapDispatchToProps = dispatch => {
    return {
        onHandleWishlist: (userToken, bookData, bookId) => {
            dispatch(handleWishlist(userToken, bookData, bookId))
        },
        onHandlePurchase: (userToken, bookId) => {
            dispatch(purchase(userToken, bookId))
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);