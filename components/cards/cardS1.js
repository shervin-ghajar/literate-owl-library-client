import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
//---------------------------------------------------------------------------------------
import { sectionGradient, dullOrangeColor, greyBlueColor } from '../../assets/colors';
//---------------------------------------------------------------------------------------
const CardS1 = ({ title, subTitle, onSeeAllPress, children }) => (
    <LinearGradient
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: -0.01 }}
        locations={[0, 1]}
        colors={sectionGradient}
        style={styles.sectionContainer}
    >
        <View style={styles.sectionHeaderContainer}>
            <View>
                <Text style={{ fontFamily: "NewYorkLarge-Bold", fontSize: 25 }}>{title}</Text>
                <Text style={{ fontFamily: "Roboto-Regular", fontSize: 13, opacity: 0.5 }}>{subTitle}</Text>
            </View>
            <TouchableOpacity
                hitSlop={{ top: 15, bottom: 15, left: 30, right: 30 }}
                onPress={onSeeAllPress}
                style={{ bottom: 5, flexDirection: "row", alignItems: "center" }}
            >
                <Text style={{ fontFamily: "Roboto-Regular", fontSize: 15, color: greyBlueColor }}>See All</Text>
                {/* <Image source={require('../../assets/icons/arrow-right.png')} style={styles.arrowImage} /> */}
            </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            {children}
        </ScrollView>
    </LinearGradient>
);

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        paddingTop: 10,
    },
    sectionHeaderContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    scrollView: {
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 10,

    },
    arrowImage: {
        width: 8,
        height: 13,
        marginLeft: 9
    }
})

export default CardS1;
