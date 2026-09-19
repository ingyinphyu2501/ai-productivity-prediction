function copyCode(btn) {
    const wrapper = btn.closest('.code-block-wrapper');
    const codeEl = wrapper.querySelector('code');
    const plainText = codeEl.innerText;
    navigator.clipboard.writeText(plainText).then(() => {
        const originalHTML = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<i class="bi bi-check2"></i> Copied';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
        }, 1800);
    }).catch(err => console.error(err));
}

function copyOutput(btn) {
    const wrapper = btn.closest('.output-block-wrapper');
    const codeEl = wrapper.querySelector('code');
    const plainText = codeEl.innerText;
    navigator.clipboard.writeText(plainText).then(() => {
        const originalHTML = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = '<i class="bi bi-check2"></i> Copied';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
        }, 1800);
    }).catch(err => console.error(err));
}

(function () {
    const navLinks = document.querySelectorAll('.side-nav-link');
    const sections = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function onScroll() {
        let currentId = sections[0]?.id;
        const scrollPos = window.scrollY + 140;
        for (const section of sections) {
            if (section.offsetTop <= scrollPos) {
                currentId = section.id;
            }
        }
        navLinks.forEach(link => {
            const active = link.getAttribute('href') === '#' + currentId;
            link.classList.toggle('active', active);
        });
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

(function () {
    const ctx = document.getElementById('miChart');
    if (!ctx) return;
    const canvas = ctx.getContext('2d');

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: MI_FEATURES,
            datasets: [{
                data: MI_SCORES,
                backgroundColor: (ctx2) => {
                    const val = ctx2.raw;
                    const alpha = 0.45 + (val / Math.max(...MI_SCORES)) * 0.5;
                    return `rgba(13, 110, 253, ${alpha})`;
                },
                borderColor: '#0d6efd',
                borderWidth: 1.2,
                borderRadius: 5,
                barPercentage: 0.7
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1a1a2e',
                    padding: 10,
                    callbacks: {
                        label: (c) => `MI Score: ${c.raw.toFixed(3)}`
                    }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Mutual Information Score', font: { size: 11, weight: 'bold' } },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    beginAtZero: true,
                    border: { display: false }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: 10.5 } },
                    border: { color: '#e9ecef' }
                }
            }
        }
    });
})();
