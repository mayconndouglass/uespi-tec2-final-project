import { UserAccount } from '../../../../src/features/signup/domain/user-account'

describe('UserAccount', () => {
  it('should create a new UserAccount instance', () => {
    const sut = new UserAccount(
      '1234567890',
      'John Doe',
      'john.doe@example.com',
      '12345678900',
      true,
      false,
      'ABC123'
    )

    expect(sut.id).toBe('1234567890')
    expect(sut.name).toBe('John Doe')
    expect(sut.email).toBe('john.doe@example.com')
    expect(sut.cpf).toBe('12345678900')
    expect(sut.isPassenger).toBe(true)
    expect(sut.isDriver).toBe(false)
    expect(sut.carPlate).toBe('ABC123')
  })
})
