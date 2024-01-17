app.get("/users", async (req, res) => {
  const alDBuser = await User.find({});
  const html = `<ul>
   ${alDBuser
     .map((user) => `<li> ${user.firstName} - ${user.email}</li>`)
     .join("")}
  
  </ul>`;
  res.send(html);
});
