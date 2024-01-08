app.get("/", async (req, res) => {
  const allUser = await User.find({});
  res.status(200).json({ allUser });
});
