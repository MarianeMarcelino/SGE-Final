const API_BASE_URL = 'http://localhost:3001';

class LoginService {
    async logar(loginData) {
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization': 'your_token_here'
                },
                body: JSON.stringify(loginData)
            })
            if (!response.ok) {
                throw new Error('Falha no login')
            }
        } catch (error) {
            throw error;
        }
    }
}

export default LoginService