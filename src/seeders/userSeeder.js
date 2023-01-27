const userSeeder = {
  adminUser: {
    userId: 1,
    fullName: "Zeno of Citium",
    username: "zeno123",
    password: "123456",
    email: "zeno123@gmail.com",
    isAdmin: true,
    passwordConfirm: "123456",
  },
  nonAdminUser: {
    userId: 4,
    fullName: "Epitetus",
    username: "epitetus123",
    password: "abcdef",
    email: "epitetus@gmail.com",
    isAdmin: false,
    passwordConfirm: "abcdef",
  },
  signUp: {
    names: "Anathole K",
    password: "1234",
    email: "aimeanathole@gmail.com",
    roles: "user",
  },

  signUp2: {
    names: "Anathole-2 K",
    password: "1234",
    email: "aimeanathole2@gmail.com",
    roles: "user",
  },

  login: {
    email: "aimeanathole@gmail.com",
    password: "1234",
  },

  invalidLoginDetails: {
    email: "aimeanathole@gmail.com",
    password: "12345678",
  },

  missingPassword: {
    username: "aimeanathole@gmail.com",
  },

  existingUsername: {
    names: "Anathole K",
    password: "1234",
    email: "aimeanathole@gmail.com",
    roles: "user",
  },

  existingEmail: {
    names: "Anathole K",
    password: "1234",
    email: "aimeanathole@gmail.com",
    roles: "user",
  },
  noFullName: {
    username: "cato123",
    password: "123456",
    email: "cato123@gmail.com",
    passwordConfirm: "123456",
  },
  noEmail: {
    fullName: "Killian Chukwu",
    username: "Chukwu123",
    password: "123456",
    passwordConfirm: "123456",
  },
  validRegisterDetails: {
    fullName: "Cleanthes Stoic",
    username: "testuser1",
    password: "password1",
    email: "cleanthes123@gmail.com",
    passwordConfirm: "password1",
  },
  invalidUsernameMin5: {
    fullName: "Cleanthes Stoic",
    username: "test",
    password: "password2",
    email: "cleanthes456@gmail.com",
    passwordConfirm: "password2",
  },
};

export default userSeeder;
