'use strict'

class AuthRegister {

  /**
   * Rules for validating the inputs
   */
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      username: 'required|unique:users,username',
      password: 'required'
    }
  }

  /**
   * Request sanitisation goes here
   */
  get sanitizationRules() {
    // sanitize data before validation
  }

  get messages() {
    return {
      'username.unique': 'You must provide unique username',
      'username.required': 'You must provide username',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password'
    }
  }
  
}

module.exports = AuthRegister
