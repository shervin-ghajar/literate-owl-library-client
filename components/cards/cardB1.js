import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image'
import { greyBlueColor, dullOrangeColor } from '../../assets/colors';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { serverIPAddress } from '../../config';
import { numberSeperator } from '../../helper';
//---------------------------------------------------------------------------
const CardB1 = ({ first_text, second_text, third_text, fourth_text, star_count, imageSource, onCardBPress }) => {
    third_text = third_text == "0" ? "Free" : `$${third_text}`
    return (
        <TouchableOpacity onPress={onCardBPress} style={styles.cardContainer}>
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
                    tintColor={"#ededed"}
                    ratingCount={5}
                    imageSize={14}
                    showRating={false}
                />
                <Text style={[styles.text, { fontSize: 12, bottom: 1, opacity: 0.5 }]}>({numberSeperator(fourth_text)})</Text>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    imageContainer: {
        height: 180,
        width: 140,
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
        width: 140,
        paddingTop: 5,
    },
    text: {
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        lineHeight: 21,
        textAlign: "left"
    },
    ratingStyle: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center"
    }
})
export default CardB1;
