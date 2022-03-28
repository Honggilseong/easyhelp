const getUserIdWithoutEmail = email =>
  email.substring(0, email.lastIndexOf('@'));

export default getUserIdWithoutEmail;
