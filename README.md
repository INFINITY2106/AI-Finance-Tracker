# 💰 AI Finance Tracker

An AI-powered personal finance management application built using **Spring Boot, MongoDB, JavaScript, and Ollama Local LLM**.

The application allows users to track expenses, visualize spending patterns, manage financial records, and interact with an AI Financial Assistant that provides insights based on stored expense data.

---

# 🚀 Features

## 📌 Expense Management

* Add new expenses
* Edit existing expenses
* Delete expenses
* View all expenses
* Store expense category, amount and date
* Automatic MongoDB ObjectId generation

## 📊 Dashboard Analytics

* Total income tracking
* Total expense calculation
* Expense statistics
* Highest expense detection
* Average expense calculation
* Category-based visualization

## 📈 Data Visualization

Implemented using:

* Pie Charts
* Bar Charts

to understand spending distribution.

## 🌙 Dark Mode

* User-friendly dark/light theme switching
* Theme preference stored using Local Storage

## 🤖 AI Financial Assistant

Integrated a local AI chatbot using:

* Ollama
* Gemma 2B Large Language Model

The chatbot can:

* Answer finance-related questions
* Analyze stored expenses
* Provide spending insights
* Answer general technical questions

Example:

User:

```
How many expenses do I have?
```

AI:

```
You have 3 expenses:
Food ₹10000
Travel ₹5000
Movies ₹4000
```

---

# 🏗️ System Architecture

```
                 Frontend
                    |
                    |
              JavaScript Fetch()
                    |
                    |
              Spring Boot API
                    |
        -----------------------
        |                     |
 Controller Layer        Chat Controller
        |                     |
        |                     |
 Service Layer          Chat Service
        |                     |
        |                     |
 Repository Layer        Ollama API
        |                     |
        |                     |
     MongoDB             Gemma 2B Model
```

---

# 🔄 Application Workflow

## Expense Addition Flow

```
User enters expense
        |
        |
Frontend JavaScript
(fetch POST request)
        |
        |
Spring Boot Controller
        |
        |
Service Layer
(Business Logic)
        |
        |
Repository Layer
        |
        |
MongoDB Database
        |
        |
Expense Stored
```

---

## Expense Retrieval Flow

```
Frontend requests data

        |

GET API Request

        |

Spring Boot Controller

        |

ExpenseRepository.findAll()

        |

MongoDB

        |

JSON Response

        |

Dashboard Update
```

---

## AI Chatbot Workflow

```
User Question

      |

Frontend Chat UI

      |

POST /api/chat

      |

ChatController

      |

ChatService

      |

Retrieve Expense Data

      |

Create AI Prompt

      |

Ollama API

      |

Gemma 2B Model

      |

AI Response

      |

Frontend Display
```

---

# 🛠️ Tech Stack

## Frontend

* HTML5
* CSS3
* JavaScript
* Chart.js
* Fetch API

## Backend

* Java
* Spring Boot
* Spring MVC
* REST API
* Dependency Injection

## Database

* MongoDB
* Spring Data MongoDB
* MongoRepository

## AI Integration

* Ollama Local LLM Runtime
* Gemma 2B Model
* Prompt Engineering
* Context Injection

## Build Tool

* Apache Maven

---

# 📂 Backend Architecture

```
src/main/java

 ├── Controller
 │
 │    ├── ExpenseController
 │    └── ChatController
 │
 ├── Service
 │
 │    ├── ExpenseService
 │    └── ChatService
 │
 ├── Repository
 │
 │    └── ExpenseRepository
 │
 └── Model
      |
      └── Expense
```

---

# 🔌 REST API Endpoints

## Create Expense

```
POST /api/expenses
```

Creates a new expense record.

## Get Expenses

```
GET /api/expenses
```

Retrieves all stored expenses.

## Update Expense

```
PUT /api/expenses/{id}
```

Updates existing expense information.

## Delete Expense

```
DELETE /api/expenses/{id}
```

Removes an expense.

## AI Chat

```
POST /api/chat
```

Sends user questions to AI assistant.

---

# 🗄️ MongoDB Data Structure

Each expense is stored as a document:

```json
{
 "_id":"generated_object_id",
 "category":"Food",
 "amount":5000,
 "date":"2026-06-19"
}
```

MongoDB was selected because:

* Document-based storage
* Flexible schema
* Natural JSON compatibility
* Easy Spring Boot integration

---

# 🤖 AI Implementation Explanation

The AI model is NOT trained on user data.

The application uses:

## Context Injection

Process:

```
MongoDB Expense Data

        +

User Question

        |

AI Prompt

        |

Gemma 2B

        |

Generated Response
```

The model remains unchanged.

Only the prompt context changes.

---

# 🔐 Security Considerations

Current implementation:

* Local authentication system
* Local data storage
* No external AI API dependency

Future security upgrades:

* JWT Authentication
* Password encryption using BCrypt
* Role-based authorization
* HTTPS communication
* TLS certificate implementation
* Secure API validation
* Environment variable based secrets

---

# 🚀 Future Enhancements

## Authentication

* JWT based login system
* User-specific expense data
* Secure session management

## Security

* HTTPS support
* TLS encryption
* API rate limiting
* Input sanitization

## AI Improvements

* Better financial recommendations
* Expense prediction
* Spending pattern analysis
* RAG based AI architecture
* Larger local models

## Finance Features

* Monthly reports
* Budget planning
* Savings prediction
* Email notifications
* Export reports as PDF

## Deployment

Future deployment:

```
Frontend
   |
Cloud Hosting

Backend
   |
Spring Boot Server

Database
   |
MongoDB Atlas

AI
   |
Local/Private LLM Server
```

---

# 📚 Learning Outcomes

Through this project I learned:

* Full Stack Application Development
* REST API Design
* Spring Boot Architecture
* MongoDB Integration
* CRUD Operations
* Dependency Injection
* Local LLM Integration
* Prompt Engineering
* AI + Backend Integration

---

# 👨‍💻 Author

Abhay Kekunnaya

---

# ⭐ Project Status

Completed Version 1.0

Future improvements will focus on:

* Security
* AI intelligence
* Scalability
* Deployment