import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { serverIPAddress } from '../../config';
import { greyBlueColor, dullOrangeColor, primaryBackground } from '../../assets/colors';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { numberSeperator } from '../../helper';
import ButtonR2 from '../../components/buttons/buttonR2';
//----------------------------------------------------------------------------------
export default class BookDetails extends Component {
    constructor(props) {
        super(props);
        this.bookId = null
        this.bookData = {}
        if ('bookData' in this.props.route.params
            && this.props.route.params.bookData) {
            this.bookId = this.props.route.params.bookData.id
            this.bookData = this.props.route.params.bookData
        } else {
            this.props.navigation.pop()
        }
        this.state = {
            wished: false
        };
    }

    componentDidMount() {

    }

    render() {
        let { image_url, title, authors, price, rating, rating_count, desc, genres, pages, year } = this.bookData
        // console.warn(this.bookData)
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
                        textStyle={{ fontSize: 15 }}
                        text={price == 0 ? 'Free' : `Buy $${price}`}
                        btnStyle={{ width: 260, height: 45, marginRight: 10 }}
                    />
                    <ButtonR2
                        onPress={() => this.setState(state => ({ wished: !state.wished }))}
                        iconSource={require('../../assets/icons/bookmark.png')}
                        btnStyle={[{ width: 70, height: 45 }, this.state.wished ? { backgroundColor: dullOrangeColor } : {}]}
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
    }
})
