import { Dimensions } from "react-native"

export const { width: SCREEN_WIDTH } = Dimensions.get('window')


export const ITEM_HEIGHT = 70;
export const ITEM_WIDTH = 370;
export const BUTTON_CONTAINER_WIDTH = 70;
export const TRANSLATION_HINT = 35;
export const MAX_OPPOSITE_TRANSLATION = 15;
export const MIN_DELETE_THRESHOLD = 210;
export const DEFAULT_DELETE_THRESHOLD = 250;
export const THRESHOLD_OPACITY = SCREEN_WIDTH * 0.9;
export const NO_SWIPE_TO_DELETE = SCREEN_WIDTH * 100
