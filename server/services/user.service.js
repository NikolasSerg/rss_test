const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('../services/mail.service')
const tokenService = require('./token.service')
const UserDTO = require('../dto/userDTO')
const ApiError = require('../exceptions/api.error')

class UserService {
    async registration(email, password) {
        const foundUser = await userModel.findOne({email})
        if (foundUser) {
            throw ApiError.BadRequest(`The User with the same email - ${email} exists.`)
        }
        const salt = bcrypt.genSaltSync(5);
        const hashPassword = await bcrypt.hash(password, salt)
        const activationLink = uuid.v4()

        const user = await userModel.create({ email, password: hashPassword, activationLink })
        await mailService.sendActivationMail(email, `${process.env.API_URI}/api/activate/${activationLink}`)

        const userDto = new UserDTO(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return ({...tokens, user: userDto})
    }

    async activate(activationLink) {
        const user = await userModel.findOne({ activationLink })
        if (!user) {
            throw ApiError.BadRequest('Not correct the link for activation.')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await userModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest('The User with such email not found')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('The Password is invalid')
        }
        const userDto = new UserDTO(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return ({...tokens, user: userDto})
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnathorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnathorizedError()
        }
        const user = await userModel.findById(userData.id)
        const userDto = new UserDTO(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return ({...tokens, user: userDto})
    }

    async getAllUsers() {
        const users = await userModel.find()
        return users
    }
}

module.exports = new UserService()