const UserSchema = require("../../models/userModel");
const apiResponceObj = require("../../apiRespStatuses/apiRespStatuses");

class RegistrationService {
  async findOrCreateUser({ userName, firstName, lastName, userTall }) {
    console.log(userName);
    const candidate = await UserSchema.findOne({ userName });
    if (candidate) {
      return candidate;
    }

    const newUser = new UserSchema({ userName, firstName, lastName, userTall });
    await newUser.save();
    return apiResponceObj.userSuccesfullyCreated;
  }
}

module.exports = new RegistrationService();
