namespace ApiModel {
  export interface DoingJson {
    Id: number;
    Json: string;
  }

  export interface SystemJson {
    Id: number;
    Json: string;
  }

  export interface LoginJson {
    FirstName: string;
    LastName: string;
    UserId: string;
    UserPassword: string;
  }
}
