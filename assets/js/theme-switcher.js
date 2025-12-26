/**
 * Theme Switcher Logic for Portfolio
 * Handles random theme selection, persistence, and manual switching.
 */

const THEMES = ['modern', 'brutalist', 'glass', 'professional', 'cyber', 'retro'];

function initTheme() {
    let themeToApply = THEMES[0];
    try {
        const savedTheme = localStorage.getItem('portfolio-theme');
        themeToApply = savedTheme || THEMES[Math.floor(Math.random() * THEMES.length)];
    } catch (e) {
        console.warn('LocalStorage not available, defaulting to first theme.');
    }
    applyTheme(themeToApply);
}

function applyTheme(themeName) {
    // Remove all theme classes
    THEMES.forEach(t => document.body.classList.remove(`theme-${t}`));

    // Add new theme class
    document.body.classList.add(`theme-${themeName}`);

    // Handle global dark mode class for relevant themes (Cyber, Glass)
    if (themeName === 'cyber' || themeName === 'glass') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Ensure body is visible (fix white screen issue)
    document.body.classList.remove('opacity-0');
    document.body.style.opacity = '1';

    // Save to localStorage
    localStorage.setItem('portfolio-theme', themeName);

}

function surpriseMe() {
    const btn = document.getElementById('surprise-btn');
    const icon = btn.querySelector('i');

    // Animate icon
    icon.classList.add('fa-spin');

    const currentTheme = localStorage.getItem('portfolio-theme');
    let nextThemes = THEMES.filter(t => t !== currentTheme);
    const nextTheme = nextThemes[Math.floor(Math.random() * nextThemes.length)];

    // Add a transition effect
    document.body.style.opacity = '0';
    setTimeout(() => {
        applyTheme(nextTheme);
        document.body.style.opacity = '1';

        // Remove animation after transition
        setTimeout(() => {
            icon.classList.remove('fa-spin');
        }, 500);
    }, 400);
}

// Global exposure
window.surpriseMe = surpriseMe;
window.applyTheme = applyTheme;

// Initialize on load
document.addEventListener('DOMContentLoaded', initTheme);
