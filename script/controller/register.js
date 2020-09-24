import { register } from '../data.js'

export default async function () {

    this.loadPartials({
        header: '../template/header.hbs'
    }).then(function () {
        this.partial('../template/register.hbs', this.event_context.app.userData);
    });
}
export async function registerPost() {
    if (this.params.password !== this.params.repeatPassword) {
        alert('Password don\'t match!');
        return;
    }
    try {
        const result = await register(this.params.email, this.params.password);
        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }
        this.redirect('#/login')
    } catch (err) {
        alert(err.messege);
    }
}