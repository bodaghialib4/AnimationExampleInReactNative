import React,{Component} from "react";
import {
    TouchableWithoutFeedback,
    View,
    Animated,
    Easing
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class IconButton extends Component<{}> {

    constructor(props) {
        super(props)
        this.rotateValue = new Animated.Value(0); //declare animated value
    }

    render() {
        const {icon, onPress, data} = this.props;


        let rotation = this.rotateValue.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"] // degree of rotation
        });

        let transformStyle = {transform: [{rotate: rotation}]};

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    onPress(data);
                }}
                onPressIn={() => {
                    Animated.timing(this.rotateValue, {
                        toValue: 1,
                        duration: 750,
                        easing: Easing.linear
                    }).start()
                }}
                onPressOut={() => {
                    Animated.timing(this.rotateValue, {
                        toValue: 0,
                        duration: 500,
                        easing: Easing.linear
                    }).start()
                }}
            >
                <Animated.View style={transformStyle}>
                    <Icon
                        name={icon}
                        style={styles.icon}
                        size={15}
                        color={"#586069"}
                    />
                </Animated.View>

            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    icon:{
        paddingLeft: 5,
        paddingRight: 5
    }
};



