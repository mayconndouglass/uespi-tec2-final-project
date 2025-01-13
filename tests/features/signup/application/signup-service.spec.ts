import { SignupService } from '../../../../src/features/signup/application/services/signup-service'
import { UserRepository } from '../../../../src/features/signup/application/contracts/user-repository'
import { UserAccount } from '../../../../src/features/signup/domain/entities/user-account'

import { mock,  MockProxy } from 'jest-mock-extended'

import { CarPlateIsRequiredError } from '../../../../src/features/signup/application/errors/car-plate-is-required-error'

import { EmailAlreadyExistsError } from '../../../../src/features/signup/application/errors/email-already-exists-error'
import {
  PassengerShouldNotHaveCarPlateError
} from '../../../../src/features/signup/application/errors/passenger-should-not-have-car-plate-error'

describe('SignupService', () => {
  let sut: SignupService
  let user: SignupService.input
  let userAccount: UserAccount
  let userRepository: MockProxy<UserRepository>

  beforeAll(() => {
    userAccount = mock<UserAccount>()
    userRepository = mock<UserRepository>()
  })

  beforeEach(() => {
    sut = new SignupService(userRepository)
    user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678900',
      isDriver: false,
      password: 'password'
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call SignupService.execute() with correct parameters', () => {
    const executeSpy = jest.spyOn(sut, 'execute')
    sut.execute(user)

    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith(user)
  })

  it('Should returns a UserAccount on successful signupService.execute()', async () => {
    const responseData: UserAccount = await sut.execute(user)

    expect(responseData).toBeInstanceOf(UserAccount)
    expect(responseData.props.id).toBeDefined()
    expect(typeof responseData.props.id).toBe('string')
    expect(responseData.props).toEqual({
      id: responseData.props.id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678900',
      isDriver: false,
    })
  })

  it('should throw an error if no car plate is provided for a driver', async () => {
    user.isDriver = true

    expect(() => sut.execute(user)).rejects.toThrow(CarPlateIsRequiredError)
  })

  it('should throw an error if a passenger has a car plate', async () => {
    user.isDriver = false
    user.carPlate = "ABC-123"

    expect(() => sut.execute(user)).rejects.toThrow(
      PassengerShouldNotHaveCarPlateError
    )
  })

  it('should call UserRepository.userByEmail() if the data passes the validations', async () => {
    await sut.execute(user)

    expect(userRepository.findUserByEmail).toHaveBeenCalledTimes(1)
    expect(userRepository.findUserByEmail).toHaveBeenCalledWith(user.email)
  })

  it('should throws EmailAlreadyExistsError if UserRepository.userByEmail() returns null', async () => {
    userRepository.findUserByEmail.mockResolvedValueOnce(userAccount)

    expect(() => sut.execute(user)).rejects.toThrow(EmailAlreadyExistsError)
  })
})
