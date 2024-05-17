export interface UserLoginInterface {
  email: string,
  password: string
};
  
  
export interface UserInterface extends UserLoginInterface{
  name: string,
  surname:  string,
  birthday: string
  middleName?: string,
  secondSurname?:  string,
};