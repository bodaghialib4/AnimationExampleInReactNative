import React, {Component} from "react";
import Header from "./Header";
import {Dimensions, TouchableOpacity, View, Text} from "react-native";
let { width, height } = Dimensions.get('window');
if (width > height) {
    let t = height;
    height = width;
    width = t;
}

export default class AnimatedModal extends Component<{}>{
    render(){
        const {title, image,children, onClose} = this.props;

        let bottomStyle = this.props.visible? {bottom:0}:{bottom:-height};

        return(
            <View style={[styles.container, bottomStyle]}>
                <Header title={title}>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </Header>
                <View style={styles.modalContent}>{children}</View>
            </View>
        );
    }
}

const styles = {
    container:{
        position: "absolute",
        height: height,
        width: width,
        bottom: -height,
        backgroundColor: "#fff"
    },
    modalContent: {
        flex: 1,
        alignItems: "stretch",
        paddingTop: 30
    },
    closeText: {
        fontSize: 17,
        color: "#fff"
    }
};


