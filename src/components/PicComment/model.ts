export interface Page {
    readonly current_page: number;
    readonly total_comments: number;
    readonly page_count: number;
    readonly count: number;
    readonly comments: Array<Comment>;
}

export interface Comment {
    readonly comment_ID: String;
    readonly comment_post_ID: String;
    readonly comment_author: String;
    readonly comment_author_url: String;
    readonly comment_author_IP: String;
    readonly comment_date: Date;
    readonly comment_date_gmt: Date;
    readonly comment_content: String;
    readonly comment_karma: String;
    readonly comment_approved: 1;
    readonly comment_agent: String;
    readonly comment_type: String;
    readonly comment_parent: String;
    readonly user_id: String;
    readonly comment_subscribe: String;
    readonly comment_reply_ID: String;
    readonly vote_positive: number;
    readonly vote_negative: number;
    readonly vote_ip_pool: String;
    readonly text_content: String;
    readonly pics: Array<String>;
    readonly videos: Array<String>
}

function page(count: number = 1): Promise<Page> {
    return fetch(`https://jandan.net/?oxwlxojflwblxbsapi=jandan.get_pic_comments&page=${count}`).then(body => body.json() as Promise<Page>).catch(console.log);
}

export class PageContainer {
    private pages: Array<Page> = [];
    onPageRefreshed: (_: PageContainer, __: "head" | "tail") => void = function (_, __) {};
    private headRequest: Promise<any> | null = null;
    private tailRequest: Promise<any> | null = null;
    constructor(onPageRefreshed: (_: PageContainer, __: "head" | "tail") => void) {
        this.onPageRefreshed = onPageRefreshed;
    }
    private headPageNumber(): number {
        if (this.pages.length == 0) { return 1; }
        let beforeHead = this.pages[0].current_page - 1;
        if (beforeHead > 0) { return beforeHead; }
        return 1;
    }
    private tailPageNumber(): number | null {
        if (this.pages.length == 0) { return 1 }
        let { current_page, page_count } = this.pages[this.pages.length - 1];
        if (current_page == page_count) return null;
        return current_page + 1;
    }
    comments(): Array<Comment> {
        return this.pages.map(page => page.comments).reduce((a, b) => [...a, ...b])
    }
    requestHead(): boolean {
        if (null != this.headRequest) { return false; }
        this.headRequest = page(this.headPageNumber())
        .then(page => {
            console.log(`head = ${page}`)
            this.pages = [page];
            this.onPageRefreshed(this, "head");
            this.headRequest = null;
        })
        .catch(console.log);
        return true;
    }
    requestTail(): boolean {
        if (null != this.tailRequest) { return false; }
        let tailPageNumber = this.tailPageNumber();
        if (null == tailPageNumber) { return false; }
        this.tailRequest = page(tailPageNumber)
            .then(page => {
                this.pages.push(page);
                this.onPageRefreshed(this, "tail");
                this.tailRequest = null;
            })
        return true;
    }
}
