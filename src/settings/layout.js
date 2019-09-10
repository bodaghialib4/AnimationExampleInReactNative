import {Platform, Dimensions} from "react-native"

let {width, height} = Dimensions.get('window');
if (width > height) {
    let temp = width;
    width = height;
    height = temp;
}

const HEADER_MAX_HEIGHT = height / 2.2;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? height / 13 : height / 13;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


export {HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE} ;