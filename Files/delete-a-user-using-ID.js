app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({
    msg: "User deleted",
  });
});
