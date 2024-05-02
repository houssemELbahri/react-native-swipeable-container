import React, { ReactNode } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native'
import { BUTTON_CONTAINER_WIDTH } from '../constants';




interface HiddenButtonProps {
    children: ReactNode,
    onPress: () => void,
}

export const HiddenButton = ({ children, onPress }: HiddenButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}>
            {children}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: BUTTON_CONTAINER_WIDTH,
    }
})