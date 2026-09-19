Chart.defaults.font.family = "'Segoe UI', system-ui, sans-serif";
Chart.defaults.color = '#495057';
Chart.defaults.font.size = 12;

const PRIMARY = '#0d6efd';
const PRIMARY_DARK = '#0a58ca';
const PRIMARY_LIGHT = '#6ea8fe';
const ACCENT_GREEN = '#22c55e';
const ACCENT_YELLOW = '#eab308';
const ACCENT_RED = '#ef4444';
const ACCENT_PURPLE = '#a855f7';

const CHART_COLORS = [
    '#0d6efd', '#6ea8fe', '#22c55e', '#eab308', '#ef4444',
    '#a855f7', '#ec4899', '#14b8a6', '#f97316', '#8b5cf6'
];

const BLUE_GRADIENT = (ctx, area) => {
    const g = ctx.createLinearGradient(0, area.top, 0, area.bottom);
    g.addColorStop(0, 'rgba(13, 110, 253, 0.8)');
    g.addColorStop(1, 'rgba(13, 110, 253, 0.25)');
    return g;
};

const baseBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#1a1a2e',
            padding: 10,
            titleFont: { size: 13, weight: 'bold' },
            bodyFont: { size: 12 },
            cornerRadius: 6,
            borderColor: '#0d6efd',
            borderWidth: 1
        }
    },
    scales: {
        x: {
            grid: { display: false },
            border: { color: '#e9ecef' }
        },
        y: {
            grid: { color: 'rgba(0,0,0,0.05)' },
            border: { display: false },
            beginAtZero: true
        }
    }
};

// === Visualization 1: Target Class Distribution ===
const targetDistCtx = document.getElementById('targetDistChart').getContext('2d');
const targetGradient = (ctx, index) => {
    const colors = ['rgba(239, 68, 68, 0.85)', 'rgba(234, 179, 8, 0.85)', 'rgba(34, 197, 94, 0.85)'];
    const borders = ['#ef4444', '#eab308', '#22c55e'];
    return { color: colors[index], border: borders[index] };
};

new Chart(targetDistCtx, {
    type: 'bar',
    data: {
        labels: ['Disagree', 'Neutral', 'Agree'],
        datasets: [{
            data: [1072, 1926, 6515],
            backgroundColor: [
                'rgba(239, 68, 68, 0.75)',
                'rgba(234, 179, 8, 0.75)',
                'rgba(34, 197, 94, 0.75)'
            ],
            borderColor: ['#ef4444', '#eab308', '#22c55e'],
            borderWidth: 2,
            borderRadius: 8,
            barPercentage: 0.55
        }]
    },
    options: {
        ...baseBarOptions,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1a1a2e',
                padding: 12,
                callbacks: {
                    label: function(ctx) {
                        const total = 1072 + 1926 + 6515;
                        const pct = ((ctx.raw / total) * 100).toFixed(1);
                        return `Count: ${ctx.raw.toLocaleString()} (${pct}%)`;
                    }
                }
            }
        },
        animation: { duration: 1200, easing: 'easeOutQuart' }
    }
});

// === Visualization 2: AI-Assisted Activities (Horizontal Bar) ===
const aiActivitiesCtx = document.getElementById('aiActivitiesChart').getContext('2d');
new Chart(aiActivitiesCtx, {
    type: 'bar',
    data: {
        labels: [
            'Search for answers',
            'Writing code',
            'Learning new concepts or technologies',
            'Debugging or fixing code',
            'Documenting Code',
            'Generating content or synthetic data',
            'Learning about a codebase',
            'Creating or maintaining documentation',
            "Testing code",
            'Committing and reviewing code',
            'Project planning',
            'Predictive analytics',
            'Deployment and monitoring',
        ],
        datasets: [{
            data: [6761, 6069, 5120, 5192, 4930, 4490, 4287, 4026, 3869, 3713, 2695, 1848, 1654, 1200],
            backgroundColor: 'rgba(13, 110, 253, 0.7)',
            borderColor: '#0d6efd',
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.7
        }]
    },
    options: {
        ...baseBarOptions,
        indexAxis: 'y',
        scales: {
            x: {
                grid: { color: 'rgba(0,0,0,0.05)' },
                border: { display: false },
                beginAtZero: true
            },
            y: {
                grid: { display: false },
                border: { color: '#e9ecef' }
            }
        }
    }
});

