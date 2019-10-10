'use strict'

require('../models/user.model')
const md5 = require('md5')
const validation = require('../bin/helpers/validation')
const repository = require('../repositories/user.repository')

const controllerBase = require('../bin/base/controller.base')
const _repo = new repository

class userController {
    constructor() {}

      async post (req, resp, next) {
        let _validation = new validation
        _validation.isRequired(req.body.name, 'Informe o nome')
        _validation.isRequired(req.body.password, 'Informe a senha')
        _validation.isRequired(req.body.confirmedPassword, 'Confirme a senha')
        _validation.isTrue(req.body.password === req.body.confirmedPassword, "As senhas informadas não são iguais")
        _validation.isRequired(req.body.email, 'Informe o email')
        _validation.isEmail(req.body.email, 'O email inserido é inválido')
        _validation.isRequired(req.body.department, 'informe o departamento')
        _validation.isRequired(req.body.phone, 'Informe o Telefone')
        _validation.isRequired(req.body.status, 'Informe o status')
        _validation.isRequired(req.body.category, 'Informe a categoria')

        let userEmailExist = await _repo.isUserEmailExist(req.body.email)
        if(userEmailExist){
          _validation.isTrue((userEmailExist.name != undefined), `Já existe o email ${req.body.email} cadastrado!`)
        }

        if (req.body.password) {
          req.body.password = md5(req.body.password)
        }        

        let _controllerBase = new controllerBase(_repo, _validation)
        _controllerBase.post(req, resp)
      }

      async put (req, resp, next) {
        let _validation = new validation
        _validation.isRequired(req.body.name, 'O campo nome é obrigatório')
        _validation.isRequired(req.body.email, 'O campo email é obrigatório')
        _validation.isEmail(req.body.email, 'O email inserido é inválido')
        _validation.isRequired(req.body.department, 'O campo departament é obrigatório')
        _validation.isRequired(req.body.phone, 'O campo Phone é obrigatório')
        _validation.isRequired(req.body.status, 'O campo status é obrigatório')
        _validation.isRequired(req.body.category, 'O campo category é obrigatório')
        _validation.isRequired(req.params.id, 'Informe o ID do usuário que será editado')
        console.log('validacao está okay')        

        let userEmailExist = await _repo.isUserEmailExist(req.body.email)
        console.log('validacao de email okay')        
        if(userEmailExist){
          _validation.isTrue(
            (userEmailExist.name != undefined) &&
            (userEmailExist._id =! req.params.id), 
            `Já existe o email ${req.body.email} cadastrado!`)
        }

        let _controllerBase = new controllerBase(_repo, _validation)
        _controllerBase.put(req, resp)
        console.log('atualizado!')        
      }

      async get (req, resp, next) {
        let _controllerBase = new controllerBase(_repo)
        _controllerBase.getAll(req, resp)
      }
      async getById (req, resp, next) {
        let _controllerBase = new controllerBase(_repo)
        _controllerBase.getById(req, resp)
      }
      async delete (req, resp, next) {
        let _controllerBase = new controllerBase(_repo)
        _controllerBase.delete(req, resp)
      }       
}

module.exports = userController