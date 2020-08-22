import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image'
import { greyBlueColor, dullOrangeColor } from '../../assets/colors';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { serverIPAddress } from '../../config';
import { numberSeperator } from '../../helper';
//---------------------------------------------------------------------------
const CardB2 = ({ first_text, second_text, third_text, fourth_text, star_count, imageSource, onCardBPress, cardContainerStyle, ratingTintColor }) => {
    third_text = third_text == "0" ? "Free" : `$${third_text}`
    return (
        <TouchableOpacity onPress={onCardBPress} style={[styles.cardContainer, cardContainerStyle]}>
            <View style={styles.imageContainer}>
                {
                    imageSource ?
                        <Image
                            style={styles.image}
                            source={{
                                uri: `${serverIPAddress}${imageSource}`
                            }}
                        />
                        :
                        <Image source={require("../../assets/images/book-placehoalder.png")} style={styles.imagePlacehoalder} />
                }
            </View>
            <View style={{ width: "60%", marginLeft: 5, justifyContent: 'center', }}>
                <View style={styles.contentContainer}>
                    <Text style={[styles.text, {}]} numberOfLines={2} ellipsizeMode={"tail"}>{first_text}</Text>
                    <Text style={[styles.text, { opacity: 0.5 }]}>{second_text}</Text>
                    <Text style={[styles.text, {}]}>{third_text}</Text>
                </View>
                <View
                    style={styles.ratingStyle}
                    pointerEvents={"none"}
                >
                    <Rating
                        type='custom'
                        startingValue={star_count}
                        ratingColor={dullOrangeColor}
                        tintColor={ratingTintColor || "#ededed"}
                        ratingCount={5}
                        imageSize={14}
                        showRating={false}
                    />
                    <Text style={[styles.text, { fontSize: 12, bottom: 1, opacity: 0.5, marginLeft: 10 }]}>({numberSeperator(fourth_text)})</Text>
                </View>
            </View>
        </TouchableOpacity >
    )
}

const deviceWidth = Dimensions.get("screen").width

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        paddingRight: 10,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray"
    },
    imageContainer: {
        height: 108,
        width: 84,
        backgroundColor: greyBlueColor,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    image: {
        height: "100%",
        width: "100%",
        resizeMode: 'stretch',
    },
    imagePlacehoalder: {
        height: "100%",
        width: "100%",
        resizeMode: 'contain',
        top: 16
    },
    contentContainer: {
        width: "100%",
    },
    text: {
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        lineHeight: 21,
        textAlign: "left"
    },
    ratingStyle: {
        flexDirection: "row",
        alignItems: "center"
    }
})
export default CardB2;
