import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Input from '../../../components/input';
import { primaryBackground } from '../../../assets/colors';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
    }
    componentDidMount() {
        this.props.navigation.addListener('tabPress', () => {
            console.warn(123)
            this.inputRef.focus()
        })
    }
    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Input
                    value={this.state.query}
                    autoFocus
                    ref={(ref) => this.inputRef = ref}
                    placeholder={"Search for titles or authors"}
                    style={styles.input}
                    // onEndEditing={(e) => {
                    //     let password = (e.nativeEvent.text).trim()
                    //     this.setState({ password }, () => {
                    //         this.validate(password, 'password')
                    //     })
                    // }}
                    onChangeText={query => {
                        this.setState({ query });
                    }}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
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
    }
})

export default Search