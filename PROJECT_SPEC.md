Build a complete **UI-only prototype** for my academic machine learning project:

**Project Title:**
“Predicting AI-Assisted Productivity Improvement Among Software Developers”

## Technology Stack

* **Backend:** Python + Flask
* **Frontend:** HTML5
* **CSS:** CSS3 + Bootstrap 5
* **JavaScript:** Vanilla JavaScript
* **Charts:** Chart.js

For this stage, **design and implement the UI only**.

### Important

* Hard-code all displayed data, charts, tables, prediction results, metrics, and code examples.
* Do **NOT** implement actual machine learning integration yet.
* Do **NOT** load `.pkl`, `.csv`, or `.json` files yet.
* Do **NOT** connect the frontend to a real prediction API.
* Do **NOT** train or execute any model.
* The hard-coded content is only for demonstrating the final UI.
* Structure the application so that I can easily replace the hard-coded content with my actual project files and model later.

Expected future files may include:

```text
random_forest_model.pkl
association_rules.csv
feature_importance.csv
descriptive_data.csv
model_metrics.json
```

Keep the future integration points clean and easy to identify.

---

# 1. DESIGN THEME

Use a professional **blue, black, and white** theme.

Design style:

* Modern
* Clean
* Academic/research oriented
* Minimal
* Professional
* Responsive

Use:

* Dark/black navbar
* White/light page backgrounds
* Blue as the primary accent
* Blue buttons
* Clean cards
* Subtle shadows
* Rounded corners
* Good spacing
* Professional typography

Avoid:

* Excessive gradients
* Excessive animations
* Overly colorful charts
* Large amounts of text
* Generic dashboard clutter

The website should look like a polished **machine-learning research project showcase**.

---

# 2. NAVBAR

Create a responsive navbar on every page.

Project/logo text:

**AI Productivity Prediction**

Navigation:

* Home
* Descriptive Analysis
* Data Preprocessing
* Association Rules
* Model Prediction

Highlight the active page.

---

# 3. HOME / LANDING PAGE

The Home page must contain **ONLY TWO MAIN SECTIONS**.

## Section 1 — Hero

Create a visually impressive hero section.

Display:

### Predicting AI-Assisted Productivity Improvement Among Software Developers

Short description:

“Exploring how AI usage, developer characteristics, attitudes, and experiences relate to productivity improvement among software developers.”

Add two buttons:

**Explore Analysis**

**Try Prediction**

Include a simple AI/data visual element using CSS, Bootstrap Icons, or a clean illustration-style design.

Do not add additional sections below the hero except the Dataset section.

---

## Section 2 — Dataset

Title:

**Dataset**

Display:

**Stack Overflow Developer Survey 2025**

Short description:

“This project uses the Stack Overflow Developer Survey 2025 to investigate AI usage, developer characteristics, attitudes, and AI-assisted productivity.”

Create three statistic cards:

### 49,123

Respondents

### 170

Original Columns

### 2025

Stack Overflow Developer Survey

Add a small visual representation of the dataset/research workflow if it fits the design, but keep the section concise.

---

# 4. DESCRIPTIVE ANALYSIS PAGE

Title:

**Descriptive Analysis**

This page should be **mainly visualizations**.

Do not make it text-heavy.

Create a clean grid of visualization cards.

## Visualization 1 — Target Class Distribution

Use a bar chart.

Hard-code:

| Class    | Count |
| -------- | ----: |
| Disagree | 1,072 |
| Neutral  | 1,926 |
| Agree    | 6,515 |

Show the percentages as well.

---

## Visualization 2 — AI-Assisted Activities

Create a horizontal bar chart showing example frequencies for:

* Writing Code
* Debugging Code
* Documentation
* Testing Code
* Learning Codebase
* Search Answers
* Learning New Concepts
* Generating Content

Use realistic placeholder values clearly intended to be replaced later.

---

## Visualization 3 — AI Agent Usage

Create a chart for:

* Software Engineering
* Data Analytics
* IT Operations
* Business Process
* Customer Service
* Cybersecurity
* Marketing
* Decision Intelligence

---

## Visualization 4 — AI Attitudes

Create charts for example:

* AI Sentiment
* AI Accuracy
* AI Complexity
* AI Selection
* AI Agent Change

---

## Visualization 5 — AI Frustrations

Create a suitable bar chart for frustration categories.

---

## Visualization 6 — Developer Characteristics

Create suitable charts for:

