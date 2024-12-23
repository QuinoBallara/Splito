# Splito

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## Requirements

- [Node.js](https://nodejs.org/en/download/package-manager)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Instructions

1. Open a terminal in the project root folder
2. Run `docker-compose up --build`
3. That's it! The project is running on http://localhost:3000

## Instructions for devs

1. Follow the instructions above
2. Stop both the backend and frontend containers. Make sure you keep the MongoDB container running
3. Open a terminal in the project root folder
4. Move to the backend folder: `cd backend`
5. Install npm modules: `npm install`
6. Run the backend: `npm run dev`
7. Go back to the project root and move to the frontend folder: `cd ../frontend`
8. Install npm modules: `npm install`
9. Run the frontend: `npm run dev`
10. That's it! The project is running on http://localhost:3000

