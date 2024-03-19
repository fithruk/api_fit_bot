const userSchema = require("../../models/userModel");
// доделать функционал регистрации нового пользователя
class RegistrationService {
  async findOrCreateUser(userName) {
    const candidate = await userSchema.findOne({ userName });
    if (candidate) {
      return console.log(candidate);
    }
    console.log(`${userName} is not exist!`);
  }
}

module.exports = new RegistrationService();
