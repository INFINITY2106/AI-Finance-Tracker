/**************************************
  LOGIN PROTECTION
**************************************/

if(
    localStorage.getItem(
        "loggedIn"
    ) !== "true"
)
{
    window.location.href =
    "login.html";
}


/**************************************
  1. GLOBAL VARIABLES
**************************************/

let expenses = [];
let expenseId = 0;

let totalIncome = 0;
let totalExpense = 0;

let expenseChart;
let barChart;


/**************************************
  2. DOM CONTENT LOADED
**************************************/

document.addEventListener("DOMContentLoaded", () => {

const user =
JSON.parse(
    localStorage.getItem(
        "user"
    )
);

if(user)
{
    document.getElementById(
        "profileName"
    ).innerText =
    "Welcome " +
    user.name;
}


    const savedIncome =
localStorage.getItem(
    "income"
);

if(savedIncome)
{
    totalIncome =
    Number(savedIncome);

    document.getElementById(
        "incomeInput"
    ).value =
    totalIncome;
}


const savedTheme =
localStorage.getItem(
    "theme"
);

const themeButton =
document.getElementById(
    "themeToggle"
);

if(savedTheme === "dark")
{
    document.body.classList.add(
        "dark-mode"
    );

    themeButton.innerText =
    "☀ Light Mode";
}
else
{
    themeButton.innerText =
    "🌙 Dark Mode";
}


    const ctx =
    document
        .getElementById("expenseChart")
        .getContext("2d");

    expenseChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [],

            datasets: [{

                label: "Expenses",

                data: [],

                backgroundColor: [
                    "#2563eb",
                    "#16a34a",
                    "#dc2626",
                    "#ca8a04",
                    "#9333ea",
                    "#0891b2",
                    "#ea580c",
                    "#db2777"
                ],

                borderColor: "#ffffff",
                borderWidth: 2

            }]
        },

        options: {

            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });


    const barCtx =
document
    .getElementById("barChart")
    .getContext("2d");

barChart = new Chart(barCtx, {

    type: "bar",

    data: {

        labels: [],

        datasets: [{

            label: "Expense Amount",

            data: [],

            backgroundColor: [
                "#2563eb",
                "#16a34a",
                "#dc2626",
                "#ca8a04",
                "#9333ea",
                "#0891b2",
                "#ea580c",
                "#db2777"
            ]

        }]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        scales: {

            y: {

                beginAtZero: true

            }

        }
    }
});


const savedExpenses =
localStorage.getItem(
    "expenses"
);

if(savedExpenses)
{
    expenses =
    JSON.parse(savedExpenses);

    expenseId =
    expenses.length;

    renderTable();
    calculateTotals();
}


    themeButton.addEventListener(
    "click",
    () =>
{
    document.body.classList.toggle(
        "dark-mode"
    );

    if(
        document.body.classList.contains(
            "dark-mode"
        )
    )
    {
        themeButton.innerText =
        "☀ Light Mode";

        localStorage.setItem(
            "theme",
            "dark"
        );
    }
    else
    {
        themeButton.innerText =
        "🌙 Dark Mode";

        localStorage.setItem(
            "theme",
            "light"
        );
    }
});

});


/**************************************
  2.1 CHART CONFIGURATION
**************************************/

const chartColors = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#ca8a04",
    "#9333ea",
    "#0891b2",
    "#ea580c",
    "#db2777"
];


/**************************************
  3. INCOME SECTION
**************************************/

function setIncome()
{
    totalIncome =
    Number(
        document.getElementById(
            "incomeInput"
        ).value
    );

    localStorage.setItem(
        "income",
        totalIncome
    );

    updateDashboard();
}


/**************************************
  4. EXPENSE SECTION
**************************************/

function addExpense()
{
    const category =
        document.getElementById("category").value;

    const amount =
        Number(document.getElementById("amount").value);

    if(category === "" || amount <= 0)
    {
        alert("Enter valid expense");
        return;
    }

    const expense = {
        id: expenseId++,
        category,
        amount
    };


let duplicate =
expenses.some(
    e =>
    e.category === category &&
    e.amount === amount
);

if(duplicate)
{
    alert(
        "Expense already exists"
    );
    return;
}

    expenses.push(expense);

localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
);

renderTable();

calculateTotals();
}


