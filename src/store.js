import { defineStore } from "pinia";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import router from "./router";
const usersKey = "Taskzx";
let users = JSON.parse(localStorage.getItem(usersKey)) || [];

const schema = Yup.object({
  username: Yup.string().required().min(3).max(12),
  name: Yup.string().required().min(3).max(20),
  surname: Yup.string().required().min(3).max(20),
  password: Yup.string().min(8).required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const useSignupStore = defineStore("signup", () => {
  const { errors, useFieldModel, handleSubmit } = useForm({
    validationSchema: schema,
  });

  const [username, name, surname, password, confirmPassword] = useFieldModel([
    "username",
    "name",
    "surname",
    "password",
    "confirmPassword",
  ]);

  const signup = handleSubmit((values) => {
    const user = {
      username: values.username,
      name: values.name,
      surname: values.surname,
      //please dont do this in real projects
      password: values.password,
    };

    console.log(users, JSON.stringify(users, null, 2));
    if (users.find((x) => x.username === user.username)) {
      return console.log('Username "' + user.username + '" is already taken');
    }

    user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;

    users.push(user);

    localStorage.setItem(usersKey, JSON.stringify(users));
    const auth = useAuthStore();
    auth.signIn(user.username, user.password);
  });

  return {
    errors,
    username,
    name,
    surname,
    password,
    confirmPassword,
    signup,
  };
});

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    user: JSON.parse(localStorage.getItem("user")) || {},
  }),
  actions: {
    signIn(username, password) {
      let users = JSON.parse(localStorage.getItem(usersKey)) || [];
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      this.user = user;
      if (!user) return console.log("Username or password is incorrect");
      localStorage.setItem("user", JSON.stringify(user));
      this.authenticated = true;
      router.push("/dashboard");
    },
    logOut() {
      this.authenticated = false;
      localStorage.removeItem("user");
      this.user = {};
      router.push("/");
    },
    checkUser() {
      if (JSON.parse(localStorage.getItem("user"))) {
        const user = JSON.parse(localStorage.getItem("user"));
        this.authenticated = true;
        this.user = user;
      } else {
        this.authenticated = false;
      }
    },
  },
});
