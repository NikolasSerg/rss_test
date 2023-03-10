const userService = require('../services/user.service')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api.error')
const {json} = require("express");

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Error validation', errors.array()))
            }
            const { email, password } = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.status(200).json({status: 'success', data: userData})
        } catch(error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.status(200).json({status: 'success', data: userData})
        } catch(error) {
            next(error)
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.status(200).json({status: 'success', data: token})
        } catch(error) {
            next(error)
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.status(308).redirect(process.env.CLIENT_URI)
        } catch(error) {
            next(error)
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.status(200).json({status: 'success', data: userData})
        } catch(error) {
            next(error)
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.status(200).json({status: 'success', data: users})
        } catch(error) {

        }
    }
}

module.exports = new UserController()