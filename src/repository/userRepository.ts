import User from "../models/User";

const UserRepository = {
  createUser: async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    phone_number: string
  ) => {
    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      phone_number,
    });

    return user;
  },

  getUserById: async (id: string) => {
    const user = await User.findById( id );

    return user;
  },

  getUserByEmail: async (email: string) => {
    const user = await User.findOne({ email });

    return user;
  },
  getUserBynumber: async (phone_number: string) => {
    const user = await User.findOne({ phone_number });

    return user;
  },
};

export default UserRepository;
