import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { greyBlueBackground, whiteColor } from '../../assets/colors';
//--------------------------------------------------------------------------------------------
const ButtonR2 = ({
    onPress, text, disabled, containerStyle, btnStyle, textStyle, iconSource
}) => (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[{ opacity: disabled ? 0.5 : 1 }, containerStyle]}
        >
            <View style={[styles.btnContainer, btnStyle]}>
                {
                    text ?
                        <Text style={[styles.text, textStyle]}>{text}</Text>
                        : null
                }
                {
                    iconSource ?
                        <Image source={iconSource} style={styles.image} />
                        : null
                }
            </View>
        </TouchableOpacity >
    );
//--------------------------------------------------------------------------------------------


const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: greyBlueBackground,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        // padding: 10,
        height: 45,
        // elevation: 3
    },
    text: {
        fontFamily: "Roboto-Bold",
        color: whiteColor,
        fontSize: 20
    },
    image: {
        width: 25,
        height: 25,
    }
})

export default ButtonR2;