// === Visualization 3: AI Agent Usage ===
const aiAgentCtx = document.getElementById('aiAgentChart').getContext('2d');
new Chart(aiAgentCtx, {
    type: 'bar',
    data: {
        labels: [
            'Software engineering',
            'Data and analytics',
            'Business process automation',
            'IT operations',
            'Customer service support',
            'Decision intelligence',
            'Marketing',
            'Cybersecurity',
            'Robotics',
        ],
        datasets: [{
            data: [7682, 1809, 1338, 1332, 834, 809, 870, 593, 483, 219],
            backgroundColor: CHART_COLORS,
            borderRadius: 8,
            barPercentage: 0.6
        }]
    },
    options: {
        ...baseBarOptions,
        indexAxis: 'y',
        plugins: { legend: { display: false } }
    }
});

// === Visualization 4: AI Attitudes ===
// Sentiment
new Chart(document.getElementById('sentimentChart'), {
    type: 'doughnut',
    data: {
        labels: ['Very Favorable', 'Favorable', 'Indifferent', 'Unfavorable', 'Very Unfavorable'],
        datasets: [{
            data: [3158, 4202, 1353, 80, 175],
            backgroundColor: [
                'rgba(34, 197, 94, 0.8)',
                'rgba(13, 110, 253, 0.75)',
                'rgba(234, 179, 8, 0.75)',
                'rgba(249, 115, 22, 0.75)',
                'rgba(239, 68, 68, 0.75)'
            ],
            borderColor: '#fff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            legend: {
                position: 'right',
                labels: { boxWidth: 14, padding: 10, font: { size: 11 } }
            },
            tooltip: baseBarOptions.plugins.tooltip
        }
    }
});

// Accuracy
new Chart(document.getElementById('accuracyChart'), {
    type: 'bar',
    data: {
        labels: ['Highly trust', 'Somewhat trust', 'Neither trust nor distrust', 'Somewhat distrust', 'Highly distrust'],
        datasets: [{
            data: [360, 3597, 2280, 2276, 974],
            backgroundColor: [
                'rgba(239, 68, 68, 0.7)',
                'rgba(249, 115, 22, 0.7)',
                'rgba(234, 179, 8, 0.7)',
                'rgba(13, 110, 253, 0.7)',
                'rgba(34, 197, 94, 0.7)'
            ],
            borderRadius: 6,
            barPercentage: 0.65
        }]
    },
    options: {
        ...baseBarOptions,
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { grid: { color: 'rgba(0,0,0,0.05)' }, beginAtZero: true }
        }
    }
});

// Complexity
new Chart(document.getElementById('complexityChart'), {
    type: 'bar',
    data: {
        labels: ['Good but not great at handling complex tasks', 'Bad at handling complex tasks', 'Neither good or bad at handling complex tasks', 'Very poor at handling complex tasks', 'Very well at handling complex tasks', 'I don’t use AI tools for complex tasks'],
        datasets: [{
            data: [3211, 2399, 1589, 1430, 527, 343],
            backgroundColor: [
                'rgba(34, 197, 94, 0.7)',
                'rgba(13, 110, 253, 0.7)',
                'rgba(234, 179, 8, 0.7)',
                'rgba(249, 115, 22, 0.7)',
                'rgba(239, 68, 68, 0.7)'
            ],
            borderRadius: 6,
            barPercentage: 0.65
        }]
    },
    options: {
        ...baseBarOptions,
        indexAxis: 'y',
        scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: { grid: { color: 'rgba(0,0,0,0.05)' }, beginAtZero: true }
        }
    }
});

// === Visualization 5: AI Frustrations ===
const frustrationsCtx = document.getElementById('frustrationsChart').getContext('2d');
new Chart(frustrationsCtx, {
    type: 'bar',
    data: {
        labels: [
            'Solutions are almost correct but not quite',
            'Debugging AI-generated code is more time-consuming',
            'Less confident in my own problem-solving',
            'Hard to understand how or why the code works',
            'I don’t use AI tools regularly',
            'I haven’t encounter any problems',
            
        ],
        datasets: [{
            data: [7272, 4663, 2063, 1505, 752, 407],
            backgroundColor: 'rgba(249, 115, 22, 0.7)',
            borderColor: '#f97316',
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.7
        }]
    },
    options: {
        ...baseBarOptions,
        indexAxis: 'y',
        scales: {
            x: { grid: { color: 'rgba(0,0,0,0.05)' }, beginAtZero: true, border: { display: false } },
            y: { grid: { display: false }, border: { color: '#e9ecef' } }
        }
    }
});

// === Visualization 6: Developer Characteristics ===
// Experience
new Chart(document.getElementById('expChart'), {
    type: 'bar',
    data: {
        labels: [
            '1-2 yrs',
            '2-5 yrs',
            '5-10 yrs',
            '10-15 yrs',
            '15-20 yrs',
            '20+ yrs'
        ],

        datasets: [{
            data: [ 677, 1927, 2988, 2052, 1084, 1138],
            backgroundColor: 'rgba(13, 110, 253, 0.72)',
            borderRadius: 6,
            barPercentage: 0.7
        }]
    },

    options: {
        ...baseBarOptions,
       
        scales: {
            x: {grid: {color: 'rgba(0,0,0,0.05)'},beginAtZero: true},
            y: {grid: {display: false},ticks: {font: { size: 10}}}
        }

    }

});

