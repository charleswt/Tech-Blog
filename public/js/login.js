const loginHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'content-type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Login failed');
            }
        } catch (error) {
            console.error(error.message);
        }
    }
};

document.querySelector('#login-listen').addEventListener('click', loginHandler);

const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'content-type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Signup failed');
            }
        } catch (error) {
            console.error(error.message);
        }
    }
};

document.querySelector('#signup-listen').addEventListener('click', signupHandler);
