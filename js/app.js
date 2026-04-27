import { userData, projectData, rankingData, tasksData } from './data.js';
import { createRankingItem, createTaskItem } from './components.js';

// DOM Elements
const elements = {
    usernameDisplay: document.getElementById('username-display'),
    notifCount: document.getElementById('notif-count'),
    projectName: document.getElementById('current-project-name'),
    progressPercentage: document.getElementById('progress-percentage'),
    mainProgressBar: document.getElementById('main-progress-bar'),
    rankingList: document.getElementById('ranking-list'),
    taskList: document.getElementById('task-list'),

    // Views and Profile elements
    mainView: document.getElementById('main-view'),
    profileView: document.getElementById('profile-view'),
    profileImgBtn: document.getElementById('profile-img'),
    backToMainBtn: document.getElementById('back-to-main-btn'),

    profileName: document.getElementById('profile-name'),
    profileCode: document.getElementById('profile-code'),
    profilePoints: document.getElementById('profile-points'),
    profileNotifs: document.getElementById('profile-notifs'),
    profileRankingPos: document.getElementById('profile-ranking-pos'),
    profileTeam: document.getElementById('profile-team'),
    profileGroup: document.getElementById('profile-group'),
    editUsernameInput: document.getElementById('edit-username'),
    saveProfileBtn: document.getElementById('save-profile-btn'),

    // Project View elements
    projectProgressCard: document.getElementById('project-progress-card'),
    projectView: document.getElementById('project-view'),
    backFromProjectBtn: document.getElementById('back-from-project-btn'),
    projectViewPercentage: document.getElementById('project-view-percentage'),
    projectViewBar: document.getElementById('project-view-bar'),

    // Top Bar Menu
    menuToggleBtn: document.getElementById('menu-toggle-btn'),
    dropdownMenu: document.getElementById('dropdown-menu'),
};

let chartInstance = null;

// Initialize App
const initApp = () => {
    // 1. Load User Data
    elements.usernameDisplay.textContent = userData.username;
    elements.notifCount.textContent = userData.notifications;

    // 2. Load Project Progress
    elements.projectName.textContent = projectData.name;

    // Animate Progress Bar
    setTimeout(() => {
        elements.mainProgressBar.style.width = `${projectData.progress}%`;
        animateValue(elements.progressPercentage, 0, projectData.progress, 1500);
    }, 500);

    // 3. Render Ranking
    elements.rankingList.innerHTML = rankingData.map((user, index) => createRankingItem(user, index)).join('');

    // 4. Render Tasks
    elements.taskList.innerHTML = tasksData.map(task => createTaskItem(task)).join('');

    // 5. Setup Profile View
    setupProfileView();

    // 6. Add Interactions
    setupInteractions();
};

const setupProfileView = () => {
    // Load User Data into Profile
    elements.profileName.textContent = userData.username;
    elements.profileCode.textContent = userData.code;
    if (elements.profileTeam) elements.profileTeam.textContent = userData.team || 'Sin equipo';
    if (elements.profileGroup) elements.profileGroup.textContent = userData.group || 'Sin grupo';
    elements.profilePoints.textContent = userData.points;
    elements.profileNotifs.textContent = userData.notifications;

    // Calculate global ranking position
    const myRankIndex = rankingData.findIndex(r => r.name.includes(userData.username));
    const position = myRankIndex !== -1 ? `#${myRankIndex + 1}` : '#--';
    elements.profileRankingPos.textContent = position;

    // Set edit input value
    elements.editUsernameInput.value = userData.username;
};

const initChart = () => {
    const ctx = document.getElementById('skillsChart');
    if (!ctx) return;

    if (chartInstance) {
        chartInstance.destroy();
    }

    const labels = Object.keys(userData.skills);
    const data = Object.values(userData.skills);

    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nivel de Habilidad',
                data: data,
                backgroundColor: 'rgba(6, 182, 212, 0.2)',
                borderColor: 'rgba(6, 182, 212, 1)',
                pointBackgroundColor: 'rgba(236, 72, 153, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(236, 72, 153, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: {
                        color: 'rgba(248, 250, 252, 0.9)',
                        font: { family: "'Inter', sans-serif", size: 13, weight: '600' }
                    },
                    ticks: {
                        display: false,
                        min: 0,
                        max: 100
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
};

