import React, { Component } from "react";
import { View, Text } from "react-native";
import { OOXXPage, OOXXComment } from "ooxx/ooxx"

// See src/declarations.d.ts
import Button from "react-native-button";

interface Props {
    max: number;
    message?: string | number;
    alert?: string | number;
    style: React.ViewStyle;
}

interface State {
    counter: number;
}

export default class HelloWorld extends Component<Props, State> {
    static defaultProps = {
        message: "Press here",
        alert: "Hello world!",
    };

    state = {
        counter: 0,
    };

    onPress = () => {
        fetch('https://jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments&page=1')
        .then(response => response.json() as Promise<OOXXPage>)
        .then((data) => console.log(`pageCount = ${data.page_count}`))
        .catch(() => this.setState({ counter: 0}));
        console.log("on press");
        const counter = this.state.counter + 1;
        if (counter < this.props.max) {
            return this.setState({ counter });
        }
        // Alert after re-rendering
        return this.setState({ counter: 0 }, () => alert(this.props.alert));
    }

    render() {
        const { message } = this.props;
        const { counter } = this.state;

        return (
            <View style={this.props.style}>
                <Button onPress={this.onPress}>
                    {message} ({counter})
                </Button>
            </View>
        );
    }
}
