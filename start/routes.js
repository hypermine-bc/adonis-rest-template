'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome to SuperBaseStack' }
})

/**
 * Routes grouped as API
 */
Route
  .group(() => {

    Route
      .post('authenticate', 'AuthController.login')
      .validator('AuthLogin')

    Route
      .post('register', 'AuthController.register')
      .validator('AuthRegister')

    Route.resource('posts', 'PostController')

    Route.resource('users', 'UserController')

  })
  .prefix('api/v1')

