import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { greyBlueColor } from '../assets/colors';

const Loading = ({ size, color }) => (
    <View style={styles.view}>
        <ActivityIndicator size={size || 'large'} color={color || greyBlueColor} />
    </View>
);

const styles = {
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default Loading;