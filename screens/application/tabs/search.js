import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Input from '../../../components/input';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <ScrollView>
                <Input placehoalder={"Search"} in />
            </ScrollView>
        );
    }
}

export default Search