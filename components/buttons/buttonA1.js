import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { greyBlueBackground, whiteColor, primaryBackground } from '../../assets/colors';
//--------------------------------------------------------------------------------------------
const ButtonA2 = ({
    onPress, text, disabled, containerStyle, btnStyle, textStyle, iconSource, isBlackArrow, imageContainer
}) => (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[{ opacity: disabled ? 0.5 : 1 }, containerStyle]}
        >
            <View style={[styles.btnContainer, btnStyle]}>
                <View style={styles.conentContainer}>
                    <View style={[styles.imageContainer, imageContainer]}>
                        <Image source={iconSource} style={styles.contentImage} />
                    </View>
                    <Text style={[styles.text, textStyle]}>{text}</Text>
                </View>
                {
                    isBlackArrow ?
                        <Image source={require('../../assets/icons/arrow-right-black.png')} style={styles.arrowImage} />
                        :
                        <Image source={require('../../assets/icons/arrow-right.png')} style={styles.arrowImage} />
                }

            </View>
        </TouchableOpacity >
    );
//--------------------------------------------------------------------------------------------


const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: "row",
        backgroundColor: primaryBackground,
        alignItems: "center",
        justifyContent: 'space-between',
        height: 55,
        paddingHorizontal: 5,
        borderTopWidth: 1,
        borderTopColor: "lightgray"
    },
    text: {
        fontFamily: "Roboto-Regular",
        color: "black",
        fontSize: 18,
        lineHeight: 25
    },
    conentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    },
    imageContainer: {
        height: 25,
        width: 25,
        marginRight: 20
    },
    contentImage: {
        width: "100%",
        height: "100%",
    },
    arrowImage: {
        width: 7,
        height: 12,
    }
})

export default ButtonA2;
