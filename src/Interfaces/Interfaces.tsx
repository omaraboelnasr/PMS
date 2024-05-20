export interface AuthForContext {
    loginData: DecodedToken | null;
    // loginData?: object | null;
    saveLoginData: () => void;
    baseUrl?: string;
    // requestHeaders?: object;
    requestHeaders: Record<string, string>;

  }
  export interface DecodedToken {
    userName: string;
    userEmail: string;
   
  }
  

  export interface ProtectedRouteProps {
    loginData?: object | null;
    children: JSX.Element;
  }
  
export interface Task {
    id: number;
    title: string;
    status: string;
    project?: {
      title: string;
    };
    employee?: {
      userName: string;
    };
    creationDate: string;
  }
  
  export interface FormData {
    title: string;
    description: string;
    employeeId: number;
    projectId: number;
  }
  
  export interface User {
    title: string;
    id: number;
    userName: string;
    userEmail:string
  }
  
  export interface LoginFormInputs {
    email: string;
    password: string;
  }
  
  export interface LoginProps {
    saveLoginData: () => void;
  }