function renderTable()
{
    const table =
        document.getElementById("expenseTable");

    table.innerHTML = "";

    expenses.forEach(expense =>
    {
        table.innerHTML += `
        <tr>
            <td>${expense.category}</td>
            <td>₹${expense.amount}</td>

            <td>
                <button
                    onclick="editExpense(${expense.id})">
                    Edit
                </button>

                <button
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}


function deleteExpense(id)
{
    expenses =
        expenses.filter(
            expense => expense.id !== id
        );

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    renderTable();

    calculateTotals();
}


function filterExpenses()
{
    const selected =
    document.getElementById(
        "filterCategory"
    ).value;

    const table =
    document.getElementById(
        "expenseTable"
    );

    table.innerHTML = "";

    let filtered =
    selected === "All"
    ? expenses
    : expenses.filter(
        expense =>
        expense.category === selected
    );

    filtered.forEach(expense =>
    {
        table.innerHTML += `
        <tr>
            <td>${expense.category}</td>
            <td>₹${expense.amount}</td>

            <td>
                <button onclick="editExpense(${expense.id})">
                    Edit
                </button>

                <button onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}



/**************************************
  5. EXPENSE EDIT MODAL
**************************************/

let editingExpenseId = null;

function editExpense(id)
{
    let expense =
    expenses.find(
        e => e.id === id
    );

    editingExpenseId = id;

    document.getElementById(
        "editAmount"
    ).value =
    expense.amount;

    document.getElementById(
        "editModal"
    ).style.display =
    "flex";
}

function saveEdit()
{
    let amount =
    Number(
        document.getElementById(
            "editAmount"
        ).value
    );

    let expense =
    expenses.find(
        e => e.id === editingExpenseId
    );

    expense.amount = amount;

localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
);

renderTable();
calculateTotals();

closeModal();
}

function closeModal()
{
    document.getElementById(
        "editModal"
    ).style.display =
    "none";
}



/**************************************
  6. DASHBOARD CALCULATIONS
**************************************/

function calculateTotals()
{
    totalExpense = expenses.reduce(
        (sum, expense) =>
            sum + expense.amount,
        0
    );

    updateDashboard();

    updateChart();
}

function updateDashboard()
{
    updateInsights();
    updateGrowthSuggestions();
    updateAnalytics();
    updateGoalTracker();

    document.getElementById(
        "incomeDisplay"
    ).innerText =
    "₹" + totalIncome;

    document.getElementById(
        "expenseDisplay"
    ).innerText =
    "₹" + totalExpense;

    document.getElementById(
        "savingDisplay"
    ).innerText =
    "₹" +
    (totalIncome - totalExpense);
     updateProgressBar();
}



/**************************************
  7. SUMMARY CARDS
**************************************/

function updateAnalytics()
{
    let savings =
    totalIncome - totalExpense;

    let savingsRate =
    totalIncome > 0
    ? ((savings / totalIncome) * 100)
    : 0;

    let incomeGrowth =
totalIncome > 0
? ((totalIncome / 250000) * 100)
: 0;

document.getElementById(
    "incomeGrowth"
).innerText =
incomeGrowth.toFixed(1) + "%";

    document.getElementById(
        "savingsRate"
    ).innerText =
    savingsRate.toFixed(1) + "%";

    document.getElementById(
        "expenseRisk"
    ).innerText =
    savingsRate < 20
    ? "High"
    : "Low";

    document.getElementById(
        "healthScore"
    ).innerText =
    Math.max(
        0,
        Math.min(
            100,
            Math.round(savingsRate)
        )
    );
}



/**************************************
  8. GOAL TRACKER
**************************************/

function updateGoalTracker()
{
    const targetIncome = 250000;

    let progress =
    totalIncome > 0
    ? (totalIncome / targetIncome) * 100
    : 0;

    progress =
    Math.min(progress, 100);

    document.getElementById(
        "currentIncomeGoal"
    ).innerText =
    "₹" + totalIncome;

    document.getElementById(
        "goalPercentage"
    ).innerText =
    progress.toFixed(1) + "%";

    document.getElementById(
        "goalProgressBar"
    ).style.width =
    progress + "%";
}



/**************************************
  9. BUDGET TRACKER
**************************************/

function updateProgressBar()
{
    let percentage = 0;

    if(totalIncome > 0)
    {
        percentage =
            (totalExpense / totalIncome) * 100;
    }

    percentage =
        Math.min(percentage, 100);

    const bar =
document.getElementById(
    "progressBar"
);

document.getElementById(
    "remainingBudget"
).innerText =
    "Remaining: ₹" +
    (totalIncome - totalExpense);

bar.style.width =
    percentage + "%";

if(percentage < 50)
{
    bar.style.background =
    "#22c55e";
}
else if(percentage < 80)
{
    bar.style.background =
    "#f59e0b";
}
else
{
    bar.style.background =
    "#dc2626";
}

    document.getElementById(
        "progressText"
    ).innerText =
        percentage.toFixed(1) +
        "% Used";
}



/**************************************
  10. AI INSIGHTS
**************************************/

function updateInsights()
{
    let list =
    document.getElementById("insightsList");

    list.innerHTML = "";

    let savings =
    totalIncome - totalExpense;

    if(savings >= totalIncome * 0.4)
    {
        list.innerHTML += `
        <li>✅ Excellent savings habit</li>`;
    }

    if(totalExpense > totalIncome * 0.7)
    {
        list.innerHTML += `
        <li>⚠ Expenses exceed 70% of income</li>`;
    }

    if(totalExpense > totalIncome)
    {
        list.innerHTML += `
        <li>🚨 Budget deficit detected</li>`;
    }
}



/**************************************
  11. GROWTH SUGGESTIONS
**************************************/

function updateGrowthSuggestions() {

    let container =
    document.getElementById("growthCards");

    container.innerHTML = `

        <div class="growth-card">
            🚀 Learn React
        </div>

        <div class="growth-card">
            💼 Build Portfolio
        </div>

        <div class="growth-card">
            🎯 Apply For Internships
        </div>

    `;
}



/**************************************
  12. CHARTS
**************************************/

function updateChart()
{
    if(!expenseChart || !barChart)
    {
        return;
    }

    let categoryTotals = {};

    expenses.forEach(expense =>
    {
        if(categoryTotals[expense.category])
        {
            categoryTotals[expense.category] += expense.amount;
        }
        else
        {
            categoryTotals[expense.category] = expense.amount;
        }
    });

    const labels =
        Object.keys(categoryTotals);

    const values =
        Object.values(categoryTotals);

    // PIE CHART

    expenseChart.data.labels =
        labels;

    expenseChart.data.datasets[0].data =
        values;

    expenseChart.update();

    // BAR CHART

    barChart.data.labels =
        labels;

    barChart.data.datasets[0].data =
        values;

    barChart.update();
}



/**************************************
  13. REPORTS
**************************************/

function generateReport()
{
    let savings =
    totalIncome - totalExpense;

    let categories =
    [...new Set(
        expenses.map(
            e => e.category
        )
    )];

    document.getElementById(
        "reportBox"
    ).innerHTML = `
        <h3>Report Summary</h3>

        <p>Total Income: ₹${totalIncome}</p>

        <p>Total Expense: ₹${totalExpense}</p>

        <p>Savings: ₹${savings}</p>

        <p>
            Expense Categories:
            ${categories.join(", ")}
        </p>
    `;
}


function downloadPDF()
{
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    let savings =
    totalIncome - totalExpense;

    doc.setFontSize(18);

    doc.text(
        "Finance Tracker Report",
        20,
        20
    );

    doc.setFontSize(12);

    doc.text(
        `Income: ₹${totalIncome}`,
        20,
        40
    );

    doc.text(
        `Expense: ₹${totalExpense}`,
        20,
        50
    );

    doc.text(
        `Savings: ₹${savings}`,
        20,
        60
    );

    doc.save(
        "Finance_Report.pdf"
    );
}



/**************************************
  14. AI CHATBOT
**************************************/

function sendMessage()
{
    const input =
    document.getElementById(
        "userInput"
    );

    const chatBox =
    document.getElementById(
        "chatBox"
    );

    if(input.value === "")
        return;

    chatBox.innerHTML += `
        <div class="message user">
            ${input.value}
        </div>
    `;

    let reply = "";

let savings =
totalIncome - totalExpense;

if(
    input.value.toLowerCase().includes("saving")
)
{
    reply =
    `Your current savings are ₹${savings}`;
}
else if(
    input.value.toLowerCase().includes("expense")
)
{
    reply =
    `Your total expenses are ₹${totalExpense}`;
}
else if(
    input.value.toLowerCase().includes("income")
)
{
    reply =
    `Your total income is ₹${totalIncome}`;
}
else
{
    reply =
    "Try asking about income, expenses or savings.";
}

chatBox.innerHTML += `
    <div class="message ai">
        ${reply}
    </div>
`;

    input.value = "";
}



/**************************************
  15. NAVIGATION
**************************************/

function showSection(section) {
    alert("Switching to " + section + " (you can implement hide/show later)");
}


/**************************************
  16. AUTHENTICATION
**************************************/

function login() {
    let email = document.getElementById("email").value;

    localStorage.setItem("user", email);

    window.location.href = "index.html";
}

function logout()
{
    localStorage.removeItem(
        "loggedIn"
    );

    window.location.href =
    "login.html";
}