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
    onDelete: () => void,
    onEdit: () => void,

}


export const SwipeableView = ({ children, deleteButton, editButton, height = ITEM_HEIGHT,width=ITEM_WIDTH, swipeable = true, swipeableHint = true, autoOpened = false, bg = "#FFFFFF", onDelete, onEdit }: SwipeableViewProps) => {

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
            // translateX.value = isSwipeable ?  Math.min(translateX.value, MAX_RIGHT_TRANSLATION) : 0;
            const condition1 = Math.max(translateX.value, -MAX_RIGHT_TRANSLATION)
            const condition2 = Math.min(translateX.value, MAX_RIGHT_TRANSLATION)
            const mixt = I18nManager.isRTL ? condition1 : condition2;
            translateX.value = isSwipeable ? mixt : 0
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
                    scrollTo(-70)
                }
                if (translateX.value < -70) {
                    if(length <2 ){
                        scrollTo(-70)
                        return 
                    }
                    if (translateX.value >= -105 && translateX.value < -70) {
                        scrollTo(-70)
                    }
                    if (translateX.value >= -105 && translateX.value < -70) {
                        scrollTo(-70)
                    }
                    if (translateX.value >= -140 && translateX.value < -105) {
                        scrollTo(-140)
                    }
                    if (translateX.value < -140) {
                        scrollTo(-140)
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
            ...styles.mainContainer,
            height: height,
            width:width,
            backgroundColor: bg
        }}>
            <View style={styles.hiddenView}>
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
                <Animated.View style={[styles.visibleView, reanimatedstyle]}>
                    {children}
                </Animated.View>
            </GestureDetector>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        alignSelf: 'center',
        marginTop: 40
    },
    visibleView: {
        flex: 1,
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























// const MODAL_HEIGHT = 175;



{/* <ConfirmationModal
                isVisible={isOpened}
                onDelete={onDelete}
                onEdit={onEdit}
                onClose={closeModal}
            /> */}

// interface ModalContainerProps {
//     isVisible: boolean,
//     onClose: () => void,
//     onDelete: () => void,
//     onEdit: () => void,
// }

// export const ConfirmationModal = ({ isVisible, onClose, onDelete, onEdit }: ModalContainerProps) => {

//     const translateY = useSharedValue(MODAL_HEIGHT - 30);
//     const opacity = useSharedValue(0);


//     const reanimatedStyle = useAnimatedStyle(() => {
//         return {
//             transform: [{ translateY: translateY.value }],
//             opacity: opacity.value
//         }
//     })

//     const scrollTo = useCallback((destination: number) => {
//         'worklet';
//         translateY.value = withSpring(destination, { damping: 50 })
//     }, [])

//     useEffect(() => {
//         scrollTo(0)
//         opacity.value = withTiming(1)
//     }, [])



//     return (
//         <Modal
//             visible={isVisible}
//             transparent
//             animationType='none'
//         >
//             <Animated.View style={[styles2.fullScreen]}>
//                 <Animated.View style={[styles2.container, reanimatedStyle]}
//                 // layout={EntryExitTransition}
//                 // entering={ZoomIn.duration(500)}
//                 // exiting={ZoomOut.duration(500)}
//                 >
//                     <TouchableOpacity
//                         onPress={onDelete}
//                     >
//                         <Text style={{ fontSize: 22, fontWeight: '700', fontFamily: 'DM Sans' }}>Confirmer</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         onPress={onClose}
//                     >
//                         <Text style={{ fontSize: 22, fontWeight: '700', fontFamily: 'DM Sans' }}>Cancel</Text>
//                     </TouchableOpacity>
//                 </Animated.View>
//             </Animated.View>
//         </Modal>
//     )
// }

// const styles2 = StyleSheet.create({
//     fullScreen: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         // backgroundColor: 'green'
//     },
//     container: {
//         width: "100%",
//         height: MODAL_HEIGHT,
//         // ...padding(24, 24, 24, 24),
//         // backgroundColor: '#FFFFFF',
//         backgroundColor: 'red',
//         borderTopLeftRadius: 15,
//         borderTopRightRadius: 15,
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//     },
//     backgroundCloser: {
//         backgroundColor: 'rgba(24, 29, 39, 0.1)',
//         position: 'absolute',
//         width: '100%',
//         height: '100%',
//     }
// })





{/* <View style={styles.hiddenView}>
                <TouchableWithoutFeedback
                    onPress={openModal}
                // onPress={onDelete}
                >
                    <Image source={TrashIcon} style={{
                        width: 24,
                        height: 24,
                        tintColor: 'red'
                    }} />
                </TouchableWithoutFeedback>
            </View> */}
{/* <View style={styles.hiddenView2}>
                <TouchableWithoutFeedback
                    onPress={onEdit}
                >
                    <Image source={EditIcon} style={{
                        width: 24,
                        height: 24,
                        tintColor: "green"
                    }} />
                </TouchableWithoutFeedback>
            </View> */}