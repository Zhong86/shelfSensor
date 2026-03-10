# 📚ShelfSensor - Book Manager 
A full-stack practice project built with **React** and **Java Spring Boot**. This system aims to help users manage, track and review their personal book collections. Although, the database of books used for this project is temporary and not an actual library.

--- 

## 🛠 Tech Stack
|     Layer      |          Technology          |
|--------------- | ---------------------------- |
| Frontend       | React & Bootstrap CSS        |
| Backend        | Java Spring Boot             |
| Database       | MariaDB                      |
| Authentication | Spring Security: JWT + BCrypt|

--- 

## Features  
- Search book based off ISBN <br>
- View recommended books <br>
- Filter books based on GENRE, FAVORITES, STATUS, RATING <br>
- Set reading status: `READING` · `READ LATER` · `COMPLETED` <br>
- Favorite books for quick access <br>
- Add personal notes <br>
- Give reviews for others to see <br>

## Authentication  
- Password hashing with BCrypt <br> 
- JWT Tokens stored in DB & cookies <br>
- CORS configured for front-end server only <br>

## API Endpoints  
- Users: CRUD <br>
- Reviews: CUD, Get based on book_id <br>
- Books: Get based on genre/author/rating <br>
