import bcrypt from "bcryptjs";

export const encryptPassword = async (password) => {
  try {
    if (!password) {
      throw new erro("Password is undefined");
    }

    const passwordBash = await bcrypt.hash(password, 10);
    return passwordBash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
};

export const verified = async (pass, secondpass) => {
  const isMatch = await bcrypt.compare(pass, secondpass);
  return isMatch;
};
