const API_URL = 'http://localhost:4000/graphql';

// Função para fazer login
async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const query = `
        mutation {
            login(username: "${username}", password: "${password}") {
                token
                message
            }
        }
    `;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();
        if (result.errors) {
            alert(result.errors[0].message);
        } else {
            const { token } = result.data.login;
            localStorage.setItem('token', token);
            alert(result.data.login.message);
            showHomePage();
        }
    } catch (error) {
        alert('Erro ao tentar fazer login: ' + error.message);
    }
}

function showHomePage() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('home').style.display = 'block';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('btn-ver-perfil').style.display = 'block'; // Mostrar o botão novamente
    document.getElementById('btn-voltar-home').style.display = 'none'; // Esconder o botão de voltar
}

async function getProfile() {
    const token = localStorage.getItem('token');

    const query = `
        query {
            perfil {
                utilizadorId
                username
                dataNascimento
                freqResultados
            }
        }
    `;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();
        if (result.errors) {
            alert(result.errors[0].message);
        } else {
            const profile = result.data.perfil;
            document.getElementById("profile-info").innerHTML = `
                <p>ID: ${profile.utilizadorId}</p>
                <p>Username: ${profile.username}</p>
                <p>Data de Nascimento: ${profile.dataNascimento}</p>
                <p>Frequência de Resultados: ${profile.freqResultados}</p>
            `;

            // Esconder o botão "Ver Perfil" e mostrar o botão "Voltar"
            document.getElementById('btn-ver-perfil').style.display = 'none';
            document.getElementById('btn-voltar-home').style.display = 'block';

            document.getElementById('profile').style.display = 'block';
        }
    } catch (error) {
        alert('Erro ao tentar carregar perfil: ' + error.message);
    }
}

// Função para editar o perfil do utilizador
async function editProfile() {
    const token = localStorage.getItem('token');
    const novoUsername = document.getElementById("edit-username").value;
    const novaFreqResultados = document.getElementById("edit-freqResultados").value;

    const query = `
        mutation {
            editarPerfil(novoUsername: "${novoUsername}", novaFreqResultados: ${novaFreqResultados}) {
                utilizador {
                    utilizadorId
                    username
                    dataNascimento
                    freqResultados
                }
                message
            }
        }
    `;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();
        if (result.errors) {
            alert(result.errors[0].message);
        } else {
            alert(result.data.editarPerfil.message);
            getProfile();
        }
    } catch (error) {
        alert('Erro ao tentar editar perfil: ' + error.message);
    }
}