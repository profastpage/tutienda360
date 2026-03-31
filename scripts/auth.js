/**
 * TuTienda360 - Autenticación
 * Login y Registro de usuarios
 */

// ========================================
// Cambio de Tabs
// ========================================

function switchTab(tab) {
    // Actualizar tabs
    document.querySelectorAll('.auth-tab').forEach(t => {
        t.classList.remove('active');
        if (t.dataset.tab === tab) {
            t.classList.add('active');
        }
    });
    
    // Actualizar formularios
    document.querySelectorAll('.auth-form-container').forEach(f => {
        f.classList.remove('active');
    });
    document.getElementById(`${tab}Form`).classList.add('active');
    
    // Limpiar errores
    clearAllErrors();
}

// ========================================
// Toggle Password Visibility
// ========================================

function togglePassword(inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('ph-eye');
        icon.classList.add('ph-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('ph-eye-slash');
        icon.classList.add('ph-eye');
    }
}

// ========================================
// Validación de Formularios
// ========================================

function clearAllErrors() {
    document.querySelectorAll('.form-error').forEach(el => {
        el.textContent = '';
    });
    document.querySelectorAll('.form-input').forEach(el => {
        el.classList.remove('error');
    });
}

function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    
    if (input) input.classList.add('error');
    if (error) error.textContent = message;
}

function validateEmail(email) {
    return FormValidator.isValidEmail(email);
}

function validatePhone(phone) {
    return FormValidator.isValidPhone(phone);
}

// ========================================
// Login
// ========================================

function handleLogin(event) {
    event.preventDefault();
    clearAllErrors();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    let hasError = false;
    
    // Validar email
    if (!email) {
        showError('loginEmail', 'loginEmailError', 'El correo es requerido');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError('loginEmail', 'loginEmailError', 'Ingresa un correo válido');
        hasError = true;
    }
    
    // Validar contraseña
    if (!password) {
        showError('loginPassword', 'loginPasswordError', 'La contraseña es requerida');
        hasError = true;
    } else if (password.length < 6) {
        showError('loginPassword', 'loginPasswordError', 'La contraseña debe tener al menos 6 caracteres');
        hasError = true;
    }
    
    if (hasError) return;
    
    // Simular login (en producción esto iría a una API)
    const users = JSON.parse(localStorage.getItem('tutienda360_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Guardar sesión
        const sessionData = {
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            telefono: user.telefono,
            loggedAt: new Date().toISOString()
        };
        
        if (rememberMe) {
            localStorage.setItem('tutienda360_user', JSON.stringify(sessionData));
        } else {
            sessionStorage.setItem('tutienda360_user', JSON.stringify(sessionData));
        }
        
        Toast.success(`¡Bienvenido, ${user.nombre.split(' ')[0]}!`);
        
        // Redirigir
        setTimeout(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect');
            
            if (redirect) {
                window.location.href = redirect;
            } else {
                window.location.href = 'index.html';
            }
        }, 1000);
    } else {
        showError('loginEmail', 'loginEmailError', 'Correo o contraseña incorrectos');
        Toast.error('Credenciales inválidas. ¿No tienes cuenta? Regístrate.');
    }
}

// ========================================
// Registro
// ========================================

