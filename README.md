# Basestack for Adonis framework.

A basestack where lot of features will be handelled outof the box.
So even if you don't know adonis and quickly want resource endpoints, you can use this template.

# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds
5. Pagination
5. Resource


## Setup
Install `Adonis`

```bash
npm i -g @adonisjs/cli
```

Use the adonis command to install the blueprint

```bash
git clone https://github.com/hypermine-bc/adonis-rest-template.git
```

clone the repo and then run `npm install`.

```bash
adonis serve --dev
```


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Examples (for lazy developers)

#### Example User Controller

We are lazy developers Right! :stuck_out_tongue_winking_eye:

So lets make the controller as lean as possible :wink:

Pay attention to these variables, that are defined 

allowedWiths
updatable,
searchable

```
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

```

#### Search 

Yes! you got it right search is out of the box for every resource that extends baseController.

Ex 1 : Search for user contains vik

```
{{HYPERMINE_API_HOST}}/api/v1/users/?query=vik
```
Ex 2 : Search for user contains Vik with Posts and token
```
{{HYPERMINE_API_HOST}}/api/v1/users/?query=vik&attributes=posts,tokens
```
Look how easy it was right :wink:


#### Attributes
Lets say you want to get User with Posts and tokens

You can do request API like

```
{{HYPERMINE_API_HOST}}/api/v1/users/?attributes=posts,tokens
```

### Filters
Since we are very lazy and generally fitrers are complicated so.
This template add's it out-of-the-box.

Lets say you want to get users where username=vikram

```
{{HYPERMINE_API_HOST}}/api/v1/users/?filters=[{"username": "vikram"}]
```

Or perhaps you want to get vikram whoes id = 1

```
{{HYPERMINE_API_HOST}}/api/v1/users/?filters=[{"username":"vikram"},{"id": 1}]
```

### Attribute + Filters
Lets get one step further, lets say you want to get
Get user starts with `vi` and id=1 with posts and token

```
{{HYPERMINE_API_HOST}}/api/v1/users/?attributes=posts,tokens&filters=[{"username": [{"startsWith": "vi"}]},{"id": 1}]
```
Some more ;)

```
{{HYPERMINE_API_HOST}}/api/v1/users/?attributes=posts,tokens&filters=[{"username": [{"endsWith": "ide"}]}]
```