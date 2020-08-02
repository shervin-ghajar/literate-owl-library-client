import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
// import CardB1 from '../../components/cards/cardB1';
import CardS1 from '../../components/cards/cardS1';
import CardB1 from '../../components/cards/cardB1';
import { getAllBooks } from '../../actions';
import { GET_ALL_BOOKS_SUCCESS, GET_ALL_BOOKS_DEFAULT, GET_ALL_BOOKS_STARTED, GET_ALL_BOOKS_FAILURE_NETWORK } from '../../actions/types';
import Loading from '../../components/loading';
import ButtonR1 from '../../components/buttons/buttonR1';
import { dullOrangeColor } from '../../assets/colors';
import { set } from 'react-native-reanimated';
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
class BookStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false
        };
        this.getAllBooks = this.getAllBooks.bind(this)
    }

    componentDidMount() {
        if (this.props.booksReducer.rtype != GET_ALL_BOOKS_SUCCESS)
            this.getAllBooks()
    }

    getAllBooks() {
        this.props.onGetAllBooks(this.props.authenticationReducer.userToken)
    }

    renderWithLoading() {
        return <Loading />
    }

    renderWithReload() {
        return (
            <View style={styles.reloadView}>
                <ButtonR1
                    onPress={() => this.getAllBooks()}
                    containerStyle={{ width: 235 }}
                    btnStyle={{ backgroundColor: dullOrangeColor }}
                    text={'Try Again'}
                />
            </View>
        )
    }

    renderDefault() {
        let newBooks = []
        let freeBooks = []
        let popularBooks = []
        if (this.props.booksReducer.rtype == GET_ALL_BOOKS_SUCCESS) {
            newBooks = this.props.booksReducer.newBooks.map((newBook, i) => {
                let { id, title, authors, price, rating, rating_count, image_url } = newBook
                return (
                    <CardB1
                        key={id}
                        onCardBPress={() => { this.props.navigation.navigate("BookDetails", { bookData: newBook }) }}
                        imageSource={image_url}
                        first_text={title}
                        second_text={authors[0]}
                        third_text={price}
                        fourth_text={rating_count}
                        star_count={rating}
                    />
                )
            })
            freeBooks = this.props.booksReducer.freeBooks.map(freeBook => {
                let { id, title, authors, price, rating, rating_count, image_url } = freeBook
                return (
                    <CardB1
                        key={id}
                        onCardBPress={() => { this.props.navigation.navigate("BookDetails", { bookData: freeBook }) }}
                        imageSource={image_url}
                        first_text={title}
                        second_text={authors[0]}
                        third_text={price}
                        fourth_text={rating_count}
                        star_count={rating}
                    />
                )
            })
            popularBooks = this.props.booksReducer.popularBooks.map(popularBook => {
                let { id, title, authors, price, rating, rating_count, image_url } = popularBook
                return (
                    <CardB1
                        key={id}
                        onCardBPress={() => { this.props.navigation.navigate("BookDetails", { bookData: popularBook }) }}
                        imageSource={image_url}
                        first_text={title}
                        second_text={authors[0]}
                        third_text={price}
                        fourth_text={rating_count}
                        star_count={rating}
                    />
                )
            })

        }
        return (
            <View style={styles.container}>
                <ScrollView>
                    <CardS1 title={"New Releases"} subTitle={"Recently released books."} >
                        {newBooks}
                    </CardS1>
                    <CardS1 title={"Free"} subTitle={"Free books of the week"} >
                        {freeBooks}
                    </CardS1>
                    <CardS1 title={"You Must Read"} subTitle={"Most rated 100 books written by the best authors."}>
                        {popularBooks}
                    </CardS1>
                </ScrollView>
            </View>
        )
    }

    render() {
        if (this.props.booksReducer.rtype == GET_ALL_BOOKS_DEFAULT) {
            return this.renderWithLoading()
        } else if (this.props.booksReducer.rtype == GET_ALL_BOOKS_STARTED) {
            return this.renderWithLoading()
        } else if (this.props.booksReducer.rtype == GET_ALL_BOOKS_SUCCESS) {
            return this.renderDefault()
        } else if (this.props.booksReducer.rtype == GET_ALL_BOOKS_FAILURE_NETWORK) {
            return this.renderWithReload()
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reloadView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    }
})
//------------------------------------------------------------------------------------
const mapStateToProps = state => {
    let { authenticationReducer, booksReducer } = state;
    return { authenticationReducer, booksReducer };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAllBooks: (userToken) => {
            dispatch(getAllBooks(userToken))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookStore);