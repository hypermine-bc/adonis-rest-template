'use strict'
const BaseController = use('App/Controllers/Http/BaseController')
const UserValidations = use('App/Validators/AuthRegister')
const User = use('App/Models/User');

class UserController extends BaseController {

    constructor() {

        super();
        
        this.model = User

        this.allowedWiths = [
            'posts',
            'tokens'
        ]

        this.updatable = [
            'username',
            'email',
            'password'
        ]

        this.searchable = [
            'username',
            'email',
            'id'
        ]

        this.getValidators = function () {
            return new UserValidations()
            // return validations.rules
        }
    }
}

module.exports = UserController
