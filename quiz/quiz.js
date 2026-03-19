/* =====================================================
   Quiz Logic – FitScape
   Updated: progress bar tracking + inline result card
   ===================================================== */

/**
 * Track answered questions and update the progress bar
 */
document.addEventListener('DOMContentLoaded', () => {
    const radios = document.querySelectorAll('#fitnessQuiz input[type="radio"]');
    const totalQuestions = 10;

    radios.forEach((radio) => {
        radio.addEventListener('change', () => {
            updateProgress();
            // Mark the parent question card as answered
            const card = radio.closest('.question-card');
            if (card) {
                card.classList.add('answered');
            }
        });
    });

    function updateProgress() {
        const answered = new Set();
        document.querySelectorAll('#fitnessQuiz input[type="radio"]:checked').forEach((r) => {
            answered.add(r.name);
        });
        const count = answered.size;
        const pct = Math.round((count / totalQuestions) * 100);

        const bar  = document.getElementById('progressBar');
        const text = document.getElementById('progressText');
        if (bar)  { bar.style.width = pct + '%'; }
        if (text) { text.textContent = `${count} / ${totalQuestions} answered`; }
    }
});

/**
 * Show results inline inside the result-card div
 */
function showResults() {
    const quiz = document.getElementById('fitnessQuiz');
    const responses = new FormData(quiz);

    let fitnessScore = 0;
    let reportLines  = [];
    let goalFeedback = '';

    responses.forEach((value, key) => {
        switch (key) {
            case 'q1':
                reportLines.push(`🏃 Physical activity: ${getActivityFeedback(value)}`);
                fitnessScore += getScore(value);
                break;
            case 'q2':
                reportLines.push(`🥗 Diet: ${getDietFeedback(value)}`);
                fitnessScore += getScore(value);
                break;
            case 'q3':
                reportLines.push(`🪑 Sitting time: ${getSittingFeedback(value)}`);
                fitnessScore += getScore(value);
                break;
            case 'q4':
                reportLines.push(`🥦 Fruits & veggies: ${getVeggiesFeedback(value)}`);
                fitnessScore += getScore(value);
                break;
            case 'q5':
                reportLines.push(`💪 Strength training: ${getStrengthFeedback(value)}`);
                fitnessScore += getScore(value);
                break;
            case 'q6':
                reportLines.push(`😴 Sleep quality: ${getSleepFeedback(value)}`);
                fitnessScore += getScore(value);
                break;
            case 'q7':
                goalFeedback = getGoalFeedback(value);
                break;
            case 'q8':
                reportLines.push(`⏱️ Workout duration: ${getWorkoutDurationFeedback(value)}`);
                fitnessScore += getScore(value);
                break;
            case 'q9':
                reportLines.push(`❤️ Cardio endurance: ${getEnduranceFeedback(value)}`);
                fitnessScore += getScore(value);
                break;
            case 'q10':
                reportLines.push(`⚡ Post-workout energy: ${getEnergyFeedback(value)}`);
                fitnessScore += getScore(value);
                break;
        }
    });

    // Determine fitness level
    let emoji, level, feedback;
    if (fitnessScore >= 15) {
        emoji    = '🏆';
        level    = 'Elite Fitness';
        feedback = "You're in excellent shape! Keep pushing your limits and inspiring others.";
    } else if (fitnessScore >= 10) {
        level    = 'Good Progress';
        emoji    = '🌟';
        feedback = "You're on the right track! With consistency in diet and training, you'll reach elite level soon.";
    } else if (fitnessScore >= 5) {
        level    = 'Getting Started';
        emoji    = '💡';
        feedback = "Great that you took the quiz! Focus on consistency — small daily habits make a big difference.";
    } else {
        level    = 'Beginner';
        emoji    = '🌱';
        feedback = "Everyone starts somewhere. Begin with 20 mins of movement a day and gradually improve your diet.";
    }

    // Store for report page compatibility
    localStorage.setItem('fitnessReport',   reportLines.join('\n'));
    localStorage.setItem('fitnessFeedback', feedback);
    localStorage.setItem('fitnessScore',    fitnessScore);

    // Render result card inline
    const resultDiv = document.getElementById('quizResult');
    resultDiv.innerHTML = `
        <div class="result-emoji">${emoji}</div>
        <div class="result-title">${level}</div>
        <p class="result-desc">${feedback}</p>
        ${goalFeedback ? `<p class="result-desc"><strong>Your Goal:</strong> ${goalFeedback}</p>` : ''}
        <div style="background:rgba(255,193,7,0.08); border-radius:12px; padding:1.25rem; text-align:left; margin-top:1rem;">
            ${reportLines.map((l) => `<p style="margin:0 0 0.5rem; color:#bbb; font-size:0.85rem;">${l}</p>`).join('')}
        </div>
        <a href="../index.html" class="fs-btn-outline" style="margin-top:1.5rem; display:inline-flex;">← Back to Home</a>
    `;
    resultDiv.classList.add('visible');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── Feedback helper functions ── */

function getActivityFeedback(v) {
    const map = {
        'low':      'You do light physical activity. Try to increase frequency over time.',
        'moderate': "You're moderately active. Great consistency!",
        'high':     "You're very active — excellent work!"
    };
    return map[v] || 'Keep moving!';
}

function getDietFeedback(v) {
    const map = {
        'poor':    'Your diet could use improvement. Focus on whole foods.',
        'average': 'Your diet is average. Try to incorporate more nutritious options.',
        'good':    'You have a great diet — keep it up!'
    };
    return map[v] || '';
}

function getSittingFeedback(v) {
    const map = {
        'high':     'You sit 8+ hours a day. Take regular standing breaks.',
        'moderate': 'You sit 5–8 hours a day. Try to take more movement breaks.',
        'low':      'Great — you avoid prolonged sitting!'
    };
    return map[v] || '';
}

function getVeggiesFeedback(v) {
    const map = {
        'low':      'Try adding more fruits & vegetables to your daily meals.',
        'moderate': "You're eating a decent amount of produce — nice work.",
        'high':     "Excellent! You're hitting your daily produce goals!"
    };
    return map[v] || '';
}

function getStrengthFeedback(v) {
    const map = {
        'low':      'Consider adding strength training to your routine at least once a week.',
        'moderate': "You're doing some strength training — keep building on it.",
        'high':     "Great strength training frequency — keep building that muscle!"
    };
    return map[v] || '';
}

function getSleepFeedback(v) {
    const map = {
        'poor':    'Your sleep is insufficient. Work on improving your sleep hygiene.',
        'average': 'Your sleep is fair. Aim for consistent, restful sleep.',
        'good':    "You're getting great sleep — this supports your recovery!"
    };
    return map[v] || '';
}

function getGoalFeedback(v) {
    const map = {
        'lose weight':       'Focus on a calorie deficit with balanced nutrition and cardio.',
        'gain muscle':       'Prioritise progressive strength training and adequate protein intake.',
        'improve endurance': 'Incorporate steady-state and interval cardio training regularly.',
        'maintain health':   'A balanced routine of strength, cardio, and good nutrition will serve you well.'
    };
    return map[v] || '';
}

function getWorkoutDurationFeedback(v) {
    const map = {
        'short':   'Short workouts are fine — try extending as your fitness improves.',
        'average': 'You have solid workout durations — keep up the consistency!',
        'long':    "Impressive commitment! Make sure to allow adequate recovery time."
    };
    return map[v] || '';
}

function getEnduranceFeedback(v) {
    const map = {
        'poor':    'Work on building your cardiovascular base with consistent cardio.',
        'average': "You have decent endurance — keep challenging yourself.",
        'good':    "Great cardiovascular endurance — you've built a strong base!"
    };
    return map[v] || '';
}

function getEnergyFeedback(v) {
    const map = {
        'rarely':    'Try adjusting your pre-workout nutrition and hydration.',
        'sometimes': 'With better sleep and nutrition, you could feel energised more often.',
        'always':    "You always feel great post-workout — your body is well-adapted!"
    };
    return map[v] || '';
}

function getScore(v) {
    const highValues    = ['high', 'good', 'long', 'always', 'low'];
    const mediumValues  = ['moderate', 'average', 'sometimes'];
    if (highValues.includes(v))   { return 2; }
    if (mediumValues.includes(v)) { return 1; }
    return 0;
}