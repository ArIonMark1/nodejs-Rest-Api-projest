const { UserModel } = require("./models/authSchema");

const register = async (data) => {
  const user = new UserModel(data);
  await user.save();

  return user;
};

/* 
// routes ****************************************************************
routes.post('/register', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await usersService.register(body);

    if (user) {
      res.cookie('jwt', user.token, { secure: true });

      return res.json({
        message: 'User created successfully!',
        data: user,
      });
    }

    return res.status(400).json({ message: 'User created failed!' });
  } catch (err) {
    next(err);
  }
});

// services ********************************
const register = async (data) => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await userRepository.create({ ...data, password: passwordHash });
  return user;
};

// db model actions *************************
const create = async (data) => {
  const user = new UserModel(data);
  await user.save();

  return user;
};
*/

module.exports = {
  register,
};
