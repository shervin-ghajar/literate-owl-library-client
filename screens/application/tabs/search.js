import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Input from '../../../components/input';
import { primaryBackground, grayColor, dullOrangeColor } from '../../../assets/colors';
import CardB2 from '../../../components/cards/cardB2';
import { search } from '../../../actions';
import { SEARCH_SUCCESS, SEARCH_STARTED } from '../../../actions/types';
import Loading from '../../../components/loading';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.queryQueue = this.queryQueue.bind(this)
    }
    componentDidMount() {
        // this.props.navigation.addListener('tabPress', () => {
        //     this.inputRef.focus()
        // })
    }
    renderWithLoading() {
        return <Loading style={{ justifyContent: "flex-start", }} />
    }

    queryQueue(query) {
        let trimQuery = query.trim()
        if (trimQuery.length >= 3 && this.props.booksReducer.srchRType != SEARCH_STARTED) {
            this.queryTimeout = setTimeout(() => {
                this.props.onSearch(this.props.authenticationReducer.userToken, query)
            }, 350);
        }
    }

    handleQueryChange(query) {
        clearTimeout(this.queryTimeout)
        this.setState({ query }, () => {
            this.queryQueue(query)
        })
    }

    renderSearchResults() {
        let books = []
        let booksLength = this.props.booksReducer.search.length
        if (this.props.booksReducer.srchRType == SEARCH_STARTED) {
            return this.renderWithLoading()
        } else if (this.props.booksReducer.srchRType == SEARCH_SUCCESS) {
            books = this.props.booksReducer.search.map((bookData, i) => {
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
                        ratingTintColor={primaryBackground}
                        cardContainerStyle={booksLength == i + 1 ? { borderBottomWidth: 0 } : {}}
                    />
                )
            })
        }
        return (
            <ScrollView>
                <View style={styles.resultContainer}>
                    {
                        booksLength > 0 ?
                            books
                            :
                            this.props.booksReducer.srchRType == SEARCH_SUCCESS ?
                                <Text style={{ width: 300, textAlign: "center", alignSelf: "center", fontFamily: 'Roboto-Regular', fontSize: 16, color: dullOrangeColor }}>No result found</Text>
                                : null

                    }
                </View>
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={styles.scrollView}>
                <Input
                    value={this.state.query}
                    autoFocus
                    keyboardType={"web-search"}
                    ref={(ref) => this.inputRef = ref}
                    placeholder={"Search for titles or authors"}
                    style={styles.input}
                    // onEndEditing={(e) => {
                    //     this.handleQueryChange(e.nativeEvent.text)
                    // }}
                    onChangeText={query => {
                        this.handleQueryChange(query)
                    }}
                />
                {this.renderSearchResults()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: primaryBackground
    },
    input: {
        backgroundColor: '#F2F2F2',
        width: "90%",
        height: 45,
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 20,
        borderBottomWidth: 0
    },
    resultContainer: {
        // marginVertical: 5,
        marginHorizontal: 20
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
        onSearch: (userToken, query) => {
            dispatch(search(userToken, query))
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
