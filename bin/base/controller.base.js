'use strict'

class controllerBase {
    constructor(repository, validationContract) {
        this._repo = repository,
        this._validationContract = validationContract
    }

    async post(req, resp) {
        try {
            let data = req.body
            if(!this._validationContract.isValid()) {
                resp.status(400).send({
                    message: "Dados inválidos na requisição",
                    validation: this._validationContract.errors()
                }).end()
                return
            }
            let resultado = await this._repo.create(data)
            resp.status(201).send(resultado)
        } catch (error) {
            resp.status(500).send({message: `erro no processamento`, erro: error})
            console.log(`Post com erro, motivos: ${error}`)       
        }
    }
    async put(req, resp) {
        try {   
            console.log('entrou no controller base')                     
            if(!this._validationContract.isValid()) {
                resp.status(400).send({
                    message: "Dados inválidos na requisição",
                    validation: this._validationContract.errors()
                }).end()
                return
            }
            console.log('update na controller')            
            let resultado = await this._repo.update(req.params.id, req.body)
            resp.status(202).send(resultado)
            console.log('update na controller foi feito')            
        } catch (error) {
            console.log(`Put com erro, motivos: ${error}`)            
            resp.status(500).send({message: `erro no processamento`, erro: error})
        }
    }
    async getAll(req, resp) {
        try {
            let data = await this._repo.getAll()
            resp.status(200).send(data)
        } catch (error) {
            console.log(`Get com erro, motivo: ${error}`)
            resp.status(500).send({message: `erro no processamento`, erro: error})
        }
    }
    async getById(req, resp) {
        try {
            let id = req.params.id
            if(id) {
                let data = await this._repo.getById(id)
                resp.status(200).send(data)
            } else {
                resp.status(400).send({message: "O parametro ID precisa ser informado"})
            }            
        } catch (error) {
            console.log(`GetById com erro, motivo: ${error}`)
            resp.status(500).send({message: `erro no processamento`, erro: error})
        }
    }
    async delete(req, resp) {
        try {
            let id = req.params.id
            if(id) {
                await this._repo.delete(id)
                resp.status(200).send("O registro foi excluído com sucesso")
            } else {
                resp.status(400).send({message: "O parametro ID precisa ser informado"})
            }            
        } catch (error) {
            console.log(`Delete com erro, motivo: ${error}`)
            resp.status(500).send({message: `erro no processamento`, erro: error})
        }
    }
}

module.exports = controllerBase