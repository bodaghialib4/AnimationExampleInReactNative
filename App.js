/**
 * Sample React Native App to learn animation
 */

import React, {Component} from 'react';
import {
  View,
  StatusBar,
} from 'react-native';
import CardList from "./src/components/CardList";
import Header from "./src/components/Header";
import AnimatedModal from "./src/components/AnimatedModal";
import BigCard from './src/components/BigCard'
import car from "./src/data/cars"

export default class App extends Component<{}> {

    state = {
        isModalVisible: false
    };

    constructor(props) {
        super(props);
        this.car_quality = [];
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
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>

                <Header title={"Car Gallery"}/>
                <CardList
                    data={car}
                    cardAction={this.cardAction}
                    viewAction={this.viewAction}
                    bookmarkAction={this.bookmarkAction}
                    shareAction={this.shareAction}
                />
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