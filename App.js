/**
 * Sample React Native App to learn animation
 */

import React, {Component} from 'react';
import {
    View,
    StatusBar,
    Platform,
    Animated
} from 'react-native';
import CardList from "./src/components/CardList";
import Header from "./src/components/Header";
import AnimatedModal from "./src/components/AnimatedModal";
import BigCard from './src/components/BigCard'
import car from "./src/data/cars"
import {HEADER_MAX_HEIGHT} from "./src/settings/layout"
import AnimatedHeader from "./src/components/AnimatedHeader";

export default class App extends Component<{}> {

    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false
        };

        this.car_quality = [];

        this.nativeScrollY = new Animated.Value(
            Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
        );
    }

    cardAction = () => {
        console.log("cardAction called.");
    };

    viewAction = (name, price, image, quality) => {
        this.car_quality = [];
        quality.forEach(item => {
            this.car_quality.push({
                label: item.name,
                value: item.rating
            });
        });

        this.setState({
            name,
            price,
            image,
            quality: this.car_quality,
            isModalVisible: true
        });
    };

    bookmarkAction = () => {
    };

    shareAction = () => {
    };


    render() {
        let nativeScrollY = Animated.add(
            this.nativeScrollY,
            Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
        );

        return (
            <View style={styles.container}>
                <StatusBar hidden={true} barStyle="light-content"/>

                <AnimatedHeader
                    title={"Car Gallery"}
                    nativeScrollY={nativeScrollY}
                />
                {this.nativeScrollY && (
                    <CardList
                        data={car}
                        cardAction={this.cardAction}
                        viewAction={this.viewAction}
                        bookmarkAction={this.bookmarkAction}
                        shareAction={this.shareAction}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {y: this.nativeScrollY}}}],
                            {useNativeDriver: true})}
                    />
                )}
                <AnimatedModal
                    title={"View Car Info"}
                    visible={this.state.isModalVisible}
                    onClose={() => {
                        this.setState({
                            isModalVisible: false
                        });
                    }}
                >
                    <BigCard
                        title={this.state.name}
                        price={this.state.price}
                        image={this.state.image}
                        data={this.state.quality}
                    />
                </AnimatedModal>

            </View>
        );
    }

}

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
};