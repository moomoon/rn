import React, { Component } from "react";
import { View, Text, Image,ImageURISource, ListView } from "react-native";
import {ImageViewer} from 'react-native-image-fit';


namespace OOXX {

    export class Page {
        public readonly current_page: Number
        public readonly page_count: Number
        public readonly total_comments: Number
        public readonly comments: Array<Comment>
    }

    export class Comment {

        public readonly comment_ID: String


        public readonly comment_agent: String

        public readonly comment_approved: String

        public readonly comment_author: String


        public readonly comment_author_IP: String
        public readonly comment_author_email: String
        public readonly comment_author_url: String
        public readonly comment_content: String
        public readonly comment_date: Date
        public readonly comment_date_gmt: Date
        public readonly comment_karma: String
        public readonly comment_parent: String
        public readonly comment_post_ID: String
        public readonly comment_reply_ID: String
        public readonly comment_subscribe: String
        public readonly comment_type: String
        public readonly pics: Array<String>
        public readonly text_content: String
        public readonly user_id: String
        public readonly videos: Array<String>
        public readonly vote_ip_pool: String
        public readonly vote_negative: Number
        public readonly vote_positive: Number
    }

    interface Props {
        // max: number;
        // message?: string | number;
        // alert?: string | number;
        // style: React.ViewStyle;
    }

    interface State {
        page?: Page
    }

    export class List extends Component<Props, State> {
        ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
        constructor() {
            super();
            this.setState({ page: null });
            fetch('https://jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments&page=1')
                .then(response => response.json() as Promise<Page>)
                .then((data) => {
                    console.log();
                    return this.setState({ page: data as Page });
                }
                );
        }
        componentWillUnmount() {

        }

        render() {
            console.log(this.state);
            return (
                <ListView
                    dataSource={this.state && this.state.page && this.ds.cloneWithRows(this.state.page.comments) || this.ds}
                    renderRow={(comment : Comment) => {
                    console.log(comment.pics[0]);
                    return (<ImageViewer source={{ uri: comment.pics[0].replace("http", "https") } as ImageURISource}
                                        mainImageProps={{ resizeMode: 'contain' }}
                                        zoomedImageProps={{ resizeMode: 'contain' }}/>);
                }}/>
            );
        }
    }


}
export default OOXX;