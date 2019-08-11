import React from "react";
import {TouchableWithoutFeedback,View,Image,Text,Dimensions} from "react-native";
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
    return (
        <TouchableWithoutFeedback
            onPress={cardAction}
        >
            <View style={styles.card}>
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
            </View>

        </TouchableWithoutFeedback>
    );
};

const styles = {
    card:{
        width: width/1.3,
        height: height/3.8,
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