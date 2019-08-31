import React , {Component} from 'react';
import {
    Dimensions,
    View,
    Image,
    Text,
    Animated,
    Easing
} from  'react-native';
import DataRow from "./DataRow"
let {width,height} = Dimensions.get('window');
if( width > height ) {
    let temp=width;
    width=height;
    height=temp;
}


export default class BigCard extends Component<{}> {
    constructor(props){
        super(props);
        this.imageOpacityValue = new Animated.Value(0);
        this.titleTranslateYValue = new Animated.Value(0);
        this.titleScaleValue = new Animated.Value(0);
    }

    componentDidUpdate() {
        //reset the animation values
        this.imageOpacityValue.setValue(0);
        this.titleTranslateYValue.setValue(0);
        this.titleScaleValue.setValue(0);

        //start the sequence
        Animated.sequence([
            Animated.timing(this.imageOpacityValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }),
            Animated.timing(this.titleTranslateYValue, {
                toValue: 1,
                duration: 400,
                easing: Easing.linear
            }),
            Animated.timing(this.titleScaleValue, {
                toValue: 1,
                duration: 300,
                easing: Easing.linear
            })
        ]).start();
    }

    render() {
        const {title,price, image, data} = this.props;
        //interpolate the image opacity
        const imageOpacity = this.imageOpacityValue.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: [0, 0.25, 0.5, 0.75, 1]
        });
        //construct the image style
        const imageOpacityStyle={
            opacity: imageOpacity
        };

        //interpolate the vertial position of the title
        const titleMoveY = this.titleTranslateYValue.interpolate({
            inputRange:[0,1],
            outputRange:[0,height/2]
        });
        //interpolate the scale of the title
        const titleScale = this.titleScaleValue.interpolate({
            inputRange:[0,0.5,1],
            outputRange:[0.25,0.5,1]
        });
        //construct the style for the title
        const titleTransformStyle={
            transform:[{translateY: titleMoveY},{scale: titleScale}]
        };




        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <Animated.Image
                        source={image}
                        style={[styles.image,imageOpacityStyle]}
                        resizeMode={"contain"}/>
                    <Animated.View style={[styles.titleContainer,titleTransformStyle]}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.price}>
                            {"price: " + price + "$"}
                        </Text>
                    </Animated.View>
                </View>
                {data && (
                    <View style={styles.dataContainer}>
                        {this.renderDataRows(data)}
                    </View>
                )}
            </View>
        );
    }

    renderDataRows = (data)=>{
        return data.map((item,index)=>{
            return(
                <DataRow
                    label={item.label}
                    value={item.value}
                    index={index}
                    key={item.label}
                />
            );
        });
    };

}

const styles = {
    container: {
        flex: 1,
    },
    mainContainer: {
        minHeight: height/2.5,
        alignItems: "center",
    },
    image: {
        width: width/1.1,
        minHeight: height/4,
    },
    titleContainer: {
        height:height/13,
        alignItems:'center',
        justifyContent:'space-around',
        position: 'absolute',
        top:-height/5.2,

    },
    title: {
        fontSize: 25,
        fontWeight: "bold"
    },
    price: {
        fontSize: 25,
    },
    dataContainer: {
        minHeight: height/3,
        flexDirection: "column",
        padding: 20
    }
};