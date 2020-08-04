import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import CardB2 from '../../components/cards/cardB2';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let bookList = []
        bookList = this.props.route.params.booksData.map(bookData => {
            let { id, title, authors, price, rating, rating_count, image_url } = bookData
            return (
                <CardB2
                    key={id}
                    onCardBPress={() => { this.props.navigation.navigate("BookDetails", { bookData }) }}
                    imageSource={image_url}
                    first_text={title}
                    second_text={authors[0]}
                    third_text={price}
                    fourth_text={rating_count}
                    star_count={rating}
                />
            )
        })
        return (
            <ScrollView onMomentumScrollEnd={() => console.warn("123")}>
                <View style={styles.container}>
                    {bookList}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    }
})

export default Books;
