import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
//------------------------------------------------------------------------
import { getScrollableBooks, resetScrollId } from '../../actions';
import CardB2 from '../../components/cards/cardB2';
import Loading from '../../components/loading';
//------------------------------------------------------------------------
class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleScrollableBooks = this.handleScrollableBooks.bind(this)
    }

    componentDidMount() {
        if (this.props.booksReducer.scrollableBooks.length == 0)
            this.handleScrollableBooks()
    }
    componentWillUnmount() {
        this.props.onResetScrollId()
    }

    handleScrollableBooks() {
        switch (this.props.route.params.queryType) {
            case 'genres':
                this.props.onGetScrollableBooks(this.props.authenticationReducer.userToken, this.props.route.params.queryType, this.props.booksReducer.scrollId, this.props.route.params.genres)
                break;
            case 'new':
            case 'free':
            case 'popular':
                this.props.onGetScrollableBooks(this.props.authenticationReducer.userToken, this.props.route.params.queryType, this.props.booksReducer.scrollId, null)
        }
    }
    renderWithLoading() {
        return <Loading />
    }

    render() {
        return (
            <SafeAreaView >
                <FlatList
                    style={styles.container}
                    data={this.props.booksReducer.scrollableBooks}
                    renderItem={({ item }) => {
                        let { id, title, authors, price, rating, rating_count, image_url } = item
                        return (
                            <CardB2
                                key={id}
                                onCardBPress={() => { this.props.navigation.navigate("BookDetails", { bookData: item }) }}
                                imageSource={image_url}
                                first_text={title}
                                second_text={authors[0]}
                                third_text={price}
                                fourth_text={rating_count}
                                star_count={rating}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => item.id}
                    ListFooterComponent={this.renderWithLoading}
                    onEndReached={this.handleScrollableBooks}
                    initialNumToRender={20}
                    onEndReachedThreshold={0.5}
                    progressViewOffset={1}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})

//------------------------------------------------------------------------------------
const mapStateToProps = state => {
    let { authenticationReducer, booksReducer } = state;
    return { authenticationReducer, booksReducer };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetScrollableBooks: (userToken, queryType, scrollId, genres) => {
            dispatch(getScrollableBooks(userToken, queryType, scrollId, genres))
        },
        onResetScrollId: () => {
            dispatch(resetScrollId())
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Books);
