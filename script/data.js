function host(endpoint) {
    return `https://api.backendless.com/C3A4770D-87BE-78A8-FF3A-1D1E15DA8700/4AD1DB16-0F15-424A-A14C-C39552385265/${endpoint}`;
}

const endpoints = {
    LOGIN: 'users/login',
    REGISTER: 'users/register',
    LOGOUT: 'users/logout',
    CREATE: 'data/post'
}

function table(tableName) {
    return `https://api.backendless.com/C3A4770D-87BE-78A8-FF3A-1D1E15DA8700/4AD1DB16-0F15-424A-A14C-C39552385265/data/${tableName}`;
}

export async function register(email, password) {
    const result = (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })).json();
    console.log(await result);
    return result;
}

export async function login(email, password) {
    return (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: email,
            password
        })
    })).json();
}

export async function logout() {
    return await fetch(host(endpoints.LOGOUT));
}

export async function createPost(title, category, content, userToken) {
    return (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken
        },
        body: JSON.stringify({
            "title": title,
            "category": category,
            "content": content

        })
    })).json();
}

export async function getUserTasks() {

    const result = await (await fetch(table('tasks'), {
        headers: {
            'user-token': localStorage.userToken
        }
    })
        .then(resp => resp.json())
        .then(res => res.filter(task => task.ownerId === localStorage.ownerId))
    );

    return result;
}

export async function postTask(from, to, taskName, date) {
   
    return (await fetch(table('tasks'), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': localStorage.userToken
        },
        body: JSON.stringify({
            "from": from,
            "to": to,
            "task_name": taskName,
            "task_date": date,
            "ownerId": localStorage.ownerId

        })
    })).json();
}
export async function updateNote(description,object){
    return (await fetch(table('tasks')+'/'+object.objectId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': localStorage.userToken
        },
        body: JSON.stringify({
            "task_description": description
        })
    })).json();
}