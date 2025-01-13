import bcrypt from "bcrypt";
import { BcryptAdapter } from "../../../../src/features/signup/infra/bcrypt-adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hash"));
  },
}));

describe("BcryptAdapter", () => {
  it("should call bcrypt.hash() with correct parameters", async () => {
    const salt = 10;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("password");

    expect(hashSpy).toHaveBeenCalledWith("password", salt);
  });

  it("should returns a hash on success", async () => {
    const salt = 10;
    const sut = new BcryptAdapter(salt);
    const hash = await sut.encrypt("password");

    expect(hash).toBe("hash");
  });
});
