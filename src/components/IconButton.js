import React,{Component} from "react";
import {TouchableWithoutFeedback,View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class IconButton extends Component<{}> {

    render() {
        const { icon, onPress, data } = this.props;

        return(
            <TouchableWithoutFeedback
                onPress={()=>{
                    onPress(data);
                }}
            >
                <View>
                    <Icon
                        name={icon}
                        style={styles.icon}
                        size={15}
                        color={"#586069"}
                    />
                </View>

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



