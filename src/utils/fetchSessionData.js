export const fetchSessionUser = () => {
  const user =
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
      
    return user;
};