'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const InvalidFilterJsonException = use('App/Exceptions/InvalidFilterJsonException')
const FilterParser = use('App/Helpers/FilterParser')
const { validate } = use('Validator')

/**
 * Resourceful controller for interacting with basehttps
 */
class BaseController {
  
  constructor(){

    this.model
    this.allowedWiths
    this.request
    this.response
    this.updatable

    this.addWheres = function ($query) {
      let req = this.request.input("filters", "[]")
      let filters = [];
      try{

        filters = JSON.parse(req)

      } catch (error) {

        throw new InvalidFilterJsonException()

      }

      let filter = new FilterParser()

      return filter.parse($query, filters)
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

    this.getValidator = function (){
    }

    this.preCreate = function (data) {
      
      return data 
      
    }
    this.postCreate = function (data) {}

    this.preUpdate = function (data) {
      
      return data 
      
    }
    this.postUpdate = function (data) {}
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

    return response.json(res)

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

    let rules = this.getValidators().rules;
    let messages = this.getValidators().messages;
    
    const validation = await validate(request.all(), rules, messages)
    
    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    let dataToCreate = request.only(Object.keys(rules));

    dataToCreate = this.preCreate(dataToCreate);

    let data = await this.model.create(dataToCreate);

    this.postCreate(data)

    return response.status(201).json(data)

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

    this.request = request
    this.response = response

    let query = this.model.query()

    query = this.addWiths(query, this.getwiths())

    query = query.where({ id: params.id})

    let res = await query.fetch()

    return response.json(res)

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
    const entity = await this.model.find(params.id)

    if (!entity) {
      return response.status(404).json({ data: 'Resource not found' })
    }
    let rules = this.getValidators().rules;
    let messages = this.getValidators().messages;

    const validation = await validate(request.all(), rules, messages)

    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }

    let dataToUpdate = request.only(Object.keys(rules))

    entity.merge(dataToUpdate)

    let data = await entity.save()

    this.postUpdate(data)

    return response.status(201).json(data)

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
