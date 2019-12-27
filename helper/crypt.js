import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashPassword = async password => {
  var hash = await bcrypt.hashSync(password, salt);
  return hash;
};

const hashCompare = async (password,hash) => {
  var hash = await bcrypt.compareSync(password, hash);
  return hash;
};


export  {hashPassword,hashCompare};
