import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyAvatar from '../Avatar/MyAvatar';

function LeftHeader(props) {
    function retrieveName() {
        if (props.userFromFS) {
            return props.userFromFS.displayName;
        }
        
        if (props.user) {
            if (props.user.displayName) {
                return props.user.displayName;
            }
        }
        return 'John Doe';
    }

    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('Settings')} style={{ padding: 16 }}>
            <MyAvatar name={retrieveName()} />
        </TouchableOpacity>
    );
}

export default LeftHeader;