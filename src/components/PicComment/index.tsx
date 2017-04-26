import React, {Component} from "react";
import {View, Text, Image, ImageURISource, ListView, StyleSheet} from "react-native";
import {Comment, PageContainer} from './model'
import {ImageViewer} from 'react-native-image-fit';

interface Props {}

interface State {
    comments : Array<Comment>
}

export class List extends Component<Props, State> {
    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    container = new PageContainer(container => {
        console.log(container.comments());
        this.setState({ comments: container.comments() });
    });
    constructor() {
        super();
        this.state = { comments: [] };
        this.container.requestHead()
    }

    renderRow(comment: Comment) {
        console.log(comment.pics[0]);
        /*return (<View style={styles.container}> {
            comment.pics.map(url => */
            let url = comment.pics[0];
        
            return <ImageViewer 
                                        key={url}
                                        style={styles.image}
                                        source={{ uri: url.replace("http", "https") } as ImageURISource}
                                        mainImageProps={{ resizeMode: 'contain' }}
                                        zoomedImageProps={{ resizeMode: 'contain' }}/>;
        //     }
        // </View>)
    }
    render() {
        return <ListView 
                    style={styles.list}
                    dataSource={this.ds.cloneWithRows(this.state.comments)}
                    renderRow={this.renderRow}/>
    }
}

const styles = StyleSheet.create({
    list: {
        width: 200,
        backgroundColor: "#FF0000",
    } as React.ScrollViewStyle,

    container: {
        width: 50,
        height: 100,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F500FF",
    } as React.ViewStyle,

    image: {
        margin: 10,
    } as React.ViewStyle,
});
