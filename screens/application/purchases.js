import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
//---------------------------------------------------------------------------
import { getScrollableBooks, resetScrollId, getBooksByIds } from '../../actions';
import CardB2 from '../../components/cards/cardB2';
import Loading from '../../components/loading';
import {
    GET_BOOKS_IDS_DEFAULT,
    GET_BOOKS_IDS_STARTED,
    GET_BOOKS_IDS_SUCCESS,
    GET_BOOKS_IDS_FAILURE_NETWORK,
    GET_BOOKS_IDS_FAILURE_VALIDATION,
    GET_ALL_BOOKS_FAILURE_NETWORK,
} from '../../actions/types';
import ButtonR1 from '../../components/buttons/buttonR1';
import { dullOrangeColor, greyBlueBackground } from '../../assets/colors';

class Purchases extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleBooksByIds = this.handleBooksByIds.bind(this)
    }

    componentDidMount() {
        console.warn(222)
        if (this.props.booksReducer.purchased.length != this.props.profileReducer.purchased.length)
            this.handleBooksByIds()
    }

    handleBooksByIds() {
        let idsType = "purchased"
        if (this.props.profileReducer.purchased.length > 0)
            this.props.onGetBooksByIds(this.props.authenticationReducer.userToken, this.props.profileReducer.purchased, idsType)
    }

    renderWithLoading() {
        return <Loading />
    }

    renderWithReload() {
        return (
            <View style={styles.reloadView}>
                <ButtonR1
                    onPress={() => this.handleBooksByIds()}
                    containerStyle={{ width: 235 }}
                    btnStyle={{ backgroundColor: dullOrangeColor }}
                    text={'Try Again'}
                />
            </View>
        )
    }

    renderDefault() {
        let books = []
        let length = this.props.booksReducer.purchased.length
        books = this.props.booksReducer.purchased.map((bookData, i) => {
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
                    cardContainerStyle={length == i + 1 ? { borderBottomWidth: 0 } : {}}
                />
            )
        })
        return (
            <ScrollView>
                <View style={styles.container}>
                    {books}
                </View>
            </ScrollView>
        )
    }

    render() {
        if (this.props.booksReducer.bIdsType == GET_BOOKS_IDS_STARTED) {
            return this.renderWithLoading()
        } else if (this.props.booksReducer.bIdsType == GET_BOOKS_IDS_SUCCESS) {
            return this.renderDefault()
        } else if (this.props.booksReducer.bIdsType == GET_BOOKS_IDS_FAILURE_NETWORK) {
            return this.renderWithReload()
        }
        return this.renderWithLoading()
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    reloadView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})

//------------------------------------------------------------------------------------
const mapStateToProps = state => {
    let { authenticationReducer, profileReducer, booksReducer } = state;
    return { authenticationReducer, profileReducer, booksReducer };
};
const mapDispatchToProps = dispatch => {
    return {
        onGetBooksByIds: (userToken, ids, idsType) => {
            dispatch(getBooksByIds(userToken, ids, idsType))
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Purchases);
