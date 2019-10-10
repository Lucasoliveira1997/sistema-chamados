'use strict'

require('../models/user.model')
const Base = require('../bin/base/repository.base')
const md5 = require('md5')

class UserRepository {
    constructor() {
        this._base = new Base('user')
        this._projection = 'name email _id'
    }

    async isUserEmailExist(Email) {
        return await this._base._model.findOne({email: Email}, this._projection)
    }

    async authenticate(Email, Password) {
        let _hashPassword = md5(Password)
        return await this._base._model.findOne({email: Email, password: _hashPassword}, this._projection)
    }

    async create(data){
        let createdUser = await this._base.create(data)        
        return this._base._model.findById(createdUser._id, this._projection)
    }

    async update(id, data) {
        let updatedUser = await this._base.update(id, {
            name: data.name,
            email: data.email,
            department: data.department,
            phone: data.phone,
            status: data.status,
            category: data.category
        })
        return this._base._model.findById(updatedUser.id, this._projection)
    }

    async getAll() {
        return await this._base.getAll()      
    }

    async getById(id) {
        return await this._base.getById(id)
    }

    async delete(id) {
        return await this._base.delete(id)
    }
}

module.exports = UserRepository