import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ButtonA2 from '../../components/buttons/buttonA1';
import { primaryBackground } from '../../assets/colors';

class Genres extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.contentContainer}>
                    <ButtonA2 onPress={() => { }} text={"Action & Adventure"} iconSource={require('../../assets/icons/genres/gun.png')} btnStyle={{ borderTopWidth: 0 }} />
                    <ButtonA2 onPress={() => { }} text={"Biographies & Memoirs"} iconSource={require('../../assets/icons/genres/statue.png')} />
                    <ButtonA2 onPress={() => { }} text={"Childrens"} iconSource={require('../../assets/icons/genres/train.png')} />
                    <ButtonA2 onPress={() => { }} text={"Comics & Graphic Novels"} iconSource={require('../../assets/icons/genres/bang.png')} imageContainer={{ width: 30 }} />
                    <ButtonA2 onPress={() => { }} text={"Coocbooks"} iconSource={require('../../assets/icons/genres/cook.png')} />
                    <ButtonA2 onPress={() => { }} text={"Education"} iconSource={require('../../assets/icons/genres/education.png')} />
                    <ButtonA2 onPress={() => { }} text={"Fiction & Literature"} iconSource={require('../../assets/icons/genres/typewriter.png')} />
                    <ButtonA2 onPress={() => { }} text={"Historical"} iconSource={require('../../assets/icons/genres/historical.png')} />
                    <ButtonA2 onPress={() => { }} text={"Mysteries & Thrillers"} iconSource={require('../../assets/icons/genres/detective.png')} />
                    <ButtonA2 onPress={() => { }} text={"Nonfiction"} iconSource={require('../../assets/icons/genres/nonfiction.png')} />
                    <ButtonA2 onPress={() => { }} text={"Politics"} iconSource={require('../../assets/icons/genres/whitehouse.png')} />
                    <ButtonA2 onPress={() => { }} text={"Religion & Spirituality"} iconSource={require('../../assets/icons/genres/hamsa.png')} />
                    <ButtonA2 onPress={() => { }} text={"Sci-fi & Fantasy"} iconSource={require('../../assets/icons/genres/dragon.png')} />
                    <ButtonA2 onPress={() => { }} text={"Young Adult"} iconSource={require('../../assets/icons/genres/young_adult.png')} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        backgroundColor: primaryBackground
    },
    contentContainer: {
        marginHorizontal: 20,
        paddingTop: 5
    }
})

export default Genres;
