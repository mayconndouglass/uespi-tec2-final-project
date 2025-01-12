import { SignupService } from '../../../../src/features/signup/application/services/signup-service'

describe('SignupService', () => {
  it('should call SignupService.execute() with correct parameters', () => {
    const sut = new SignupService()
    const user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      cpf: '12345678900',
      isPassenger: true,
      isDriver: false,
      password: 'password'
    }
    
    const executeSpy = jest.spyOn(sut, 'execute')
    sut.execute(user)

    expect(executeSpy).toHaveBeenCalledTimes(1)
    expect(executeSpy).toHaveBeenCalledWith(user)
  })
})
