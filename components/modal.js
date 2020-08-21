import React from 'react';
import { Text, View, Image, Modal, TouchableOpacity } from 'react-native';
import { primaryBackground } from '../assets/colors';

const ModalPanel = ({
    visible, onClose, headerSource, headerImageStyle, children
}) => (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}>
            <View style={styles.view} >
                <View style={styles.container}>
                    <View style={{ marginTop: 15, alignItems: "flex-end" }}>
                        <TouchableOpacity hitSlop={{ top: 10, right: 15, bottom: 10 }} style={{ width: 30 }} onPress={onClose}>
                            <Image source={require('../assets/icons/close-modal.png')} style={styles.closeImage} />
                        </TouchableOpacity>
                    </View>
                    {
                        headerSource ?
                            <Image source={headerSource} style={[styles.headerImage, headerImageStyle]} />
                            : null
                    }
                    <View style={styles.contentContainer}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );

const styles = {
    view: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    headerImage: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    closeImage: {
        width: 20,
        height: 20
    },
    container: {
        width: 330,
        backgroundColor: primaryBackground,
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 5,
        marginVertical: 15,
    },
    contentContainer: {
        marginTop: 15,
        marginBottom: 30,
        alignItems: 'center',
    }
}

export default ModalPanel;
