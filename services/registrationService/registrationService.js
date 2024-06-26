const UserSchema = require("../../models/userModel");
const apiResponceObj = require("../../apiRespStatuses/apiRespStatuses");

class RegistrationService {
  async findUSer(userName) {
    try {
      const candidate = await UserSchema.findOne({ userName });

      if (candidate) {
        return candidate;
      } else {
        return apiResponceObj.userDoesNoteExist;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async createNewUser({ userName, firstName, lastName, email, phone }) {
    const newUser = new UserSchema({
      userName,
      firstName,
      lastName,
      email,
      phone,
    });
    await newUser.save();
    return apiResponceObj.userSuccesfullyCreated;
  }
}

module.exports = new RegistrationService();
