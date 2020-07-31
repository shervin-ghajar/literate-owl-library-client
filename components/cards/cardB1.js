import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { dullOrangeColor, greyBlueColor } from '../../assets/colors';

const CardB1 = ({ onCardBPress, imageSource, first_text, second_text, third_text }) => (
    <TouchableOpacity onPress={onCardBPress} style={styles.cardContainer}>
        <View style={styles.imageContainer}>
            {
                imageSource ?
                    <Image source={{
                        uri: imageSource,
                    }} style={styles.image} />
                    :
                    <Image source={require("../../assets/images/book-placehoalder.png")} style={styles.imagePlacehoalder} />
            }
        </View>
        <View style={styles.contentContainer}>
            <Text style={[styles.text, {}]} numberOfLines={2} ellipsizeMode={"tail"}>{first_text}</Text>
            {/*  */}
            <Text style={[styles.text, { opacity: 0.5 }]}>{second_text}</Text>
            {/* J. R. R. Tolkien */}
            <Text style={[styles.text, {}]}>{third_text}</Text>
        </View>
    </TouchableOpacity >
);

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
        justifyContent: "center"
    },
    image: {
        height: 160,
        width: 120,
        resizeMode: 'contain'
    },
    imagePlacehoalder: {
        height: 160,
        width: 120,
        resizeMode: 'contain'
    },
    contentContainer: {
        width: 140,
        paddingTop: 5,
    },
    text: {
        fontFamily: "Roboto-Regular",
        fontSize: 14,
        lineHeight: 21
    }
})
export default CardB1;
