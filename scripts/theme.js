/**
 * TuTienda360 - Toggle de Tema Oscuro/Claro
 * Con persistencia en localStorage
 */

const ThemeManager = {
    // Tema actual
    currentTheme: 'light',

    // Inicializar
    init() {
        // Verificar preferencia guardada
        const savedTheme = localStorage.getItem('tutienda360_theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else if (systemPrefersDark) {
            this.currentTheme = 'dark';
        }

        this.applyTheme(this.currentTheme);
        this.initToggle();
    },

    // Aplicar tema
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Actualizar ícono del toggle
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.remove('ph-moon');
                    icon.classList.add('ph-sun');
                    toggleBtn.classList.add('active');
                } else {
                    icon.classList.remove('ph-sun');
                    icon.classList.add('ph-moon');
                    toggleBtn.classList.remove('active');
                }
            }
        }

        // Actualizar meta theme-color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', theme === 'dark' ? '#1A1A1A' : '#0061FF');
        }
    },

    // Toggle entre temas
    toggle() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem('tutienda360_theme', newTheme);
    },

    // Inicializar botón toggle
    initToggle() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
    },

    // Escuchar cambios del sistema
    listenToSystemChanges() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const savedTheme = localStorage.getItem('tutienda360_theme');
            if (!savedTheme) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    ThemeManager.init();
    ThemeManager.listenToSystemChanges();
});

// Exportar globalmente
window.ThemeManager = ThemeManager;
