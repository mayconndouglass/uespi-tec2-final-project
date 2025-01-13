import bcrypt from "bcrypt";

describe("BcryptAdapter", () => {
  it.only("should call bcrypt.hash() with correct parameters", async () => {
    const salt = 10;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("password");

    expect(hashSpy).toHaveBeenCalledWith("password", salt);
  });
});
