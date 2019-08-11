'use strict'
const User = use('App/Models/User');

const cloneAndPluck = function (sourceObject, keys) {
    const newObject = {};
    keys.forEach((obj, key) => { newObject[obj] = sourceObject[obj]; });
    return newObject;
};

class AuthController {
   
    constructor(){
        /**
         * Allowed properties from user obejct,
         *  to see the outside world
         */
        this.allowed = ['username', 'id','token','email']
    }
    /**
     * Register a user
     * @param {request} param0 
     */
    async register({ request, auth, response }) {

        let user = await User.create(request.all())

        //generate token for user;
        let token = await auth.generate(user)

        Object.assign(user, token)

        let res = cloneAndPluck(user, this.allowed);

        return response.json(res)
    }

    /**
     * Login by passing 
     * Useremail and Password
     * @param {request} param0 
     */
    async login({ request, auth, response }) {

        let { email, password } = request.all();

        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email)
                let token = await auth.generate(user)

                Object.assign(user, token)
                // console.log(this.allowed);die;
                let res = cloneAndPluck(user, this.allowed);
                return response.json(res)
            }


        }
        catch (e) {
            console.log(e)
            return response.json({ message: 'You are not registered!' })
        }
    }
}

module.exports = AuthController
