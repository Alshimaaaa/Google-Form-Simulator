Form Simulator
A full-stack web application that allows users to create forms,submit responses, and view responses submmited to you form.

Features:
- User authentication using JWT
- Create forms with multiple question types (Text, Multiple Choice, Checkbox)
- Submit responses for other forms
- View submitted responses for you forms
- View all forms that you created
- RESTful API with Swagger documentation

Backend:
- Django + Django REST Framework
- JWT Authentication 
- SQLite (basic django admin db)

Frontend:
- React.js
- Fetch API for async operations
- LocalStorage for token handling

API Docs:
- Swagger (auto-generated with drf-yasg)
  swagger doc available at form-simulator\project\schema.json and available at http://localhost:8000/swagger/ when you run the backend

Visit the deployed frontend here: https://google-form-simulator-52te.vercel.app/
