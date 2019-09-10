import React from "react";
import {
    ScrollView,
    View,
    FlatList,
    Dimensions,
    Animated,
    Platform
} from "react-native";
import Card from "./Card"
import {HEADER_MAX_HEIGHT} from "../settings/layout"

let {width, height} = Dimensions.get('window');
if (width > height) {
    let temp = width;
    width = height;
    height = temp;
}

const CardList = (
    {
        data,
        cardAction,
        viewAction,
        bookmarkAction,
        shareAction,
        onScroll
    }) => {

    return (
        <Animated.ScrollView
            style={styles.scroll}
            onScroll={onScroll}
            contentInset={{
                top: HEADER_MAX_HEIGHT
            }}
            contentOffset={{
                y: -HEADER_MAX_HEIGHT
            }}
        >
            <View style={styles.scroll_container}>
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
        </Animated.ScrollView>
    );
};

export default CardList;

const styles = {
    scroll: {
        flex: 1,
    },
    scroll_container: {
        alignItems: "center",
        paddingTop: Platform.OS === "android" ? HEADER_MAX_HEIGHT : 0
    }
};