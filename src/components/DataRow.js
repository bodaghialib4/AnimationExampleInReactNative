import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import AnimatedBar from './AnimatedBar'
let {width,height} = Dimensions.get('window');
if( width > height ) {
    let temp=width;
    width=height;
    height=temp;
}

const DataRow = ({label,value,index})=> {

    return (
        <View style={styles.statusRow}>
            <View style={styles.statusLabel}><Text>{label}</Text></View>
            <View style={styles.statusValue}><Text>{value}</Text></View>
            <View style={styles.statusBar}><AnimatedBar  value={value} index={index}/></View>
        </View>
    );
};

styles={
    statusRow:{
        marginTop: height/150,
        height: height/30,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
    },
    statusLabel:{
        flex: 3,
    },
    statusLabelText: {
        fontWeight: "bold",
        color: "#6e6e6e"
    },
    statusValue:{
        flex: 1
    },
    statusValueText: {
        color: "#404040"
    },
    statusBar: {
        flex: 5
    }
};


export default DataRow;