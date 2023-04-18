import bcrypt from "bcrypt";
const saltRounds = 8;

const bcryptGenSalt = () => {
  return bcrypt.genSalt(saltRounds);
};

const bcryptHash = (plainPassword: string, salt: string) => {
  return bcrypt.hash(plainPassword, salt);
};

const bcryptCheck = (plainPassword: string, hashPassword: string) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};

export { bcryptCheck, bcryptHash, bcryptGenSalt };
