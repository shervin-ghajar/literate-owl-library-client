import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ButtonR1 from '../../components/buttons/buttonR1';
import { connect } from 'react-redux';
import { logout } from '../../actions';
//------------------------------------------------------------------------------------------
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <ButtonR1
                    onPress={() => this.props.onLogout(this.props.authenticationReducer.userToken)}
                    text={"Logout"} />
            </View>
        );
    }
}
//------------------------------------------------------------------------------------
const mapStateToProps = state => {
    let { authenticationReducer } = state;
    return { authenticationReducer };
};
const mapDispatchToProps = dispatch => {
    return {
        onLogout: (userToken) => {
            dispatch(logout(userToken))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
