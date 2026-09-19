const CLASS_LABELS = ['Disagree', 'Neutral', 'Agree'];

const AGE_MAP = {
    'Under 18 years old': 1,
    '18-24 years old': 2,
    '25-34 years old': 3,
    '35-44 years old': 4,
    '45-54 years old': 5,
    '55-64 years old': 6,
    '65 years or older': 7,
    'Prefer not to say': 0
};

const ORGSIZE_MAP = {
    'Just me - I am a freelancer, sole proprietor, etc.': 1,
    'Less than 20 employees': 2,
    '20 to 99 employees': 3,
    '100 to 499 employees': 4,
    '500 to 999 employees': 5,
    '1,000 to 4,999 employees': 6,
    '5,000 to 9,999 employees': 7,
    '10,000 or more employees': 8,
    "I don't know": 0
};

const EDLEVEL_MAP = {
    'Primary/elementary school': 1,
    'Secondary school': 2,
    'Some college/university study without earning a degree': 3,
    'Associate degree': 4,
    "Bachelor's degree": 5,
    "Master's degree": 6,
    'Professional degree': 7,
    'Other': 0
};

const REMOTEWORK_MAP = {
    'Remote': 0,
    'In-person': 1,
    'Hybrid (some remote, leans heavy to in-person)': 2,
    'Hybrid (some in-person, leans heavy to flexibility)': 3,
    'Your choice (very flexible, you can come in when you want or just as needed)': 4
};

const AITHREAT_MAP = {
    'Yes': 2,
    'No': 1,
    "I'm not sure": 0
};

const NEWROLE_MAP = {
    'I have strongly considered changing my career and/or the industry I work in': 4,
    'I have somewhat considered changing my career and/or the industry I work in': 3,
    'I have transitioned into a new career and/or industry voluntarily': 2,
    'I have transitioned into a new career and/or industry involuntarily': 1,
    'I have neither consider or transitioned into a new career or industry': 0
};

const AIAGENTCHANGE_MAP = {
    'Yes, to a great extent': 4,
    'Yes, somewhat': 3,
    'Not at all or minimally': 2,
    'No, but my work changed somewhat': 1,
    'No, but my work changed significantly': 0
};

const AISENT_MAP = {
    'Very favorable': 5,
    'Favorable': 4,
    'Indifferent': 3,
    'Unfavorable': 2,
    'Very unfavorable': 1,
    'Unsure': 0
};

const AISELECT_MAP = {
    'Yes, I use AI tools daily': 4,
    'Yes, I use AI tools weekly': 3,
    'Yes, I use AI tools monthly or infrequently': 2,
    'No, but I plan to soon': 1,
    "No, and I don't plan to": 0
};

const AIAGENTS_MAP = {
    'Yes, I use AI agents daily': 6,
    'Yes, I use AI agents weekly': 5,
    'Yes, I use AI agents monthly or infrequently': 4,
    'No, I use AI exclusively in copilot mode': 3,
    'No, but I plan to': 1,
    "No, and I don't plan to": 0
};

const AIACC_MAP = {
    'Highly trust': 4,
    'Somewhat trust': 3,
    'Neither trust nor distrust': 2,
    'Somewhat distrust': 1,
    'Highly distrust': 0
};

const LEARNCODEAI_MAP = {
    'Yes, required for my job/career': 4,
    'Yes, for personal curiosity/hobbies': 3,
    'No, learned unrelated to AI for job': 2,
    'No, learned unrelated to AI for curiosity': 1,
    "No, didn't spend time learning": 0
};

const AICOMPLEX_MAP = {
    'Very well at handling complex tasks': 5,
    'Good, but not great at handling complex tasks': 4,
    'Neither good or bad at handling complex tasks': 3,
    'Bad at handling complex tasks': 2,
    'Very poor at handling complex tasks': 1,
    "I don't know": 0
};

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

function isChecked(id) {
    const element = document.getElementById(id);
    return element ? element.checked : false;
}

