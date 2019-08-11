'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const InvalidFilterJsonException = use('App/Exceptions/InvalidFilterJsonException')

/**
 * Resourceful controller for interacting with basehttps
 */
class BaseController {
  
  constructor(){

    this.model
    this.allowedWiths
    this.request
    this.response

    this.addWheres = function ($query) {
      let req = this.request.input('filters', '{}')
      
      try{

        let filters = JSON.parse(req)

      } catch (error) {

        throw new InvalidFilterJsonException()

      }

      filters.forEach(($value, $key) => {
        //If non equality operator
        if (Array.isArray($value)) {
          $value.foreach(($valueToOperate, $operator)=> {
            switch ($operator) {
              case 'lte':
                $query = $query.where($key, '<=', $valueToOperate);
                break;
              case 'lt':
                $query = $query.where($key, '<', $valueToOperate);
                break;
              case 'gte':
                $query = $query.where($key, '>=', $valueToOperate);
                break;
              case 'gt':
                $query = $query.where($key, '>', $valueToOperate);
                break;
              case 'startsWith':
                $query = $query.where($key, 'like', "{$valueToOperate}%");
                break;
              case 'endsWith':
                $query = $query.where($key, 'like', "%{$valueToOperate}");
                break;
              case 'between':
                if (is_array($valueToOperate))
                  $query = $query.whereBetween($key, $valueToOperate);
                break;
              case 'in':
                if (is_array($valueToOperate))
                  $query = $query.whereIn($key, $valueToOperate);
                break;
            }
          })
        } else {
          $query = $query.where($key, $value);
        }

      })

      return $query
    }

    this.addWiths = function ($query,$relations){
      $relations.forEach(relation=>{ $query.with(relation)})
      return $query
    }

    this.getwiths = function () {
      let req = this.request.input('attributes', '').split(",")
      let res = req.filter(value => -1 !== this.allowedWiths.indexOf(value))
      return res
    }
  }

  

  async validattions(){
    return {}
  }

  async addWheres($query) {
    
  }


  /**
   * Show a list of all basehttps.
   * GET basehttps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    this.request = request
    this.response = response

    let query = this.model.query()
    query = this.addWiths(query, this.getwiths())
    query = this.addWheres(query)
    let res = await query.fetch()
    // let res = await query.fetch()

    return response.json(res)

  }

  /**
   * Render a form to be used for creating a new basehttp.
   * GET basehttps/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new basehttp.
   * POST basehttps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

    const bookInfo = request.only(['title', 'isbn', 'publisher_name', 'author_name'])

    const data = new this.model()

    book.title = bookInfo.title
    book.isbn = bookInfo.isbn
    book.publisher_name = bookInfo.publisher_name
    book.author_name = bookInfo.author_name

    await book.save()

    return response.status(201).json(book)

  }

  /**
   * Display a single basehttp.
   * GET basehttps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const res = await this.model.find(params.id)

    return response.json(res)

  }

  /**
   * Render a form to update an existing basehttp.
   * GET basehttps/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update basehttp details.
   * PUT or PATCH basehttps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a basehttp with id.
   * DELETE basehttps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = BaseController
