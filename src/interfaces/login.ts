export interface ILogin {
  marks: IMark[];
  mark: string;
  type: string;
  login: string;
  password: string;
  id?: number;
}

export interface IValue {
  value: string;
}

export interface IMark {
  text: string;
}
