import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';
let {width,height} = Dimensions.get('window');
if( width > height ) {
    let temp=width;
    width=height;
    height=temp;
}

export default class AnimatedBar extends Component <{}>{
    render(){
        let widthStyle = { width: (this.props.value/5) * width/2.1 };
        return(
            <View style={[styles.bar, widthStyle]} />
        )
    }
}


const styles = {
    bar: {
        height: 15,
        borderWidth: 1,
        borderColor: "#c72f06",
        backgroundColor: "#e75832"
    }
};