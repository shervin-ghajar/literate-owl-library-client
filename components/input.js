import React, { Component } from 'react';
import { TextInput, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { secondaryBackground, darkSlateBlueColor, primaryBackground, blackColor, errorColor } from '../assets/colors';

export default class Input extends Component {
    constructor(props) {
        super(props);
        this.focus = this.focus.bind(this);
        this.state = {
            height: 40
        };
    }

    componentDidMount() {
        if (this.props.autoFocus) this.focus();
    }

    focus() {
        try {
            this.textInput.focus();
        } catch (err) {
            // ...
        }
    }

    blur() {
        try {
            this.textInput.blur();
        } catch (err) {
            // ...
        }
    }
    clear() {
        this.textInput.clear();
        // try {
        // } catch (err) {
        //     // ...
        // }
    }

    render() {
        let borderColor;
        if (this.props.error == undefined || this.props.error == '') {
            // borderColor = '#dfdfdf';
            borderColor = 'transparent';
        }
        else {
            borderColor = errorColor;
        }
        let maxHeight = this.props.numberOfLines && this.props.numberOfLines > 0 ? this.props.numberOfLines * 40 : 40;
        return (
            <View style={[{ marginBottom: 3 }, this.props.containerStyle]}>
                {
                    this.props.labelTitle ?
                        <Text style={[{ zIndex: 999, fontSize: 14, fontFamily: 'Roboto-Regular', color: this.props.error ? errorColor : darkSlateBlueColor, textAlign: 'left', opacity: 0.7 }, this.props.labelStyle]}>
                            {this.props.labelTitle}
                        </Text>
                        : null
                }
                {
                    this.props.isAmount ?
                        <Text style={[{ zIndex: 999, fontSize: 20, fontFamily: 'Roboto-Regular', color: this.props.error ? errorColor : darkSlateBlueColor, textAlign: 'left', opacity: 0.7, bottom: 20, left: -15, position: "absolute" }, this.props.labelStyle]}>$</Text>
                        : null
                }
                {
                    this.props.hasSecureEye ?
                        <TouchableOpacity hitSlop={{ left: 20, right: 30, top: 10, bottom: 10 }} style={{ position: "absolute", right: 5, top: 28, zIndex: 10, backgroundColor: primaryBackground, justifyContent: "center", alignSelf: "flex-end" }} onPress={this.props.onPressSecureEye}>
                            <View style={[styles.imageContainer, this.props.imageContainer]}>
                                {
                                    this.props.isSecure ?
                                        <Image source={require('../assets/icons/password-eye-secure.png')} style={styles.contentImage} />
                                        :
                                        <Image source={require('../assets/icons/password-eye.png')} style={[styles.contentImage]} />
                                }
                            </View>
                        </TouchableOpacity>
                        : null
                }
                <TextInput
                    editable={this.props.editable == undefined ? true : this.props.editable}
                    onContentSizeChange={(event) => {
                        // this.setState({ height: event.nativeEvent.contentSize.height })
                        this.props.onContentSizeChange(event)
                    }}
                    returnKeyLabel={this.props.returnKeyType ? this.props.returnKeyType : 'done'}
                    returnKeyType={this.props.returnKeyType ? this.props.returnKeyType : 'done'}
                    ref={ref => this.textInput = ref}
                    value={this.props.value}
                    autoCapitalize={this.props.autoCapitalize}
                    keyboardType={this.props.keyboardType}
                    numberOfLines={this.props.numberOfLines}
                    multiline={this.props.multiline}
                    onEndEditing={this.props.onEndEditing}
                    onChangeText={this.props.onChangeText}
                    onContentSizeChange={this.props.onContentSizeChange}
                    onFocus={this.props.onFocus}
                    onBlur={this.props.onBlur}
                    underlineColorAndroid='transparent'
                    placeholder={this.props.placeholder}
                    placeholderTextColor={"gray"}
                    secureTextEntry={this.props.isSecure}
                    style={[
                        {
                            borderColor: borderColor,
                            backgroundColor: primaryBackground,
                            borderBottomWidth: 1,
                            borderBottomColor: this.props.error ? errorColor : "#707D99",
                            color: blackColor,
                            fontSize: 16,
                            height: Math.min(maxHeight, Math.max(this.state.height, 40)),
                            textAlign: 'left',
                            fontFamily: 'Roboto-Regular'
                        }, this.props.style]}
                />
                {/* {this.props.isAmount ? <Text style={{ position: "absolute", zIndex: 999, bottom: this.props.error ? 15 : 0, left: 10, fontSize: 10, padding: 3, fontFamily: 'Roboto-Regular', color: 'gray', textAlign: 'left' }}>تومان</Text> : null} */}
                <Text style={[{ fontFamily: 'Roboto-Regular', fontSize: 12, color: errorColor, textAlign: 'left' }, this.props.errorStyle]}>{this.props.error || ""}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        height: 20,
        width: 20,
        margin: 3,
    },
    contentImage: {
        width: "100%",
        height: "100%",
    },
})

