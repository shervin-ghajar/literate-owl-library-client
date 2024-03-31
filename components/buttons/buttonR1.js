import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { greyBlueBackground, whiteColor } from '../../assets/colors';
//--------------------------------------------------------------------------------------------
const ButtonR1 = ({
    onPress, text, disabled, containerStyle, btnStyle
}) => (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[{ opacity: disabled ? 0.5 : 1 }, containerStyle]}
        >
            <View style={[styles.btnContainer, btnStyle]}>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity >
    );
//--------------------------------------------------------------------------------------------


const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: greyBlueBackground,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        // padding: 10,
        height: 45,
        elevation: 3
    },
    text: {
        fontFamily: "Roboto-Bold",
        color: whiteColor,
        fontSize: 20
    }
})

export default ButtonR1;
