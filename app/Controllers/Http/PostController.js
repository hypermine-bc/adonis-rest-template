'use strict'
const BaseController = use('App/Controllers/Http/BaseController')
const Post = use('App/Models/Post');

class PostController extends BaseController{

    constructor(){
        this.model = Post
    }
}

module.exports = PostController
