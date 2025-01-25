import generateApis from "../generate.api";

export const authApis = {
    signup : generateApis('/auth/signup'),  
    login : generateApis('/auth/login'),
    logout : generateApis('/auth/logout'),
}