* Years of Experience
* Developer Type
* Employment
* Industry
* Organization Size
* Remote Work

Use tabs or a responsive card layout if needed.

Every chart should have:

* Chart title
* Small subtitle
* Chart
* Optional short interpretation

---

# 5. DATA PREPROCESSING PAGE

Title:

**Data Preprocessing**

Use a **two-column layout**.

### Main Content — Left

Show the actual sections.

### Section Navigation — Right

Create a sticky right-side navigation menu.

The right-side navigation should link to **every heading and subheading**.

Example:

```text
Data Preprocessing
│
├── Feature Engineering
│   ├── Target Class Construction
│   ├── Filtering Developers
│   ├── Multi-Select Feature Transformation
│   └── AI Model Feature Construction
│
└── Preprocessing
    ├── Handling Missing Values
    ├── Encoding Categorical and Ordinal Features
    ├── Numerical Feature Processing
    ├── Feature Selection
    └── Final Dataset
```

Clicking an item should smoothly scroll to that section.

---

# 6. FEATURE ENGINEERING SECTION

Main heading:

**Feature Engineering**

Each subsection should contain:

1. Subheading
2. Short explanation
3. Code block
4. Optional small visual/card

Keep explanations concise.

---

## Target Class Construction

Explain briefly:

Target statement:

**“AI agents have increased my productivity.”**

Classes:

* 0 — Disagree
* 1 — Neutral
* 2 — Agree

Show a hard-coded example code block representing the target construction.

---

## Filtering Developers

Show the developer filtering criteria:

* MainBranch = Developer by profession
* Employment = Employed or Independent contractor/freelancer
* WorkExp is not null
* WorkExp is not 0

Include a hard-coded code block showing example filtering code.

---

## Multi-Select Feature Transformation

Explain briefly how multi-select survey responses are converted into binary features.

Show example features:

```text
writing_code
debugging_code
documentation
testing_code
learning_codebase
generating_content
search_answers
learning_new_concepts
```

Include:

```text
ai_tasks_count
agent_use_count
aifrustration_count
```

Include a code block.

---

## AI Model Feature Construction

Show:

```text
llm_count
OpenAI
Anthropic Claude
Google Gemini
DeepSeek
Meta Llama
```

Include a code block.

---

# 7. PREPROCESSING SECTION

Main heading:

**Preprocessing**

---

## Handling Missing Values

Show a concise explanation.

Example:

```text
Numeric values       → Mean
Ordinal/Categorical  → Mode
Relevant variables   → Context-aware handling
```

Include a code block.

---

## Encoding Categorical and Ordinal Features

Explain briefly.

Include a code block demonstrating the encoding approach.

---

## Numerical Feature Processing

Explain briefly how numerical and ordinal variables are handled.

Include a code block.

---

## Feature Selection

Explain:

**Mutual Information (MI)** is used as the primary feature-selection method.

Show a hard-coded horizontal bar chart of example MI scores.

Include a small note:

“Spearman correlation was used as a redundancy check.”

Include a code block showing an example MI feature-selection implementation.

---

## Final Dataset

Show a clean summary card with placeholder values such as:

```text
Final Rows       9,513
Final Features   61
Target Classes   3
```

Clearly structure these values so I can replace them later.

---

# 8. CODE BLOCK UI

All code blocks on the Data Preprocessing page must have a polished code-editor appearance.

Include:

* Dark background
* Syntax highlighting
* Code title/header
* Copy button
* Horizontal scrolling
* Monospace font

Example header:

```text
Python — Target Class Construction
```

The code is currently **hard-coded demonstration content**.

Make it easy for me to replace later.

---

# 9. ASSOCIATION RULES PAGE

Title:

**Association Rule Mining**

Keep this page visual and concise.

Briefly explain:

**FP-Growth** was used to discover frequent patterns and association rules.

Create:

## Rule Summary Cards

* Total Rules
* Highest Support
* Highest Confidence
* Highest Lift

Use placeholder values.

---

## Association Rules Table

Create a polished, responsive table.

Columns:

* Antecedents
* Consequents
* Support
* Confidence
* Lift

Hard-code several example rules.

Clearly organize the table data in one JavaScript/Python data structure so I can easily replace it later with the contents of:

```text
association_rules.csv
```

Add:

* Search
* Pagination
* Sorting
* Filter controls

---

## Rule Visualization

Create a **Support vs Confidence** scatter plot.

Use:

* X-axis → Support
* Y-axis → Confidence
* Point size/tooltip → Lift

