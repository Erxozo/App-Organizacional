// Mock Data for the application

export const userData = {
    username: 'Edgar',
    notifications: 3,
    level: 12,
    code: '#VB-4921',
    team: 'Frontend Avengers',
    group: 'Desarrollo Core',
    points: 1950,
    skills: {
        'Liderazgo': 85,
        'Programación': 90,
        'Diseño': 70,
        'Comunicación': 80,
        'Trabajo en Equipo': 95
    }
};

export const projectData = {
    name: 'Plataforma de E-Learning v2.0',
    progress: 75, // percentage
    teamsProgress: [
        { team: 'Frontend Avengers', progress: 85 },
        { team: 'Backend Ninjas', progress: 60 },
        { team: 'UI/UX Designers', progress: 95 },
        { team: 'QA Testers', progress: 40 }
    ]
};

export const rankingData = [
    { id: 1, name: 'Ana Silva', role: 'Frontend Dev', points: 2450 },
    { id: 2, name: 'Carlos Ruiz', role: 'Backend Dev', points: 2100 },
    { id: 3, name: 'Edgar (Tú)', role: 'Fullstack Dev', points: 1950 },
    { id: 4, name: 'Laura Gómez', role: 'UX/UI Designer', points: 1820 },
];

export const tasksData = [
    { id: 101, title: 'Revisar PR de autenticación', deadline: 'Hoy, 15:00', priority: 'high', completed: false },
    { id: 102, title: 'Diseñar base de datos de cursos', deadline: 'Mañana, 10:00', priority: 'med', completed: false },
    { id: 103, title: 'Reunión de avance (Daily)', deadline: 'Hoy, 09:00', priority: 'high', completed: true },
];
