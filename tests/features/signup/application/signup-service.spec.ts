class SignupService {
  execute(input: SignupService.input): void { }
}

namespace SignupService {
  export type input = {
    name: string
    email: string
    cpf: string
    password: string
    isPassenger: boolean
    isDriver: boolean
    carPlate?: string
  }
  
  export type output = void
}

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
