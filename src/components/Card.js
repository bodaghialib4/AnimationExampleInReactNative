import React from "react";
import {
    TouchableWithoutFeedback,
    View,
    Image,
    Text,
    Dimensions,
    Animated,
    Easing
} from "react-native";
import IconButton from "./IconButton"

let { width, height } = Dimensions.get('window');
if (width > height) {
    let t = height;
    height = width;
    width = t;
}

const Card = ({
    item,
    cardAction,
    viewAction,
    bookmarkAction,
    shareAction
})=> {
    let scaleValue = new Animated.Value(0); // declare an animated value

    const cardScale= scaleValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.1, 1.2]
    });

    let transformStyle = { ...styles.card, transform: [{scale: cardScale}] };

    return (
        <TouchableWithoutFeedback
            onPress={()=>{
                cardAction();
            }}
            onPressIn={()=>{
                scaleValue.setValue(0);
                Animated.timing(scaleValue,{
                    toValue: 1,
                    duration: 100,
                    easing: Easing.linear,
                    useNativeDriver: true
                }).start();

            }}
            onPressOut={()=>{
                Animated.timing(scaleValue,{
                    toValue: 0,
                    duration:200,
                    easing: Easing.linear,
                    useNativeDriver: true
                }).start();
            }}
        >
            <Animated.View style={transformStyle}>
                <Image source={item.img} style={styles.thumbnail}/>
                <Text style={styles.name}>{item.manufacturer + " - " + item.model}</Text>
                <Text style={styles.name}>{ "price: " + item.price + "$"}</Text>
                <View style={styles.icons}>
                    <IconButton
                        icon={"search"}
                        data={item}
                        onPress={() => {
                            viewAction(item.manufacturer + " - " + item.model, item.price, item.img, item.quality );
                        }}/>
                    <IconButton
                        icon={"bookmark"}
                        data={item}
                        onPress={() => {
                            bookmarkAction();
                        }}/>
                    <IconButton
                        icon={"share"}
                        data={item}
                        onPress={() => {
                            shareAction();
                        }}/>
                </View>
            </Animated.View>

        </TouchableWithoutFeedback>
    );
};

const styles = {
    card:{
        width: width/1.3,
        height: height/3.5,
        backgroundColor: "#fafbfc",
        padding: 10,
        margin: 10,
        alignItems: "center"
    },
    name:{
        fontSize: 15,
        color: "#333",
        fontWeight: "bold"
    },
    thumbnail:{
        //width: width/2,
        height: height/6
    },
    icons:{
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    }
};

export default Card;