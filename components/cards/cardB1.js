import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image'
import { dullOrangeColor, greyBlueColor } from '../../assets/colors';
class CardB1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
            imageURI: null
        };
    }

    // componentDidMount() {
    //     fetch(this.props.imageSource).then(imageURI => {
    //         console.warn(imageURI)
    //         return imageURI.json()
    //     }).catch(err => console.warn("erere", err))
    // }

    render() {
        let third_text = this.props.third_text == "0" ? "Free" : `$${this.props.third_text}`
        return (
            <TouchableOpacity onPress={this.props.onCardBPress} style={styles.cardContainer}>
                <View style={styles.imageContainer}>
                    {
                        true ?
                            // <FastImage
                            //     source={{
                            //         uri: this.props.imageSource,
                            //         priority: FastImage.priority.normal,
                            //     }}
                            //     onLoad={e => console.warn("log", e)}
                            //     style={styles.image}
                            //     resizeMode={FastImage.resizeMode.cover}
                            // />
                            <Image
                                source={{
                                    uri: 'https://images.gr-assets.com/books/1303117363l/11143580.jpg'
                                }}
                                style={styles.image}
                            />
                            :
                            <Image source={require("../../assets/images/book-placehoalder.png")} style={styles.imagePlacehoalder} />
                    }
                </View>
                <View style={styles.contentContainer}>
                    <Text style={[styles.text, {}]} numberOfLines={2} ellipsizeMode={"tail"}>{this.props.first_text}</Text>
                    <Text style={[styles.text, { opacity: 0.5 }]}>{this.props.second_text}</Text>
                    <Text style={[styles.text, {}]}>{third_text}</Text>
                </View>
            </TouchableOpacity >
        )
    }
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
        overflow: "hidden"
    },
    image: {
        height: 180,
        width: 140,
        resizeMode: 'cover'
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
