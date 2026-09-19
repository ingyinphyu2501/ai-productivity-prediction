document.addEventListener("DOMContentLoaded", function () {

    const csvUrl = "/static/data/fpgrowth_all_rules.csv";

    let allRules = [];
    let filteredRules = [];
    let currentPage = 1;

    const rowsPerPage = 20;

    let scatterChart = null;


    // ============================================================
    // Load CSV
    // ============================================================

    fetch(csvUrl)

        .then(response => {

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return response.text();
        })

        .then(csvText => {

            console.log("CSV loaded successfully");
            console.log("CSV preview:", csvText.substring(0, 500));

            allRules = parseCSV(csvText);

            console.log("Parsed CSV:", allRules);
            console.log("Number of rules:", allRules.length);

            if (allRules.length === 0) {
                throw new Error("CSV contains no association rules.");
            }

            processRules();

            updateSummary();

            applyFilters();
        })

        .catch(error => {

            console.error("Association rules error:", error);

            const tbody =
                document.getElementById("rulesTableBody");

            if (tbody) {

                tbody.innerHTML = `
                    <tr>
                        <td colspan="5"
                            style="text-align:center; padding:30px;">
                            Unable to load association rules data.
                        </td>
                    </tr>
                `;
            }
        });


    // ============================================================
    // CSV Parser
    // ============================================================

    function parseCSV(text) {

        const rows = [];

        let row = [];
        let value = "";
        let insideQuotes = false;


        for (let i = 0; i < text.length; i++) {

            const char = text[i];
            const nextChar = text[i + 1];


            // Handle escaped double quotes
            if (
                char === '"' &&
                insideQuotes &&
                nextChar === '"'
            ) {

                value += '"';

                i++;
            }


            // Start / end quoted field
            else if (char === '"') {

                insideQuotes = !insideQuotes;
            }


            // Column separator
            else if (
                char === "," &&
                !insideQuotes
            ) {

                row.push(value.trim());

                value = "";
            }


            // End of row
            else if (
                (char === "\n" || char === "\r") &&
                !insideQuotes
            ) {

                // Handle Windows CRLF
                if (
                    char === "\r" &&
                    nextChar === "\n"
                ) {
                    i++;
                }


                row.push(value.trim());


                if (
                    row.some(cell => cell !== "")
                ) {
                    rows.push(row);
                }


                row = [];
                value = "";
            }


            else {

                value += char;
            }
        }


        // Handle final row
        if (
            value !== "" ||
            row.length > 0
        ) {

            row.push(value.trim());


            if (
                row.some(cell => cell !== "")
            ) {
                rows.push(row);
            }
        }


        // Need at least header + one row
        if (rows.length < 2) {
            return [];
        }


        // ========================================================
        // Normalize headers
        // ========================================================

        const headers = rows[0].map(header =>

            header
                .trim()
                .toLowerCase()
                .replace(/^["']|["']$/g, "")
        );


        console.log("CSV headers:", headers);


        // ========================================================
        // Convert rows to objects
        // ========================================================

        return rows
            .slice(1)
            .map(row => {

                const obj = {};


                headers.forEach((header, index) => {

                    obj[header] =
                        row[index] !== undefined
                            ? row[index].trim()
                            : "";
                });


                return obj;
            });
    }


    // ============================================================
    // Process Rules
    // ============================================================

    function processRules() {

        allRules = allRules.map(rule => {

            return {

                // Research question
                researchQuestion:
                    rule.research_question || "",


                // IMPORTANT:
                // CSV uses antecedent_str
                antecedents:
                    rule.antecedent_str || "",


                // IMPORTANT:
                // CSV uses consequent_str
                consequents:
                    rule.consequent_str || "",


                // Numeric values
                support:
                    parseFloat(rule.support) || 0,


                confidence:
                    parseFloat(rule.confidence) || 0,


                lift:
                    parseFloat(rule.lift) || 0
            };
        });


        console.log(
            "Processed rules:",
            allRules
        );


        console.log(
            "Total processed rules:",
            allRules.length
        );
    }


    // ============================================================
    // Summary Cards
    // ============================================================

    function updateSummary() {

        if (allRules.length === 0) {
            return;
        }


        const highestSupport =
            Math.max(
                ...allRules.map(
                    rule => rule.support
                )
            );


        const highestConfidence =
            Math.max(
                ...allRules.map(
                    rule => rule.confidence
                )
            );


        const highestLift =
            Math.max(
                ...allRules.map(
                    rule => rule.lift
                )
            );


        const totalRules =
            document.getElementById("totalRules");

        const supportElement =
            document.getElementById("highestSupport");

        const confidenceElement =
            document.getElementById("highestConfidence");

        const liftElement =
            document.getElementById("highestLift");


        if (totalRules) {

            totalRules.textContent =
                allRules.length;
        }


        if (supportElement) {

            supportElement.textContent =
                highestSupport.toFixed(3);
        }


        if (confidenceElement) {

            confidenceElement.textContent =
                highestConfidence.toFixed(3);
        }


        if (liftElement) {

            liftElement.textContent =
                highestLift.toFixed(2);
        }
    }


    // ============================================================
    // Filters
    // ============================================================

    function applyFilters() {

        const searchElement =
            document.getElementById("ruleSearch");


        const supportElement =
            document.getElementById("minSupport");


        const confidenceElement =
            document.getElementById("minConfidence");


        const liftElement =
            document.getElementById("minLift");


        const search =
            searchElement
                ? searchElement.value
                    .toLowerCase()
                    .trim()
                : "";


        const minSupport =
            supportElement
                ? parseFloat(
                    supportElement.value
                ) || 0
                : 0;


        const minConfidence =
            confidenceElement
                ? parseFloat(
                    confidenceElement.value
                ) || 0
                : 0;


        const minLift =
            liftElement
                ? parseFloat(
                    liftElement.value
                ) || 0
                : 0;


        filteredRules =
            allRules.filter(rule => {


                const searchMatch =

                    !search ||

                    rule.antecedents
                        .toLowerCase()
                        .includes(search) ||

                    rule.consequents
                        .toLowerCase()
                        .includes(search) ||

                    rule.researchQuestion
                        .toLowerCase()
                        .includes(search);


                return (

                    searchMatch &&

                    rule.support >=
                        minSupport &&

                    rule.confidence >=
                        minConfidence &&

                    rule.lift >=
                        minLift
                );
            });


        currentPage = 1;


        renderTable();

        renderPagination();

        renderScatter();
    }


    // ============================================================
    // Render Table
    // ============================================================

    function renderTable() {

        const tbody =
            document.getElementById(
                "rulesTableBody"
            );


        if (!tbody) {
            return;
        }


        tbody.innerHTML = "";


        // No results
        if (filteredRules.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="5"
                        style="
                            text-align:center;
                            padding:30px;
                        ">
                        No association rules found.
                    </td>
                </tr>
            `;

            return;
        }


        // ========================================================
        // Pagination range
        // ========================================================

        const start =
            (currentPage - 1) *
            rowsPerPage;


        const end =
            start + rowsPerPage;


        const pageRules =
            filteredRules.slice(
                start,
                end
            );


        // ========================================================
        // Render rows
        // ========================================================

        pageRules.forEach(
            (rule, index) => {


                const rowNumber =
                    start + index + 1;


                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>

                        <strong>
                            ${rowNumber}
                        </strong>

                        <div class="rule-itemset">
                            ${escapeHTML(
                                rule.antecedents
                            )}
                        </div>

                    </td>


                    <td>

                        <div class="rule-itemset">
                            ${escapeHTML(
                                rule.consequents
                            )}
                        </div>

                    </td>


                    <td style="text-align:center;">

                        ${rule.support.toFixed(3)}

                    </td>


                    <td style="text-align:center;">

                        ${rule.confidence.toFixed(3)}

                    </td>


                    <td style="text-align:center;">

                        ${rule.lift.toFixed(2)}

                    </td>

                `;


                tbody.appendChild(row);
            }
        );
    }


    // ============================================================
    // Pagination
    // ============================================================

    function renderPagination() {

        const pagination =
            document.getElementById(
                "pagination"
            );


        if (!pagination) {
            return;
        }


        pagination.innerHTML = "";


        const totalPages =
            Math.ceil(
                filteredRules.length /
                rowsPerPage
            );


        if (totalPages <= 1) {
            return;
        }


        // ========================================================
        // Pagination wrapper
        // ========================================================

        const wrapper =
            document.createElement("div");


        wrapper.className =
            "pretty-pagination";


        // ========================================================
        // Previous button
        // ========================================================

        const previousButton =
            document.createElement("button");


        previousButton.className =
            "pagination-btn pagination-prev";


        previousButton.innerHTML = `

            <i class="bi bi-chevron-left"></i>

            <span>
                Previous
            </span>

        `;


        previousButton.disabled =
            currentPage === 1;


        previousButton.addEventListener(
            "click",
            () => {


                if (currentPage > 1) {

                    currentPage--;


                    renderTable();

                    renderPagination();


                    scrollToTable();
                }
            }
        );


        wrapper.appendChild(
            previousButton
        );


        // ========================================================
        // Page numbers
        // ========================================================

        const pagesContainer =
            document.createElement("div");


        pagesContainer.className =
            "pagination-pages";


        const maxVisiblePages = 5;


        let startPage =
            Math.max(
                1,
                currentPage -
                Math.floor(
                    maxVisiblePages / 2
                )
            );


        let endPage =
            Math.min(
                totalPages,
                startPage +
                maxVisiblePages -
                1
            );


        // Adjust start page
        if (
            endPage -
            startPage +
            1 <
            maxVisiblePages
        ) {

            startPage =
                Math.max(
                    1,
                    endPage -
                    maxVisiblePages +
                    1
                );
        }


        // ========================================================
        // First page
        // ========================================================

        if (startPage > 1) {

            createPageButton(
                1,
                pagesContainer
            );


            if (startPage > 2) {

                const dots =
                    document.createElement(
                        "span"
                    );


                dots.className =
                    "pagination-dots";


                dots.textContent = "…";


                pagesContainer.appendChild(
                    dots
                );
            }
        }


        // ========================================================
        // Visible pages
        // ========================================================

        for (
            let page = startPage;
            page <= endPage;
            page++
        ) {

            createPageButton(
                page,
                pagesContainer
            );
        }


        // ========================================================
        // Last page
        // ========================================================

        if (endPage < totalPages) {

            if (
                endPage <
                totalPages - 1
            ) {

                const dots =
                    document.createElement(
                        "span"
                    );


                dots.className =
                    "pagination-dots";


                dots.textContent = "…";


                pagesContainer.appendChild(
                    dots
                );
            }


            createPageButton(
                totalPages,
                pagesContainer
            );
        }


        wrapper.appendChild(
            pagesContainer
        );


        // ========================================================
        // Next button
        // ========================================================

        const nextButton =
            document.createElement("button");


        nextButton.className =
            "pagination-btn pagination-next";


        nextButton.innerHTML = `

            <span>
                Next
            </span>

            <i class="bi bi-chevron-right"></i>

        `;


        nextButton.disabled =
            currentPage === totalPages;


        nextButton.addEventListener(
            "click",
            () => {


                if (
                    currentPage <
                    totalPages
                ) {

                    currentPage++;


                    renderTable();

                    renderPagination();


                    scrollToTable();
                }
            }
        );


        wrapper.appendChild(
            nextButton
        );


        pagination.appendChild(
            wrapper
        );


        // ========================================================
        // Page Button Function
        // ========================================================

        function createPageButton(
            page,
            container
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "pagination-number";


            if (
                page === currentPage
            ) {

                button.classList.add(
                    "active"
                );
            }


            button.textContent =
                page;


            button.addEventListener(
                "click",
                () => {

                    currentPage =
                        page;


                    renderTable();

                    renderPagination();


                    scrollToTable();
                }
            );


            container.appendChild(
                button
            );
        }
    }


    // ============================================================
    // Scroll to Table
    // ============================================================

    function scrollToTable() {

        const tableWrapper =
            document.querySelector(
                ".rules-table-wrapper"
            );


        if (!tableWrapper) {
            return;
        }


        window.scrollTo({

            top:
                tableWrapper.offsetTop -
                100,

            behavior:
                "smooth"
        });
    }


    // ============================================================
    // Scatter Chart
    // ============================================================

    function renderScatter() {

        const canvas =
            document.getElementById(
                "scatterChart"
            );


        if (!canvas) {
            return;
        }


        // Destroy previous chart
        if (scatterChart) {

            scatterChart.destroy();

            scatterChart = null;
        }


        // No data
        if (filteredRules.length === 0) {
            return;
        }


        // ========================================================
        // Prepare chart data
        // ========================================================

        const points =
            filteredRules.map(rule => ({

                x: rule.support,

                y: rule.confidence,

                lift: rule.lift,

                antecedents:
                    rule.antecedents,

                consequents:
                    rule.consequents

            }));


        // ========================================================
        // Create Chart
        // ========================================================

        scatterChart =
            new Chart(
                canvas,
                {

                    type: "scatter",


                    data: {

                        datasets: [{

                            label:
                                "Association Rules",


                            data:
                                points,


                            backgroundColor:
                                "rgba(13, 110, 253, 0.65)",


                            borderColor:
                                "rgba(13, 110, 253, 1)",


                            pointRadius:
                                function(context) {


                                    const point =
                                        context.raw;


                                    if (!point) {
                                        return 5;
                                    }


                                    return Math.max(

                                        4,

                                        Math.min(
                                            12,
                                            point.lift * 3
                                        )

                                    );
                                }

                        }]

                    },


                    options: {

                        responsive:
                            true,


                        maintainAspectRatio:
                            false,


                        scales: {

                            x: {

                                title: {

                                    display:
                                        true,

                                    text:
                                        "Support"

                                },

                                beginAtZero:
                                    true
                            },


                            y: {

                                title: {

                                    display:
                                        true,

                                    text:
                                        "Confidence"

                                },

                                beginAtZero:
                                    true,

                                max:
                                    1
                            }

                        },


                        plugins: {

                            tooltip: {

                                callbacks: {

                                    title:
                                        function() {

                                            return "Association Rule";
                                        },


                                    label:
                                        function(context) {

                                            const point =
                                                context.raw;


                                            return [

                                                `Antecedent: ${point.antecedents}`,

                                                `Consequent: ${point.consequents}`,

                                                `Support: ${point.x.toFixed(3)}`,

                                                `Confidence: ${point.y.toFixed(3)}`,

                                                `Lift: ${point.lift.toFixed(2)}`

                                            ];
                                        }

                                }

                            },


                            legend: {

                                display:
                                    false
                            }

                        }

                    }

                }
            );
    }


    // ============================================================
    // Search Event
    // ============================================================

    const searchInput =
        document.getElementById(
            "ruleSearch"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );
    }


    // ============================================================
    // Support Filter
    // ============================================================

    const supportInput =
        document.getElementById(
            "minSupport"
        );


    if (supportInput) {

        supportInput.addEventListener(
            "change",
            applyFilters
        );
    }


    // ============================================================
    // Confidence Filter
    // ============================================================

    const confidenceInput =
        document.getElementById(
            "minConfidence"
        );


    if (confidenceInput) {

        confidenceInput.addEventListener(
            "change",
            applyFilters
        );
    }


    // ============================================================
    // Lift Filter
    // ============================================================

    const liftInput =
        document.getElementById(
            "minLift"
        );


    if (liftInput) {

        liftInput.addEventListener(
            "change",
            applyFilters
        );
    }


    // ============================================================
    // HTML Escape
    // ============================================================

    function escapeHTML(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );
    }

});