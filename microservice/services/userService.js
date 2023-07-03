const UserModel = require('../models/userModel');

class UserService {
  async createUser(data) {
    try {
      const user = new UserModel(data);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  async getUser(id) {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, data) {
    try {
      return await UserModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();