Use placeholder data.

---

# 10. MODEL PREDICTION PAGE

Title:

**AI-Assisted Productivity Prediction**

This page should focus on the prediction form.

Create a centered, professional form card.

## Input Form

Use realistic sample/default values.

Include the necessary categories of model inputs.

Example:

### Developer Information

```text
Years of Experience: 5
Developer Type: Full-Stack Developer
Employment: Employed
Industry: Software
Organization Size: 100–499
Remote Work: Hybrid
```

### AI Usage

```text
Writing Code: Yes
Debugging Code: Yes
Documentation: No
Testing Code: Yes
Learning Codebase: Yes
Search Answers: Yes
Learning New Concepts: Yes

AI Agent Software Engineering: Yes
AI Agent Data Analytics: No

LLM Count: 2
```

### AI Attitudes

```text
AI Sentiment: Favorable
AI Accuracy: Mostly Accurate
AI Complexity: Moderate
AI Selection: Yes
AI Agent Change: Increased
```

### AI Frustration

Use appropriate Yes/No controls.

Use Bootstrap:

* Select dropdowns
* Number inputs
* Toggle switches
* Radio buttons where appropriate

Do not use every possible feature if it makes the form unnecessarily large. Focus on the important model inputs.

---

# 11. PREDICTION RESULT POSITION

**The prediction result must be displayed directly UNDER ALL INPUT FIELDS and the Predict button.**

Do NOT put the result beside the form.

Required layout:

```text
┌──────────────────────────────────────┐
│        Prediction Form               │
│                                      │
│  Developer Information               │
│  AI Usage                            │
│  AI Attitudes                        │
│  AI Frustration                      │
│                                      │
│  [ Predict Productivity ]            │
│                                      │
│  ─────────────────────────────────   │
│                                      │
│       Prediction Result              │
│                                      │
│       Agree                          │
│                                      │
│  Disagree   ███░░░░░  12%            │
│  Neutral    █████░░░  23%            │
│  Agree      ███████░  65%            │
│                                      │
└──────────────────────────────────────┘
```

Initially show the result using **sample placeholder values**.

Clearly label:

**Sample Prediction Result**

Example:

**Predicted Productivity Improvement: Agree**

Probabilities:

* Disagree — 12%
* Neutral — 23%
* Agree — 65%

The result should visually look like a real prediction result, but it is only UI demonstration data at this stage.

---

# 12. FUTURE MODEL INTEGRATION

Do not implement this now.

However, structure the code so the hard-coded prediction can later be replaced easily by:

```text
random_forest_model.pkl
```

Future implementation should be able to:

1. Receive form values
2. Convert them into the required feature format
3. Load the Random Forest model
4. Generate prediction
5. Generate class probabilities
6. Display the result in the existing result section

Keep the prediction result component separate from the form so it can later receive real API/model output.

---

# 13. FUTURE DATA FILES

Do not load these files yet.

Create clear placeholder sections/components that can later use:

```text
random_forest_model.pkl
association_rules.csv
feature_importance.csv
descriptive_data.csv
model_metrics.json
```

Future purpose:

```text
random_forest_model.pkl
→ Model Prediction

association_rules.csv
→ Association Rules Table/Visualization

feature_importance.csv
→ Model Feature Importance

descriptive_data.csv
→ Descriptive Analysis Charts

model_metrics.json
→ Model Performance Metrics
```

For now, everything should be hard-coded.

---

# 14. FILE STRUCTURE

Use:

```text
project/
│
├── app.py
│
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── descriptive.html
│   ├── preprocessing.html
│   ├── association_rules.html
│   └── model.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── charts.js
│       ├── preprocessing.js
│       ├── association_rules.js
│       └── model.js
│
└── requirements.txt
```

Keep hard-coded data organized and easy to identify.

For example, place chart data and sample rules in clearly separated JavaScript/Python variables rather than scattering values throughout the HTML.

---

# 15. FINAL REQUIREMENT

At this stage, **focus entirely on creating an attractive, polished, functional UI prototype**.

The application must:

* Run locally
* Navigate between all pages
* Display all charts
* Display all code blocks
* Display the right-side preprocessing navigation
* Provide smooth scrolling
* Display the association-rule table
* Display the model prediction form
* Display the sample prediction result **under the complete form**
* Be responsive
* Use the blue/black/white theme

**Do not implement real data/model integration yet.**

I will replace the hard-coded demonstration data and code with my actual project work later.
