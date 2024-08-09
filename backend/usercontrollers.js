const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
            if (existingUser) {
                  return res.status(400).json({ message: 'User already exists' });
                      }

                          const hashedPassword = await bcrypt.hash(password, 10);
                              const user = new User({ email, password: hashedPassword });

                                  await user.save();
                                      res.status(201).json({ message: 'User registered successfully' });
                                        } catch (error) {
                                            res.status(500).json({ message: 'Server error' });
                                              }
                                              };

                                              const loginUser = async (req, res) => {
                                                const { email, password } = req.body;

                                                  try {
                                                      const user = await User.findOne({ email });
                                                          if (!user) {
                                                                return res.status(400).json({ message: 'Invalid credentials' });
                                                                    }

                                                                        const isMatch = await bcrypt.compare(password, user.password);
                                                                            if (!isMatch) {
                                                                                  return res.status(400).json({ message: 'Invalid credentials' });
                                                                                      }

                                                                                          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                                                                                              res.json({ token });
                                                                                                } catch (error) {
                                                                                                    res.status(500).json({ message: 'Server error' });
                                                                                                      }
                                                                                                      };

                                                                                                      const checkAttempts = async (req, res) => {
                                                                                                        const { email } = req.params;

                                                                                                          try {
                                                                                                              const user = await User.findOne({ email });
                                                                                                                  if (!user) {
                                                                                                                        return res.status(404).json({ message: 'User not found' });
                                                                                                                            }

                                                                                                                                const now = new Date();
                                                                                                                                    if (user.lastAttempt) {
                                                                                                                                          const lastAttemptDate = new Date(user.lastAttempt);
                                                                                                                                                const daysSinceLastAttempt = (now - lastAttemptDate) / (1000 * 60 * 60 * 24);
                                                                                                                                                      if (daysSinceLastAttempt > 15) {
                                                                                                                                                              user.attempts = 0;  // Reset attempts after 15 days
                                                                                                                                                                    }
                                                                                                                                                                        }

                                                                                                                                                                            if (user.attempts >= 3) {
                                                                                                                                                                                  return res.json({ isAllowed: false });
                                                                                                                                                                                      } else {
                                                                                                                                                                                            return res.json({ isAllowed: true });
                                                                                                                                                                                                }
                                                                                                                                                                                                  } catch (error) {
                                                                                                                                                                                                      res.status(500).json({ message: 'Server error' });
                                                                                                                                                                                                        }
                                                                                                                                                                                                        };

                                                                                                                                                                                                        const recordAttempt = async (req, res) => {
                                                                                                                                                                                                          const { email } = req.body;

                                                                                                                                                                                                            try {
                                                                                                                                                                                                                const user = await User.findOne({ email });
                                                                                                                                                                                                                    if (!user) {
                                                                                                                                                                                                                          return res.status(404).json({ message: 'User not found' });
                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                  user.attempts += 1;
                                                                                                                                                                                                                                      user.lastAttempt = new Date();
                                                                                                                                                                                                                                          await user.save();

                                                                                                                                                                                                                                              res.json({ message: 'Attempt recorded' });
                                                                                                                                                                                                                                                } catch (error) {
                                                                                                                                                                                                                                                    res.status(500).json({ message: 'Server error' });
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                      };

                                                                                                                                                                                                                                                      module.exports = { registerUser, loginUser, checkAttempts, recordAttempt };