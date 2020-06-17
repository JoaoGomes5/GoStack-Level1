interface TechObject {
  title: String,
  experience: Number
}
interface CreateUserData{
  name?: String,
  email: String,
  password: String
  techs: Array<String | TechObject>
}

export default function createUser({name = '', email ,password}: CreateUserData) {
    const user = {
      name, 
      email,
      password
    }
    return user;
}