function handleRegistro(event) {
    event.preventDefault();
    clearAllErrors();
    
    const nombre = document.getElementById('registroNombre').value.trim();
    const email = document.getElementById('registroEmail').value.trim();
    const telefono = document.getElementById('registroTelefono').value.trim();
    const password = document.getElementById('registroPassword').value;
    const confirmPassword = document.getElementById('registroConfirmPassword').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    
    let hasError = false;
    
    // Validar nombre
    if (!nombre) {
        showError('registroNombre', 'registroNombreError', 'El nombre es requerido');
        hasError = true;
    } else if (nombre.length < 3) {
        showError('registroNombre', 'registroNombreError', 'El nombre debe tener al menos 3 caracteres');
        hasError = true;
    }
    
    // Validar email
    if (!email) {
        showError('registroEmail', 'registroEmailError', 'El correo es requerido');
        hasError = true;
    } else if (!validateEmail(email)) {
        showError('registroEmail', 'registroEmailError', 'Ingresa un correo válido');
        hasError = true;
    } else {
        // Verificar si el email ya existe
        const users = JSON.parse(localStorage.getItem('tutienda360_users') || '[]');
        if (users.find(u => u.email === email)) {
            showError('registroEmail', 'registroEmailError', 'Este correo ya está registrado');
            hasError = true;
        }
    }
    
    // Validar teléfono
    if (!telefono) {
        showError('registroTelefono', 'registroTelefonoError', 'El teléfono es requerido');
        hasError = true;
    } else if (!validatePhone(telefono)) {
        showError('registroTelefono', 'registroTelefonoError', 'Ingresa un teléfono válido (9 dígitos)');
        hasError = true;
    }
    
    // Validar contraseña
    if (!password) {
        showError('registroPassword', 'registroPasswordError', 'La contraseña es requerida');
        hasError = true;
    } else if (password.length < 8) {
        showError('registroPassword', 'registroPasswordError', 'Mínimo 8 caracteres');
        hasError = true;
    }
    
    // Validar confirmación de contraseña
    if (!confirmPassword) {
        showError('registroConfirmPassword', 'registroConfirmPasswordError', 'Confirma tu contraseña');
        hasError = true;
    } else if (password !== confirmPassword) {
        showError('registroConfirmPassword', 'registroConfirmPasswordError', 'Las contraseñas no coinciden');
        hasError = true;
    }
    
    // Validar términos
    if (!acceptTerms) {
        Toast.warning('Debes aceptar los términos y condiciones');
        hasError = true;
    }
    
    if (hasError) return;
    
    // Crear usuario
    const newUser = {
        id: Date.now().toString(),
        nombre,
        email,
        telefono,
        password, // En producción, esto debería estar hasheado
        createdAt: new Date().toISOString(),
        pedidos: [],
        favoritos: []
    };
    
    // Guardar usuario
    const users = JSON.parse(localStorage.getItem('tutienda360_users') || '[]');
    users.push(newUser);
    localStorage.setItem('tutienda360_users', JSON.stringify(users));
    
    // Iniciar sesión automáticamente
    localStorage.setItem('tutienda360_user', JSON.stringify({
        id: newUser.id,
        nombre: newUser.nombre,
        email: newUser.email,
        telefono: newUser.telefono,
        loggedAt: new Date().toISOString()
    }));
    
    Toast.success('¡Cuenta creada exitosamente!');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// ========================================
// Social Login (Simulado)
// ========================================

function socialLogin(provider) {
    Toast.info(`Iniciando sesión con ${provider}...`);
    
    // Simular login social
    setTimeout(() => {
        const socialUser = {
            id: `${provider}_${Date.now()}`,
            nombre: 'Usuario Social',
            email: `usuario@${provider}.com`,
            telefono: '999999999',
            provider: provider,
            loggedAt: new Date().toISOString()
        };
        
        localStorage.setItem('tutienda360_user', JSON.stringify(socialUser));
        Toast.success(`¡Bienvenido!`);
        
        setTimeout(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect');
            window.location.href = redirect || 'index.html';
        }, 1000);
    }, 1500);
}

// ========================================
// Password Strength
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('registroPassword');
    const strengthContainer = document.getElementById('passwordStrength');
    
    if (passwordInput && strengthContainer) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            strengthContainer.innerHTML = `
                <div class="strength-bar ${strength.class}"></div>
                <div class="strength-bar ${strength.class}"></div>
                <div class="strength-bar ${strength.class}"></div>
                <div class="strength-bar ${strength.class}"></div>
            `;
        });
    }
    
    // Verificar si hay un redirect en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    if (redirect && !localStorage.getItem('tutienda360_user')) {
        Toast.info('Inicia sesión para continuar');
    }
});

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;
    
    if (score <= 2) {
        return { class: 'weak', label: 'Débil' };
    } else if (score <= 3) {
        return { class: 'medium', label: 'Media' };
    } else {
        return { class: 'strong', label: 'Fuerte' };
    }
}

// ========================================
// Cerrar Sesión (función global)
// ========================================

function logout() {
    localStorage.removeItem('tutienda360_user');
    sessionStorage.removeItem('tutienda360_user');
    Toast.info('Sesión cerrada');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Exportar funciones globales
window.switchTab = switchTab;
window.togglePassword = togglePassword;
window.handleLogin = handleLogin;
window.handleRegistro = handleRegistro;
window.socialLogin = socialLogin;
window.logout = logout;
