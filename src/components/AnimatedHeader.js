import React from 'react';
import {
    View,
    Text,
    Dimensions,
    Animated,
    Platform
} from 'react-native';
import {HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE} from "../settings/layout"

let {width, height} = Dimensions.get('window');
if (width > height) {
    let temp = width;
    width = height;
    height = temp;
}

const AnimatedHeader = ({title, nativeScrollY}) => {

    if (nativeScrollY) {

        console.log("height: " + height)
        console.log("width: " + width)
        //for animating the Y position of header
        const headerTranslateY = nativeScrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: "clamp" // so it wont go over the output range
        });

        //for animating the opacity of background image
        const BGImageOpacity = nativeScrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.3, 0],
            extrapolate: "clamp"
        });

        //for animating the Y position of background image
        const BGImageTranslateY = nativeScrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, HEADER_SCROLL_DISTANCE / 2],
            extrapolate: "clamp"
        });

        //for animating the scale of title
        const titleScale = nativeScrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_MAX_HEIGHT],
            outputRange: [1, 0.85, 0.8],
            extrapolate: "clamp"
        });

        //for animating the Y position of title
        const titleTranslateY = nativeScrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_MAX_HEIGHT],
            outputRange: [height / 26, height / 20, height / 44],
            extrapolate: "clamp"
        });

        const headerStyle = {transform: [{translateY: headerTranslateY}]};

        const headerBarStyle = {
            transform: [{scale: titleScale}, {translateY: titleTranslateY}]
        };

        const BGImageStyle = {
            opacity: BGImageOpacity,
            transform: [{translateY: BGImageTranslateY}]
        };


        return (
            <View style={styles.header_container}>
                <Animated.View
                    poinerEvents="none"
                    style={[styles.header, headerStyle]}
                >
                    <Animated.Image
                        style={[styles.header_bg, BGImageStyle]}
                        resizeMode={"cover"}
                        source={require("../data/img/header_image.jpg")}
                    />
                </Animated.View>
                <Animated.View style={[styles.header_bar, headerBarStyle]}>
                    <Text style={styles.header_text}>{title}</Text>
                </Animated.View>
            </View>
        );
    }


    //if nativeScrollY isn’t available
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.header_text}>{title}</Text>
            </View>
        </View>
    );

};

const styles = {
    header_container: {
        ...Platform.select({
            ios: {
                zIndex: 1 // only applied to iOS, for some reason the cards is laid on top of the header when scrolling
            }
        })
    },
    header: {
        position: "absolute",
        top: 0, // so it's at the very top of its container
        left: 0, // for 100% width
        right: 0, // for 100% width
        backgroundColor: "#000000",
        overflow: "hidden", // for containing the background image because this container is absolutely positioned
        height: HEADER_MAX_HEIGHT, // needed for absolutely positioned elements
        zIndex: 1 // so the header will be laid on top of the list
    },
    header_bg: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: null, // important so we can apply resizeMode=cover
        height: HEADER_MAX_HEIGHT
    },
    header_bar: {
        backgroundColor: "transparent",
        height: height / 20,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
    },
    header_text: {
        color: "#FFF",
        fontSize: width / 15,
        fontWeight: "bold"
    },
};

export default AnimatedHeader;
