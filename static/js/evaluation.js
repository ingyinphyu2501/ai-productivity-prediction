/* === FUTURE REPLACEMENT NOTES ===
   1. Replace CONFUSION_MATRICES with data computed from model_metrics.json / predictions
   2. Replace FEATURE_IMPORTANCE with rows loaded from feature_importance.csv
*/

const CLASSES = ['Disagree', 'Neutral', 'Agree'];

// [true_label][predicted_label] counts
const CONFUSION_MATRICES = {
    lr: [
        [ 706,  249,  117],
        [ 601, 796, 529],
        [ 510, 1281, 4724]
    ],
    lgbm: [
        [686,  274,  112],
        [ 518, 882,  526],
        [ 352, 1411, 4752]
    ],
    xgb: [
        [700,  265,  107],
        [ 531, 884,  511],
        [ 360, 1403, 4752]
    ],
    rf: [
        [583,  252,  137],
        [ 498, 818,  610],
        [ 298, 1148, 5069]
    ]
};

function renderCM(containerId, matrix) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    const totals = matrix.map(row => row.reduce((a, b) => a + b, 0));
    const headerCells = CLASSES.map(c => `<div class="matrix-cell matrix-label matrix-label-header">${c}</div>`).join('');

    let html = `<div class="matrix-cell matrix-label-empty"></div>${headerCells}`;

    for (let trueIdx = 0; trueIdx < CLASSES.length; trueIdx++) {
        html += `<div class="matrix-cell matrix-label matrix-label-header" title="True ${CLASSES[trueIdx]}: ${totals[trueIdx]} samples">${CLASSES[trueIdx]}</div>`;
        for (let predIdx = 0; predIdx < CLASSES.length; predIdx++) {
            const value = matrix[trueIdx][predIdx];
            const total = totals[trueIdx];
            const pct = (value / total) * 100;
            let cellClass = 'matrix-cell-false';
            if (trueIdx === predIdx) cellClass = 'matrix-cell-true';
            else if (Math.abs(trueIdx - predIdx) === 1) cellClass = 'matrix-cell-mid';
            html += `<div class="matrix-cell ${cellClass}" title="True ${CLASSES[trueIdx]} → Pred ${CLASSES[predIdx]}: ${value} (${pct.toFixed(1)}%)">${value}</div>`;
        }
    }
    grid.innerHTML = html;
}

renderCM('cm_lr', CONFUSION_MATRICES.lr);
renderCM('cm_lgbm', CONFUSION_MATRICES.lgbm);
renderCM('cm_xgb', CONFUSION_MATRICES.xgb);
renderCM('cm_rf', CONFUSION_MATRICES.rf);

/* === Feature Importance Chart === */
const FEATURE_IMPORTANCE = [
    { feature: 'aiagentchange', importance: 0.1449 },
    { feature: 'aisent', importance: 0.1305 },
    { feature: 'aiagents', importance: 0.0915 },
    { feature: 'aicomplex', importance: 0.0833 },
    { feature: 'aicc', importance: 0.0822 },
    { feature: 'aiselect', importance: 0.0530 },
    { feature: 'ai_tasks_count', importance: 0.0482 },
    { feature: 'agent_use_count', importance: 0.0223 },
    { feature: 'agent_software_engineering', importance: 0.0191 },
    { feature: 'writing_code', importance: 0.0188 },
    { feature: 'YearsCode', importance: 0.0186 },
    { feature: 'debugging_code', importance: 0.0181 },
    { feature: 'WorkExp', importance: 0.0148 },
    { feature: 'learning_codebase', importance: 0.0141 },
    { feature: 'platform_count', importance: 0.0140 },
    { feature: 'language_count', importance: 0.0137 },
    { feature: 'webframe_count', importance: 0.0116 },
    { feature: 'search_answers', importance: 0.0110 },
    { feature: 'llm_count', importance: 0.0110 },
    { feature: 'learning_new_concept', importance: 0.0107 },
    { feature: 'database_count', importance: 0.0104 },
    { feature: 'orgsize', importance: 0.0100 },
    { feature: 'documentation', importance: 0.0088 },
    { feature: 'fru_debugging_effort', importance: 0.0085 },
    { feature: 'newrole', importance: 0.0083 },
];

(function () {
    const ctx = document.getElementById('featureImportanceChart');
    if (!ctx) return;
    const data = [...FEATURE_IMPORTANCE].sort((a, b) => a.importance - b.importance);

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: data.map(d => d.feature),
            datasets: [{
                label: 'Importance (Mean Decrease Gini)',
                data: data.map(d => d.importance),
                backgroundColor: (ctx2) => {
                    const v = ctx2.raw;
                    const maxV = Math.max(...data.map(x => x.importance));
                    const t = v / maxV;
                    const r = Math.round(13 + (1 - t) * 150);
                    const g = Math.round(110);
                    const b = Math.round(253 - (1 - t) * 120);
                    return `rgba(${r}, ${g}, ${b}, 0.85)`;
                },
                borderColor: '#0d6efd',
                borderWidth: 1,
                borderRadius: 5,
                barPercentage: 0.75,
                hoverBackgroundColor: 'rgba(34, 197, 94, 0.85)',
                hoverBorderColor: '#15803d'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1500, easing: 'easeOutQuart' },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1a1a2e',
                    padding: 12,
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    callbacks: {
                        title: (items) => `#${data.length - items[0].dataIndex} ${items[0].label}`,
                        label: (ctx2) => `Importance: ${ctx2.raw.toFixed(4)}`
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Feature Importance Score (Random Forest — Gini Importance)',
                        font: { size: 13, weight: 'bold' }
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    border: { display: false },
                    beginAtZero: true,
                    ticks: {
                        callback: (v) => (typeof v === 'number' ? v.toFixed(2) : v),
                        font: { size: 11 }
                    }
                },
                y: {
                    grid: { display: false },
                    border: { color: '#e9ecef' },
                    ticks: {
                        font: { size: 11 }
                    }
                }
            }
        }
    });
})();
