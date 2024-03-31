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

    handleOnPress(genreTitle) {
        let genres = genreTitle.split("&")
        genres = genres.map(genre => genre.trim())
        this.props.navigation.navigate("Books", { queryType: 'genres', genres, genreTitle })
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.contentContainer}>
                    <ButtonA2 onPress={() => this.handleOnPress("Action & Adventure")} text={"Action & Adventure"} iconSource={require('../../assets/icons/genres/gun.png')} btnStyle={{ borderTopWidth: 0 }} />
                    <ButtonA2 onPress={() => this.handleOnPress("Biography & Memoir")} text={"Biography & Memoir"} iconSource={require('../../assets/icons/genres/statue.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Childrens")} text={"Childrens"} iconSource={require('../../assets/icons/genres/train.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Comics & Graphic Novels")} text={"Comics & Graphic Novels"} imageContainer={{ width: 25, height: 20 }} iconSource={require('../../assets/icons/genres/bang.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Cook")} text={"Cookbooks"} iconSource={require('../../assets/icons/genres/cook.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Education")} text={"Education"} iconSource={require('../../assets/icons/genres/education.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Fiction & Literature")} text={"Fiction & Literature"} iconSource={require('../../assets/icons/genres/typewriter.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Historical")} text={"Historical"} iconSource={require('../../assets/icons/genres/historical.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Mysteries & Thrillers")} text={"Mysteries & Thrillers"} iconSource={require('../../assets/icons/genres/detective.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Nonfiction")} text={"Nonfiction"} iconSource={require('../../assets/icons/genres/nonfiction.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Politics")} text={"Politics"} iconSource={require('../../assets/icons/genres/whitehouse.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Religion & Spirituality")} text={"Religion & Spirituality"} iconSource={require('../../assets/icons/genres/hamsa.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Sci-fi & Fantasy")} text={"Sci-fi & Fantasy"} iconSource={require('../../assets/icons/genres/dragon.png')} />
                    <ButtonA2 onPress={() => this.handleOnPress("Young Adult")} text={"Young Adult"} iconSource={require('../../assets/icons/genres/young_adult.png')} />
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
