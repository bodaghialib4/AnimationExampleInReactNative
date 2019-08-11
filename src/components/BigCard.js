import React , {Component} from 'react';
import {Dimensions, View, Image, Text} from  'react-native';
import DataRow from "./DataRow"
let {width,height} = Dimensions.get('window');
if( width > height ) {
    let temp=width;
    width=height;
    height=temp;
}


export default class BigCard extends Component<{}> {
    render() {
        const {title,price, image, data} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <Image source={image} style={styles.image} resizeMode={"contain"}/>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.price}>
                            {"price: " + price + "$"}
                        </Text>
                    </View>
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
    titleContainer: {
        height:height/13,
        alignItems:'center',
        justifyContent:'space-around'
    },
    title: {
        fontSize: 25,
        fontWeight: "bold"
    },
    price: {
        fontSize: 25,
    },
    mainContainer: {
        minHeight: height/2.8,
        justifyContent: "space-around",
        alignItems: "center"
    },
    image: {
        width: width/1.1,
        minHeight: height/4,
    },
    dataContainer: {
        minHeight: height/3,
        flexDirection: "column",
        padding: 20
    }
};