import home from './controller/home.js';
import logout from './controller/logout.js';
import register, { registerPost } from './controller/register.js';
import login, { loginPost } from './controller/login.js';
import takeNote from './controller/notes.js';



window.addEventListener('load', () => {
    const app = Sammy('#root', function () {
        
        this.use('Handlebars', 'hbs');

        //for home page
        this.get('#/home', home);
        this.get('/index.html', home);
        // this.get('/',home);
        
        //for register
        this.get('#/register', register);
        this.post('#/register', (ctx) => { registerPost.call(ctx); })
        
        //for login
        this.get('#/login', login);
        this.get('/', login);
        this.post('#/login', (ctx) => { loginPost.call(ctx); })
        
        // for logout
        this.get('#/logout', logout);

        //for editor
        this.get('#/notes',takeNote);
    });

    app.run();
});


