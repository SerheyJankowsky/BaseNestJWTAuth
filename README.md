Routes:

http://localhost:3000/auth/signup - body {
userName: string;
password: string;
confirmationPassword: string;
firstName: string;
lastName: string;
email: string;
}

http://localhost:3000/auth/login - body {
email: string;
password: string;
}

http://localhost:3000/auth/user - protected route , you need auth and add token to headers (
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNlcmhleSIsInBhc3N3b3JkIjoiJGFyZ29uMmlkJHY9MTkkbT02NTUzNix0PTMscD00JHNJNXBqaS9wUjFnQ2lKMERtM1Z2QXckdDdyam1QSG9JSzlXUFRYYVhGbXR0R0dwRWJjQ2Z0K01BWGcxQnZCbW5SNCIsImVtYWlsIjoiVHVwaWxvd0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJTZXJoZXkiLCJsYXN0TmFtZSI6IlR1cGlsb3ciLCJpYXQiOjE2NzU1MTA2OTh9.WmB_y7qnXTfcuA0K_bBya7TOXKo_ioh71O-g8gVv3fQ
)
