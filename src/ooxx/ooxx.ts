class OOXXPage {
    public readonly current_page: Number
    public readonly page_count: Number
    public readonly total_comments: Number
}

class OOXXComment {

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