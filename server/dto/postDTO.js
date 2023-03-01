module.exports = class PostDto {
    guid;
    creator;
    title;
    link;
    pubDate;
    content;
    contentSnippet;
    constructor(model) {
        this.guid = model.guid;
        this.creator = model.creator;
        this.title = model.title;
        this.link = model.link;
        this.pubDate = model.pubDate;
        this.content = model.content;
        this.contentSnippet = model.contentSnippet;
    }
}