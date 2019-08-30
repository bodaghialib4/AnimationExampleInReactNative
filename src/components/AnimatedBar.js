import React, {Component} from 'react';
import {
    Dimensions,
    View,
    Animated
} from 'react-native';
let {width,height} = Dimensions.get('window');
if( width > height ) {
    let temp=width;
    width=height;
    height=temp;
}

export default class AnimatedBar extends Component <{}>{
    constructor(props){
        super(props);
        this.width = new Animated.Value(0);
    }

    componentDidMount(){
        this.animateBar();
    }

    componentDidUpdate(){
        this.animateBar();
    }

    animateBar = ()=>{
        const {value,index} = this.props;
        this.width.setValue(0);  // initialize the animated value
        Animated.timing(this.width,{
            toValue: value,
            delay: index * 150, // how long to wait before actually starting the animation
        }).start();
    };

    render(){
        let barWidth = this.width.interpolate({
            inputRange:[0,5],
            outputRange:[0,width/2.1]
        })
        let barWidthStyle = {width: barWidth};
        return(
            <Animated.View style={[styles.bar, barWidthStyle]} />
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