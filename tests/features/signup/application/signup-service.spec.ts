import { CarPlateIsRequiredError } from '../../../../src/features/signup/application/errors/car-plate-is-required-error'
import { PassengerShouldNotHaveCarPlateError } from '../../../../src/features/signup/application/errors/passenger-should-not-have-car-plate-error'
import { SignupService } from '../../../../src/features/signup/application/services/signup-service'
import { UserAccount } from '../../../../src/features/signup/domain/entities/user-account'

describe('SignupService', () => {
  let sut: SignupService
  let user: SignupService.input

  beforeAll(() => {
    user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678900',
      isDriver: false,
      password: 'password'
    }
  })

  beforeEach(() => {
    sut = new SignupService()
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
})
