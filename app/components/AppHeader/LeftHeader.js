import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyAvatar from '../Avatar/MyAvatar';
import { useNavigation } from "@react-navigation/native";

function LeftHeader(props) {
    const navigation = useNavigation();
    function retrieveName() {
        if (props.userFromFS) {
            return props.userFromFS.displayName;
        }
        
        if (props.user) {
            if (props.user.displayName) {
                return props.user.displayName;
            }
        }
        return 'Lisa';
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('notification')} style={{ padding: 12 }}>
            <MyAvatar name={retrieveName()} />
        </TouchableOpacity>
    );
}

export default LeftHeader;