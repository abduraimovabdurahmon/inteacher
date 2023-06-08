const registerValidate = (req, res, next) => {
  const { name, email, password } = req.body;

  const nameRegex = /^[a-zA-Z\s]*$/g;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;

  if (!nameRegex.test(name)) {
    return res.render("pages/auth", {
      errmsg: "Iltimos ismingizni to'g'ri kiriting!",
      register: true,
    });
  }

  if (!emailRegex.test(email)) {
    return res.render("pages/auth", {
      errmsg: "Iltimos emailni to'g'ri kiriting!",
      register: true,
    });
  }

  if (!passwordRegex.test(password)) {
    return res.render("pages/auth", {
      errmsg:
        "Parol kamida 8 ta belgidan iborat bo'lishi kerak va kamida 1 ta raqam va 1 ta harf bo'lishi kerak!",
      register: true,
    });
  }

  next();
};

module.exports = {
  registerValidate,
};
