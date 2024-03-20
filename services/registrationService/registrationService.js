const UserSchema = require("../../models/userModel");
// доделать функционал регистрации нового пользователя
class RegistrationService {
  async findOrCreateUser({ userName, firstName, lastName, userTall }) {
    const candidate = await UserSchema.findOne({ userName });
    if (candidate) {
      return candidate;
    }
    if (
      typeof userName !== "string" ||
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof userTall !== "number"
    ) {
      return "Invalid data about user!";
    }

    const newUser = new UserSchema({ userName, firstName, lastName, userTall });
    await newUser.save();
  }
}

module.exports = new RegistrationService();
