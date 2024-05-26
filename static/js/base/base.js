const userName = localStorage.getItem('userName');
const password = localStorage.getItem('password');
const accessToken = localStorage.getItem('accessToken');


function getToken(){

    fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: userName,
            password: password
        })
    })
    .then(response => response.json())
    .then( data => {   
        const accessToken = data.access;
        const refreshToken = data.refresh;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        localStorage.removeItem('userName');
        localStorage.removeItem('password');
        getData()
    })

}


function refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    fetch('/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            refresh: refreshToken,
        })
        
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('accessToken', data.access);
        getData()
        //debugger
    }).catch(data => {
        console.error('Erro ao atualizar o token:', error);
        
    });
    
}