let teamChartInstance = null;
const initTeamChart = () => {
    const ctx = document.getElementById('teamProgressChart');
    if (!ctx) return;

    if (teamChartInstance) {
        teamChartInstance.destroy();
    }

    const labels = projectData.teamsProgress.map(t => t.team);
    const data = projectData.teamsProgress.map(t => t.progress);

    teamChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Progreso (%)',
                data: data,
                backgroundColor: 'rgba(6, 182, 212, 0.6)',
                borderColor: 'rgba(6, 182, 212, 1)',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: 'rgba(248, 250, 252, 0.7)' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: 'rgba(248, 250, 252, 0.9)' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
};

// Helper: Animate numeric values
const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Setup Interactivity
const setupInteractions = () => {
    // Task check/uncheck
    const checkboxes = document.querySelectorAll('.checkbox-custom');
    checkboxes.forEach(box => {
        box.addEventListener('click', function () {
            this.classList.toggle('completed');
            // Here you would typically update the state/backend
        });
    });

    // Navigation logic
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            // Close menu if it's open
            if (elements.dropdownMenu) elements.dropdownMenu.classList.remove('show');

            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            this.classList.add('active');

            const targetViewId = this.getAttribute('data-view');
            if (targetViewId) {
                // Hide all views
                document.querySelectorAll('#views-container > div').forEach(view => {
                    view.classList.remove('view-active');
                    view.classList.add('view-hidden');
                });

                // Show target view
                const targetView = document.getElementById(targetViewId);
                if (targetView) {
                    targetView.classList.remove('view-hidden');
                    targetView.classList.add('view-active');
                }
            }
        });
    });

    // Toggle dropdown menu
    if (elements.menuToggleBtn) {
        elements.menuToggleBtn.addEventListener('click', () => {
            elements.dropdownMenu.classList.toggle('show');
        });
    }

    // Profile View Switching
    if (elements.profileImgBtn) {
        elements.profileImgBtn.addEventListener('click', () => {
            // Hide all views first
            document.querySelectorAll('#views-container > div').forEach(view => {
                view.classList.remove('view-active');
                view.classList.add('view-hidden');
            });
            // Show profile
            elements.profileView.classList.remove('view-hidden');
            elements.profileView.classList.add('view-active');
            // Initialize chart after view is visible
            setTimeout(initChart, 50);
        });
    }

    if (elements.backToMainBtn) {
        elements.backToMainBtn.addEventListener('click', () => {
            elements.profileView.classList.remove('view-active');
            elements.profileView.classList.add('view-hidden');
            // Show main view
            elements.mainView.classList.remove('view-hidden');
            elements.mainView.classList.add('view-active');

            // Reset active nav item to 'Inicio'
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            document.querySelector('.nav-item[data-view="main-view"]').classList.add('active');
        });
    }

    // Profile Settings save
    if (elements.saveProfileBtn) {
        elements.saveProfileBtn.addEventListener('click', () => {
            const newName = elements.editUsernameInput.value.trim();
            if (newName) {
                userData.username = newName;
                elements.profileName.textContent = newName;
                elements.usernameDisplay.textContent = newName;
                alert("Perfil guardado con éxito.");
            }
        });
    }

    // Project Progress View Switching
    if (elements.projectProgressCard && elements.projectView) {
        elements.projectProgressCard.addEventListener('click', () => {
            // Hide all views
            document.querySelectorAll('#views-container > div').forEach(view => {
                view.classList.remove('view-active');
                view.classList.add('view-hidden');
            });
            // Show project view
            elements.projectView.classList.remove('view-hidden');
            elements.projectView.classList.add('view-active');

            // Animate view elements
            setTimeout(() => {
                if (elements.projectViewBar) elements.projectViewBar.style.width = `${projectData.progress}%`;
                if (elements.projectViewPercentage) animateValue(elements.projectViewPercentage, 0, projectData.progress, 1500);
                initTeamChart();
            }, 50);
        });
    }

    if (elements.backFromProjectBtn) {
        elements.backFromProjectBtn.addEventListener('click', () => {
            elements.projectView.classList.remove('view-active');
            elements.projectView.classList.add('view-hidden');
            // Show main view
            elements.mainView.classList.remove('view-hidden');
            elements.mainView.classList.add('view-active');
        });
    }
};

// Run on load
document.addEventListener('DOMContentLoaded', initApp);
