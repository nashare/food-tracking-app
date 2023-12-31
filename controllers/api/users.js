const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

module.exports = {
  create,
  login,
  checkToken, 
  update,
  get
};

async function create(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json(token);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
}

async function get(req, res) {
  try{
    const userId = req.params.userId;
    const user = await User.find({ id: userId });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      error: 'An error occurred while fetching user'
    })
  }
}

async function login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      res.json( createJWT(user) );
    } catch {
      res.status(400).json('Bad Credentials');
    }
}

async function update(req, res) {
  try {
    console.log('here', req);
    const { caloriesPerDay } = req.body;
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { caloriesPerDay },
      { new: true }
    );
    console.log("user", updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json(updatedUser);
  } catch (error) {
    console.log('error');
    return res.status(500).json({ error: 'An error occurred while updating caloriesPerDay' });
  }
}

function createJWT(user) {
    return jwt.sign({ user }, process.env.SECRET, {expiresIn: '24h'});
}

function checkToken(req, res) {
    res.json(req.exp);
}