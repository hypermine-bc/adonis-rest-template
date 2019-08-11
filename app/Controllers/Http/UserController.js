'use strict'
const BaseController = use('App/Controllers/Http/BaseController')
const User = use('App/Models/User');

class UserController extends BaseController {

    constructor() {
        super();
        this.model = User
        this.allowedWiths = [
            'posts',
            'tokens'
        ]
    }
}

module.exports = UserController
