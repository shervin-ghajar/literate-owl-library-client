import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
// import CardB1 from '../../components/cards/cardB1';
import CardS1 from '../../components/cards/cardS1';
import CardB1 from '../../components/cards/cardB1';
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
class BookStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.onGetAllBooks(this.props.authenticationReducer.userToken)
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <CardS1 title={"New Releases"} subTitle={"Recently released books."} >
                        <CardB1
                            onCardBPress={() => { console.warn(123) }}
                            first_text={"The Lord of the Rings: The Fellowship of the Ring"}
                            second_text={"J. R. R. Talkin"}
                            third_text={"$9.99"}
                        />
                    </CardS1>
                    <CardS1 title={"Free"} subTitle={"Free books of the week"} >
                        <CardB1
                            onCardBPress={() => { console.warn(123) }}
                            first_text={"The Lord of the Rings: The Fellowship of the Ring"}
                            second_text={"J. R. R. Talkin"}
                            third_text={"$9.99"}
                        />
                    </CardS1>
                    <CardS1 title={"You Must Read"} subTitle={"Most rated 100 books written by the best authors."}>
                        <CardB1
                            onCardBPress={() => { console.warn(123) }}
                            first_text={"The Lord of the Rings: The Fellowship of the Ring"}
                            second_text={"J. R. R. Talkin"}
                            third_text={"$9.99"}
                        />
                    </CardS1>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red"
    },
})
//------------------------------------------------------------------------------------
const mapStateToProps = state => {
    let { authenticationReducer } = state;
    return { authenticationReducer };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAllBooks: (userToken) => {
            dispatch(getAllBooks(userToken))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookStore);