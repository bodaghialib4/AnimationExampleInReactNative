import React from 'react';
import {View,Text,Dimensions} from 'react-native';

let {width,height} = Dimensions.get('window');
if( width > height ) {
    let temp=width;
    width=height;
    height=temp;
}

const Header = ({title,children})=>{
    return (
        <View style={styles.header}>
            <Text style={styles.header_text}>{title}</Text>
            <View style={styles.childrenContainer}>{children}</View>
        </View>
    )
};

const styles = {
    header:{
        paddingTop: height/20,
        backgroundColor: "#3e3e3e"
    },
    header_text: {
        fontWeight: "bold",
        color: "#FFF",
        fontSize: 17,
        textAlign: "center",
        padding: 10
    },
    childrenContainer: {
        position: "absolute",
        top: height/18,
        right: 10
    }
};

export default Header;
