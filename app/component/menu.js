import React from 'react';
import PropTypes from 'prop-types';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: '#ffffff',
        padding: 0,
    },
    avatarContainer: {
        marginBottom: 0,
        marginTop: 0,
    },
    avatar: {
        width: 300,
        height: 200,
        borderRadius: 0,
        flex: 1,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});

export default function Menu({ onItemSelected }) {
    return (
        <ScrollView scrollsToTop={false} style={styles.menu}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={require('../assets/menu_bg.jpg')}
                />

            </View>

            <Text
                onPress={() => onItemSelected('About')}
                style={styles.item}
            >
                About
            </Text>

            <Text
                onPress={() => onItemSelected('Contacts')}
                style={styles.item}
            >
                Contacts
            </Text>
        </ScrollView>
    );
}

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
};