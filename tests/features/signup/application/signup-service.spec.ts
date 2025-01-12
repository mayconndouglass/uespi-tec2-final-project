import { SignupService } from '../../../../src/features/signup/application/services/signup-service'
import { UserAccount } from '../../../../src/features/signup/domain/user-account'

describe('SignupService', () => {
  let sut: SignupService
  let user: SignupService.input

  beforeAll(() => {
    user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678900',
      isPassenger: true,
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
    expect(responseData.id).toBeDefined()
    expect(typeof responseData.id).toBe('string')
    expect(responseData).toEqual({
      id: responseData.id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678900',
      isPassenger: true,
      isDriver: false,
    })
  })

  
  it('should throw an error if no car plate is provided for a driver', async () => {
    user.isDriver = true

    expect(() => sut.execute(user)).rejects.toThrow()
  })
})
