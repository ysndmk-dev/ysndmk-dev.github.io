/**
 * Theme Switcher Logic for Portfolio
 * Handles random theme selection, persistence, and manual switching.
 */

const THEMES = ['modern', 'brutalist', 'glass'];

function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const themeToApply = savedTheme || THEMES[Math.floor(Math.random() * THEMES.length)];

    applyTheme(themeToApply);
}

function applyTheme(themeName) {
    // Remove all theme classes
    THEMES.forEach(t => document.body.classList.remove(`theme-${t}`));

    // Add new theme class
    document.body.classList.add(`theme-${themeName}`);

    // Save to localStorage
    localStorage.setItem('portfolio-theme', themeName);

    // Update Theme Label if exists
    const label = document.getElementById('current-theme-label');
    if (label) {
        label.textContent = themeName.charAt(0).toUpperCase() + themeName.slice(1);
    }
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

// Initialize on load
document.addEventListener('DOMContentLoaded', initTheme);
