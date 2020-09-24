import { login } from '../data.js';

export default async function () {
    this.loadPartials({
        header: './template/header.hbs'
    }).then(function () {
        this.partial('./template/login.hbs',this.event_context.app.userData);
    })
}

export async function loginPost() {
    try {
        const result = await login(this.params.email, this.params.password);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        if (this.app.userData == undefined) {
            this.app.userData = {};
        }
        this.app.userData.loggedIn = true;
        this.app.userData.email = result.email;
        
        localStorage.setItem('userToken', result['user-token']);
        localStorage.setItem('email', result.email);
        localStorage.setItem('ownerId',result.ownerId);
        this.redirect('#/home')
    } catch (err) {
        alert(err.messege);
    }
}

