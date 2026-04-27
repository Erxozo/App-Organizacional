// Components to generate dynamic HTML

export const createRankingItem = (user, index) => {
    const rankColors = ['gold', 'silver', 'bronze'];
    const rankClass = index < 3 ? rankColors[index] : '';
    
    return `
        <div class="list-item">
            <div class="rank-number ${rankClass}">#${index + 1}</div>
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff" alt="${user.name}" class="avatar" style="width: 36px; height: 36px;">
            <div class="user-meta">
                <h4>${user.name}</h4>
                <p>${user.role}</p>
            </div>
            <div class="points">${user.points} pts</div>
        </div>
    `;
};

export const createTaskItem = (task) => {
    const isCompleted = task.completed ? 'completed' : '';
    const tagClass = task.priority === 'high' ? 'tag-high' : 'tag-med';
    const tagText = task.priority === 'high' ? 'Urgente' : 'Media';
    
    return `
        <div class="list-item task-item">
            <div class="task-info">
                <div class="checkbox-custom ${isCompleted}" data-id="${task.id}">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div class="task-meta">
                    <h4>${task.title}</h4>
                    <p><i class="fa-regular fa-clock"></i> ${task.deadline}</p>
                </div>
            </div>
            <span class="task-tag ${tagClass}">${tagText}</span>
        </div>
    `;
};
