import React from "react";
import {ScrollView,View,FlatList,Dimensions} from "react-native";
import Card from "./Card"

let {width,height} = Dimensions.get('window');
if( width > height ) {
    let temp=width;
    width=height;
    height=temp;
}

const CardList = ({
    data,
    cardAction,
    viewAction,
    bookmarkAction,
    shareAction
})=> {
    return (
        <ScrollView style={{height: height / 1.1}}>
            <View style={{alignItems: "center"}}>
                <FlatList
                    data={data}
                    keyExtractor={item => `${item.id}`}
                    numColumns={1}
                    renderItem={({item}) => (
                        <Card
                            item={item}
                            cardAction={cardAction}
                            viewAction={viewAction}
                            bookmarkAction={bookmarkAction}
                            shareAction={shareAction}
                        />
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default CardList;

