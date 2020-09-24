import {logout} from '../data.js';

export default async function(){
    const result=await logout();
    console.log(result);
    localStorage.clear();
    this.app.userData={};
    this.redirect('#/login');
}