exports.getCookies = (req, res) => {
  return res.json({ cookies: req.cookies, signedCookies: req.signedCookies });
};

exports.setCookies = (req, res) => {
  const body = req.body;
  console.log(body);

  return res
    .cookie(
      "cookieUser",
      { userEmail: `${body.email}` },
      { maxAge: 20000, signed: true }
    )
    .send();
};

exports.deleteCookies = (req, res) => {
  const cookie = req.cookies;
  return res.clearCookie("cookieUser").send(cookie);
};
