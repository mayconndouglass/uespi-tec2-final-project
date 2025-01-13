import bcrypt from 'bcrypt'
import { Encrypter } from "../application/contracts/encrypter"

export class BcryptAdapter implements Encrypter {
  private readonly salt: number
  
  constructor(salt: number) {
    this.salt = salt
  }

  async encrypt(value: string): Promise<string> {
    bcrypt.hash(value, 10)
    
    return ''
  }
}
