import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Input from '../../../components/input';
import { primaryBackground } from '../../../assets/colors';
import CardB2 from '../../../components/cards/cardB2';
import { search } from '../../../actions';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            firstQueryTime: 0,
            secondQueryTime: 0
        };
        this.queryQueue = this.queryQueue.bind(this)
        this.validateDiffQueryTime = this.validateDiffQueryTime.bind(this)
    }
    componentDidMount() {
        // this.props.navigation.addListener('tabPress', () => {
        //     this.inputRef.focus()
        // })
    }

    queryQueue(query) {
        let firstQueryTime = (new Date()).getTime()
        this.setState({ firstQueryTime }, () => {
            console.warn(123)
            this.props.onSearch(this.props.authenticationReducer.userToken, query)
        })
    }

    validateDiffQueryTime(query) {
        let trimQuery = query.trim()
        let isValid = false
        if (this.state.secondQueryTime && trimQuery && trimQuery != "" && trimQuery.length >= 3) {
            isValid = (this.state.secondQueryTime - this.state.firstQueryTime) >= 1000
        }

        // console.warn(this.state.secondQueryTime - this.state.firstQueryTime, isValid)
        return isValid
    }

    handleQueryChange(query) {
        let secondQueryTime = (new Date()).getTime()
        this.setState({ query, secondQueryTime });
        if (this.validateDiffQueryTime(query)) {
            this.queryQueue(query)
        }
    }

    renderSearchResults() {
        let books = []
        let length = this.props.booksReducer.search.length
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
                    cardContainerStyle={length == i + 1 ? { borderBottomWidth: 0 } : {}}
                />
            )
        })
        return (
            <ScrollView>

                <View style={styles.resultContainer}>
                    {
                        length ?
                            books :
                            (
                                this.state.firstQueryTime && this.state.query && this.state.query != "" ?
                                    <Text style={{ width: 300, textAlign: "center", alignSelf: "center", fontFamily: 'Roboto-Regular', fontSize: 16 }}>No result found</Text>
                                    : null
                            )
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
                    onEndEditing={(e) => {
                        this.handleQueryChange(e.nativeEvent.text)
                    }}
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
