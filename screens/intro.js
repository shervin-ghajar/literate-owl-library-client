
import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { primaryBackground, dullOrange, greyBlue } from '../assets/colors';
//----------------------------------------------------------------
const Intro = ({
    params,
}) => (
        <View style={styles.view}>
            <Image source={require('../assets/images/intro-icon.png')} style={styles.icon} />
            <View style={styles.titleContainer}>
                <Text style={[styles.text, { color: dullOrange }]}>Literate Owl</Text>
                <Text style={[styles.text, { color: greyBlue }]}> Library</Text>
            </View>
        </View>
    );

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: primaryBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 239,
        height: 257
    },
    titleContainer: {
        flexDirection: "row",
        marginTop: 15
    },
    text: {
        fontFamily: "Raleway-SemiBold",
        fontSize: 22
    }
})
export default Intro;
//----------------------------------------------------------------