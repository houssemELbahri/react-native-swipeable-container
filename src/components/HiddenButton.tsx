import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native'
import { BUTTON_CONTAINER_WIDTH } from '../constants';




interface HiddenButtonProps {
    children: ReactNode,
    onPress: () => void,
}

export const HiddenButton = ({ children, onPress }: HiddenButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                // backgroundColor: '#F9F',
                width: BUTTON_CONTAINER_WIDTH,
                overflow:'hidden'
            }}>
            {children}
        </TouchableOpacity>
    )
}