// Dev Type
new Chart(document.getElementById('typeChart'), {
    type: 'doughnut',
    data: {
        labels: ['Web/Software', 'Data/AI', 'Management/Leadership', 'Infrastructure/Ops', 'Business/Product', 'Academic/Research', 'UI/UX Design'],
        datasets: [{
            data: [7741, 560, 429, 374, 166, 81, 10],
            backgroundColor: CHART_COLORS,
            borderColor: '#fff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '58%',
        plugins: {
            legend: {
                position: 'right',
                labels: { boxWidth: 12, padding: 8, font: { size: 10.5 } }
            },
            tooltip: baseBarOptions.plugins.tooltip
        }
    }
});

// Remote Work
new Chart(document.getElementById('remoteChart'), {
    type: 'polarArea',
    data: {
        labels: ['Hybrid(heavy to in-person)', 'Hybrid(heavy to flexible)', 'In-person', 'Very flexible'],
        datasets: [{
            data: [3145, 1642, 1493, 1146, 1075],
            backgroundColor: [
                'rgba(13, 110, 253, 0.7)',
                'rgba(34, 197, 94, 0.7)',
                'rgba(234, 179, 8, 0.7)'
            ],
            borderColor: '#fff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: { boxWidth: 12, padding: 10, font: { size: 11 } }
            },
            tooltip: baseBarOptions.plugins.tooltip
        },
        scales: {
            r: {
                grid: { color: 'rgba(0,0,0,0.06)' },
                ticks: { display: false },
                angleLines: { color: 'rgba(0,0,0,0.06)' }
            }
        }
    }
});

// === Visualization 7: AI Usage ===
// AI Tools Usage
new Chart(document.getElementById('aiToolsChart'), {
    type: 'bar',
    data: {
        labels: [
            'Yes, I use AI tools daily',
            'Yes, I use AI tools weekly',
            'Yes, I use AI tools monthly or frequently',
            'No, but I plan to soon',
            'No, and I don’t plan to ',
            
        ],
        datasets: [{
            data: [6596, 1668, 974, 160, 135],
            backgroundColor: 'rgba(13, 110, 253, 0.7)',
            borderColor: '#0d6efd',
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.7
        }]
    },
    options: {
        ...baseBarOptions,
        indexAxis: 'y',
        scales: {
            x: {
                grid: { color: 'rgba(0,0,0,0.05)' },
                border: { display: false },
                beginAtZero: true
            },
            y: {
                grid: { display: false },
                border: { color: '#e9ecef' }
            }
        }
    }
});

// AI Agents Usage
new Chart(document.getElementById('aiAgentsChart'), {
    type: 'bar',
    data: {
        labels: [
            'Yes, I use AI agents at work daily',
            'No, I use AI exclusively in copilot/autocomplete mode',
            'Yes, I use AI agents at work weekly',
            'Yes, I use AI agents at work monthly or frequently',
            
        ],
        datasets: [{
            data: [3107, 2828, 1934, 1604],
            backgroundColor: 'rgba(13, 110, 253, 0.7)',
            borderColor: '#0d6efd',
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.7
        }]
    },
    options: {
        ...baseBarOptions,
        indexAxis: 'y',
        scales: {
            x: {
                grid: { color: 'rgba(0,0,0,0.05)' },
                border: { display: false },
                beginAtZero: true
            },
            y: {
                grid: { display: false },
                border: { color: '#e9ecef' }
            }
        }
    }
});

// === Visualization 7: AI Usage ===
// AI Agent Changes
new Chart(document.getElementById('agentChangesChart'), {
    type: 'bar',
    data: {
        labels: [
            'Yes, Somewhat',
            'Not at all or minimally',
            'Yes, to a great extent',
            'No, but my developement work has changed somewhat due to non-AI factors',
            'No, but my developement work has changed significantly due to non-AI factors',
            
        ],
        datasets: [{
            data: [4410, 2475, 2436, 119, 43],
            backgroundColor: 'rgba(34, 197, 94, 0.7)',
            borderColor: '#22c55e',
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.7
        }]
    },
    options: {
        ...baseBarOptions,
        indexAxis: 'y',
        scales: {
            x: {
                grid: { color: 'rgba(0,0,0,0.05)' },
                border: { display: false },
                beginAtZero: true
            },
            y: {
                grid: { display: false },
                border: { color: '#e9ecef' },
            }
        }
    }
});




