import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
//---------------------------------------------------------------------------------------
import { sectionGradient } from '../../assets/colors';
//---------------------------------------------------------------------------------------
const CardS1 = ({ title, subTitle, children }) => (
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
                onPress={() => { }}
                style={{ bottom: 5 }}
            >
                <Text style={{ fontFamily: "Roboto-Regular", fontSize: 15, opacity: 0.5 }}>See All</Text>
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

    }
})

export default CardS1;
