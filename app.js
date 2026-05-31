let expenses = [];
let expenseId = 0;

let totalIncome = 0;
let totalExpense = 0;

let expenseData = {};

let expenseChart;
let barChart;

document.addEventListener("DOMContentLoaded", () => {

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

    // DARK MODE

    const themeButton =
    document.getElementById(
        "themeToggle"
    );

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
        }
        else
        {
            themeButton.innerText =
            "🌙 Dark Mode";
        }
    });

});

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

function setIncome()
{
    totalIncome =
    Number(
        document.getElementById(
            "incomeInput"
        ).value
    );

    updateDashboard();
}

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

    expenses.push(expense);

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

    renderTable();

    calculateTotals();
}

function editExpense(id)
{
    const expense =
        expenses.find(
            expense => expense.id === id
        );

    const newAmount =
        prompt(
            "Enter new amount:",
            expense.amount
        );

    if(newAmount !== null)
    {
        expense.amount = Number(newAmount);

        renderTable();

        calculateTotals();
    }
}

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


function updateChart()
{
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

    chatBox.innerHTML += `
        <div class="message ai">
            AI analysis will appear here.
        </div>
    `;

    input.value = "";
}