import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
// import CardB1 from '../../components/cards/cardB1';
import CardS1 from '../../../components/cards/cardS1';
import CardB1 from '../../../components/cards/cardB1';
import { getAllBooks } from '../../../actions';
import { GET_ALL_BOOKS_SUCCESS, GET_ALL_BOOKS_DEFAULT, GET_ALL_BOOKS_STARTED, GET_ALL_BOOKS_FAILURE_NETWORK } from '../../../actions/types';
import Loading from '../../../components/loading';
import ButtonR1 from '../../../components/buttons/buttonR1';
import { dullOrangeColor, primaryBackground } from '../../../assets/colors';
import { set } from 'react-native-reanimated';
import ButtonA2 from '../../../components/buttons/buttonA1';
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
class BookStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false
        };
        this.getAllBooks = this.getAllBooks.bind(this)
        this.handleSeeAll = this.handleSeeAll.bind(this)
        this.handleGenresOnPress = this.handleGenresOnPress.bind(this)
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

    handleSeeAll(queryType) { //books,
        this.props.navigation.navigate('Books', { queryType })// booksData: books,
    }

    handleGenresOnPress(genreTitle) {
        let genres = genreTitle.split("&")
        genres = genres.map(genre => genre.trim())
        this.props.navigation.navigate("Books", { queryType: 'genres', genres, genreTitle })
    }

    renderGenre() {
        return (
            <>
                <View style={{ marginVertical: 20, paddingHorizontal: 20, }}>
                    <Text style={{ fontFamily: "NewYorkLarge-Bold", fontSize: 25 }}>Genres</Text>
                </View>
                <View style={{ marginHorizontal: 20 }}>
                    <ButtonA2 onPress={() => this.handleGenresOnPress("Action & Adventure")} text={"Action & Adventure"} iconSource={require('../../../assets/icons/genres/gun.png')} />
                    <ButtonA2 onPress={() => this.handleGenresOnPress("Biography & Memoir")} text={"Biography & Memoir"} iconSource={require('../../../assets/icons/genres/statue.png')} />
                    <ButtonA2 onPress={() => this.handleGenresOnPress("Childrens")} text={"Childrens"} iconSource={require('../../../assets/icons/genres/train.png')} />
                    <ButtonA2 onPress={() => this.handleGenresOnPress("Comics & Graphic Novels")} text={"Comics & Graphic Novels"} imageContainer={{ width: 30 }} iconSource={require('../../../assets/icons/genres/bang.png')} />
                    <ButtonA2 onPress={() => { this.props.navigation.navigate("Genres") }} text={"All Genres"} isBlackArrow textStyle={{ fontFamily: "Roboto-Bold" }} iconSource={require('../../../assets/icons/genres/all-genres.png')} />
                </View>
            </>
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
                    <CardS1 onSeeAllPress={() => this.handleSeeAll('new')} title={"New Releases"} subTitle={"Recently released books."} >
                        {newBooks}
                    </CardS1>
                    <CardS1 onSeeAllPress={() => this.handleSeeAll('free')} title={"Free"} subTitle={"Free books of the week"} >
                        {freeBooks}
                    </CardS1>
                    <CardS1 onSeeAllPress={() => this.handleSeeAll('popular')} title={"You Must Read"} subTitle={"Most rated 100 books written by the best authors."}>
                        {popularBooks}
                    </CardS1>
                    {this.renderGenre()}
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
        backgroundColor: primaryBackground
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