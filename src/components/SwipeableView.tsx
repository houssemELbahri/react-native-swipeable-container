import React, { useEffect, useCallback, useMemo, ReactNode, } from 'react';
import { View, StyleSheet, I18nManager } from "react-native";
import { Gesture, GestureDetector, } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';
import { HiddenButton } from './HiddenButton';
import { BUTTON_CONTAINER_WIDTH, ITEM_HEIGHT, ITEM_WIDTH, MAX_RIGHT_TRANSLATION, TRANSLATION_HINT } from '../constants';





interface SwipeableViewProps {
    children: ReactNode;
    deleteButton?: ReactNode;
    editButton?: ReactNode;
    height?: number | string;
    swipeable?: boolean,
    swipeableHint?: boolean,
    autoOpened?: boolean,
    bg?: string,
    width?:number | string,
    borderRadius?:number,
    marginTop?:number,
    marginBottom?:number,
    marginStart?:number,
    marginEnd?:number,
    onDelete: () => void,
    onEdit: () => void,

}


export const SwipeableView = ({ children, deleteButton, editButton, height = ITEM_HEIGHT,width=ITEM_WIDTH, swipeable = true, swipeableHint = true, autoOpened = false, bg = "#FFFFFF",borderRadius=0,marginTop=0,marginBottom=0,marginStart=0,marginEnd=0, onDelete, onEdit }: SwipeableViewProps) => {

    const translateX = useSharedValue(0);
    const context = useSharedValue({ x: 0 });

    const length = useMemo(() => {
        if (deleteButton && editButton) {
            return 2
        }
        if (deleteButton || editButton) {
            return 1
        }
        return 0
    }, [!!deleteButton,!!editButton])






    const isSwipeable = useMemo(() => {
        'worklet';
        const _isSwipeable = swipeable && (!!deleteButton || !!editButton)
        return _isSwipeable
    }, [swipeable,!!deleteButton,!!editButton])


    const scrollTo = useCallback((destination: number) => {
        'worklet';
        translateX.value = withSpring(destination, { damping: 50 })
    }, [])

    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { x: translateX.value }
        })
        .onUpdate((event) => {
            translateX.value = event.translationX + context.value.x;
            const rtlCondition = Math.max(translateX.value, -MAX_RIGHT_TRANSLATION)
            const ltrCondition = Math.min(translateX.value, MAX_RIGHT_TRANSLATION)
            const _translate = I18nManager.isRTL ? rtlCondition : ltrCondition;
            translateX.value = isSwipeable ? _translate : 0
        })
        .onEnd(() => {
            if (I18nManager.isRTL) {
                if (translateX.value > 140) {
                    scrollTo(140)
                }
                if (translateX.value <= 140 && translateX.value > 105) {
                    scrollTo(140)
                }
                if (translateX.value <= 105 && translateX.value > 70) {
                    scrollTo(70)
                }
                if (translateX.value <= 70 && translateX.value > 35) {
                    scrollTo(70)
                }
                if (translateX.value <= 35) {
                    scrollTo(0)
                }
            }
            else {
                if (translateX.value >= -35) {
                    scrollTo(0)
                }
                if (translateX.value >= -70 && translateX.value < -35) {
                    scrollTo(-69)
                }
                if (translateX.value < -70) {
                    if(length <2 ){
                        scrollTo(-69)
                        return 
                    }
                    if (translateX.value >= -105 && translateX.value < -70) {
                        scrollTo(-69)
                    }
                    if (translateX.value >= -105 && translateX.value < -70) {
                        scrollTo(-69)
                    }
                    if (translateX.value >= -140 && translateX.value < -105) {
                        scrollTo(-138)
                    }
                    if (translateX.value < -140) {
                        scrollTo(-138)
                    }
                }

            }
        })


    const reanimatedstyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    })

    useEffect(() => {
        if (autoOpened) {
            if (I18nManager.isRTL) {
                setTimeout(() => {
                    scrollTo(BUTTON_CONTAINER_WIDTH)
                }, 500)
                return
            }
            else {
                setTimeout(() => {
                    scrollTo(-BUTTON_CONTAINER_WIDTH)
                }, 500)
                return
            }
        }
        if (isSwipeable && swipeableHint) {
            if (I18nManager.isRTL) {
                scrollTo(-TRANSLATION_HINT)
                setTimeout(() => {
                    scrollTo(0)
                }, 500)
            }
            else {
                scrollTo(TRANSLATION_HINT)
                setTimeout(() => {
                    scrollTo(0)
                }, 500)
            }
        }
    }, [autoOpened,isSwipeable,swipeableHint])

    return (
        <View style={{
            height: height,
            width:width,
            backgroundColor: bg,
            marginTop,
            marginBottom,
            marginStart,
            marginEnd,
        }}>
            <View style={{...styles.hiddenView,borderRadius}}>
                {deleteButton &&
                    <HiddenButton
                        onPress={onDelete}
                    >
                        {deleteButton}
                    </HiddenButton>
                }
                {editButton &&
                    <HiddenButton
                        onPress={onEdit}
                    >
                        {editButton}
                    </HiddenButton>
                }
            </View>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.visibleView,{borderRadius}, reanimatedstyle]}>
                    {children}
                </Animated.View>
            </GestureDetector>
        </View>
    )
}


const styles = StyleSheet.create({
    visibleView: {
        flex: 1,
        overflow:'hidden'
    },
    hiddenView: {
        position: 'absolute',
        height: "100%",
        width: '100%',
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
        right: 0,
        overflow: 'hidden',
    },
})

