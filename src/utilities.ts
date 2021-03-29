export function generateRandomLogin(prefix = "", length: number) {
  let login = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    login += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return prefix + login;
}