function collectFormValues() {
    const activities = {
        documenting_code: isChecked('task_documenting'),
        deployment_monitoring: isChecked('task_deployment'),
        documentation: isChecked('task_documentation'),
        testing_code: isChecked('task_testing'),
        learning_codebase: isChecked('task_learning'),
        generating_content: isChecked('task_generating'),
        search_answers: isChecked('task_search'),
        writing_code: isChecked('task_writing'),
        predictive_analytics: isChecked('task_predictive'),
        debugging_code: isChecked('task_debugging'),
        commit_review: isChecked('task_commit'),
        project_planning: isChecked('task_planning'),
        learning_new_concepts: isChecked('task_concepts')
    };

    const agents = {
        agent_business_process: isChecked('agent_business'),
        agent_customer_service: isChecked('agent_customer'),
        agent_cybersecurity: isChecked('agent_cyber'),
        agent_data_analytics: isChecked('agent_data'),
        agent_decision_intelligence: isChecked('agent_decision'),
        agent_it_operations: isChecked('agent_it'),
        agent_marketing: isChecked('agent_marketing'),
        agent_software_engineering: isChecked('agent_software'),
        agent_robotics: isChecked('agent_robotics')
    };

    const frustrations = {
        fru_almost_correct: isChecked('fr_almost'),
        fru_not_regular: isChecked('fr_regular'),
        fru_debugging_effort: isChecked('fr_debugging'),
        fru_lower_confidence: isChecked('fr_confidence'),
        fru_no_issues: isChecked('fr_noissues'),
        fru_code_understanding: isChecked('fr_understanding')
    };

    return {
        age: AGE_MAP[getValue('age')] ?? 0,
        orgsize: ORGSIZE_MAP[getValue('orgSize')] ?? 0,
        edlevel: EDLEVEL_MAP[getValue('edLevel')] ?? 0,
        remotework: REMOTEWORK_MAP[getValue('remoteWork')] ?? 0,
        devtype: getValue('devType'),
        Industry: getValue('industry'),
        aithreat: AITHREAT_MAP[getValue('aiThreat')] ?? 0,
        newrole: NEWROLE_MAP[getValue('newRole')] ?? 0,
        aiagentchange: AIAGENTCHANGE_MAP[getValue('aiAgentChange')] ?? 0,
        aisent: AISENT_MAP[getValue('aiSentiment')] ?? 0,
        aiselect: AISELECT_MAP[getValue('aiSelection')] ?? 0,
        aiagents: AIAGENTS_MAP[getValue('aiAgents')] ?? 0,
        aiacc: AIACC_MAP[getValue('aiAccuracy')] ?? 0,
        learncodeai: LEARNCODEAI_MAP[getValue('learnCodeAI')] ?? 0,
        aicomplex: AICOMPLEX_MAP[getValue('aiComplexity')] ?? 0,
        WorkExp: Number(getValue('workExp')),
        YearsCode: Number(getValue('yearsCode')),
        language_count: Number(getValue('languageCount')),
        database_count: Number(getValue('databaseCount')),
        platform_count: Number(getValue('platformCount')),
        webframe_count: Number(getValue('webframeCount')),
        ...activities,
        ai_tasks_count: Object.values(activities).filter(Boolean).length,
        ...agents,
        agent_use_count: Object.values(agents).filter(Boolean).length,
        uses_openai: isChecked('llm_openai'),
        uses_claude: isChecked('llm_claude'),
        uses_gemini: isChecked('llm_gemini'),
        uses_deepseek: isChecked('llm_deepseek'),
        uses_llama: isChecked('llm_llama'),
        llm_count: [
            isChecked('llm_openai'),
            isChecked('llm_claude'),
            isChecked('llm_gemini'),
            isChecked('llm_deepseek'),
            isChecked('llm_llama')
        ].filter(Boolean).length,
        has_ai_editor: isChecked('hasAiEditor'),
        ...frustrations,
        aifrustration_count: Object.values(frustrations).filter(Boolean).length
    };
}

async function runPrediction(event) {
    event.preventDefault();

    const button = document.getElementById('predictBtn');
    const originalText = button.innerHTML;

    button.disabled = true;
    button.innerHTML = '<i class="bi bi-arrow-repeat spin me-2"></i>Predicting...';

    try {
        const formValues = collectFormValues();

        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Prediction failed.');
        }

        showPrediction(result);

        const resultWrapper = document.getElementById('predictionResultWrapper');
        resultWrapper.style.display = 'block';

        setTimeout(() => {
            resultWrapper.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);

    } catch (error) {
        alert(error.message);
    } finally {
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

function showPrediction(result) {
    const predictedClass = Number(result.class);
    const probabilities = result.probabilities;
    const label = CLASS_LABELS[predictedClass];

    const pDisagree = Math.round(probabilities[0] * 100);
    const pNeutral = Math.round(probabilities[1] * 100);
    const pAgree = Math.round(probabilities[2] * 100);

    document.getElementById('predictedClass').textContent = label;

    document.getElementById('predictionConfidence').textContent =
        Math.round(probabilities[predictedClass] * 100) + '%';

    const descriptions = {
        Disagree: 'The model predicts a lower level of productivity improvement.',
        Neutral: 'The model predicts a neutral level of productivity improvement.',
        Agree: 'The model predicts a higher level of productivity improvement.'
    };

    document.getElementById('predictionDescription').textContent =
        descriptions[label];

    document.getElementById('pDisagree').textContent = pDisagree;
    document.getElementById('pNeutral').textContent = pNeutral;
    document.getElementById('pAgree').textContent = pAgree;

    document.getElementById('barDisagree').style.width = pDisagree + '%';
    document.getElementById('barNeutral').style.width = pNeutral + '%';
    document.getElementById('barAgree').style.width = pAgree + '%';
}

document.addEventListener('DOMContentLoaded', () => {
    const resultWrapper = document.getElementById('predictionResultWrapper');

    if (resultWrapper) {
        resultWrapper.style.display = 'none';
    }
});