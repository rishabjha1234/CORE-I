# Student Result Management System

A very small beginner project for learning MongoDB CRUD with Express and Mongoose.

## What students will learn

1. How an HTTP request reaches an Express route.
2. How a Mongoose schema describes a MongoDB document.
3. How `create`, `find`, `findByIdAndUpdate`, and `findByIdAndDelete` implement CRUD.
4. Why validation and useful HTTP status codes matter.

## Prerequisites

- Node.js installed
- MongoDB Community Server running locally

The local MongoDB connection used here is:

```text
mongodb://127.0.0.1:27017/student_result_db
```

MongoDB creates the database and collection when the first student is inserted.

## Run the project

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The API runs at `http://localhost:5000`.

## Student fields

| Field | Type | Required | Rule |
|---|---|---:|---|
| `name` | String | Yes | At least 2 characters |
| `rollNumber` | String | Yes | Must be unique |
| `course` | String | Yes | For example, B.Tech CSE |
| `marks` | Number | Yes | 0 to 100 |
| `result` | String | Yes | `Pass` or `Fail` |

MongoDB/Mongoose also creates `_id`, `createdAt`, and `updatedAt`.

## CRUD API

### Create

`POST /api/students`

```json
{
  "name": "Aarav Sharma",
  "rollNumber": "CSE001",
  "course": "B.Tech CSE",
  "marks": 82,
  "result": "Pass"
}
```

### Read all

`GET /api/students`

### Read one

`GET /api/students/:id`

Replace `:id` with the `_id` returned by MongoDB.

### Update

`PUT /api/students/:id`

```json
{
  "marks": 88,
  "result": "Pass"
}
```

### Delete

`DELETE /api/students/:id`

## Teaching flow

### 1. Database

MongoDB stores JSON-like documents in collections. This application uses the `students` collection inside `student_result_db`.

### 2. Schema and model

`studentSchema` in `src/models/student.model.js` is the rule book: it defines field types, required values, ranges, and the unique roll number. `mongoose.model("Student", studentSchema)` creates the `Student` model. The model is the object used by JavaScript code to talk to MongoDB.

### 3. Request parsing

`app.use(express.json())` converts a JSON request body into `req.body`. Without it, `req.body` is usually `undefined`.

### 4. Routes

Routes map HTTP method plus URL to a controller:

| HTTP request | Controller | MongoDB operation |
|---|---|---|
| `POST /api/students` | `createStudent` | `Student.create()` |
| `GET /api/students` | `getAllStudents` | `Student.find()` |
| `GET /api/students/:id` | `getStudentById` | `Student.findById()` |
| `PUT /api/students/:id` | `updateStudent` | `Student.findByIdAndUpdate()` |
| `DELETE /api/students/:id` | `deleteStudent` | `Student.findByIdAndDelete()` |

### 5. Why `async` and `await`?

MongoDB operations take time because the program communicates with another process. Mongoose returns a Promise. `await` waits for that Promise while keeping the code readable; `try/catch` sends failures to the error middleware.

### 6. Important update options

`new: true` returns the updated document instead of the old one. `runValidators: true` makes Mongoose apply schema validation during an update too.

### 7. HTTP status codes

- `200`: successful read, update, or delete
- `201`: a new student was created
- `400`: invalid input or invalid MongoDB id
- `404`: student does not exist
- `409`: duplicate roll number
- `500`: unexpected server failure

## Suggested classroom exercises

1. Insert two students and retrieve all students.
2. Copy one returned `_id` and update its marks.
3. Try a marks value of `120` and observe validation.
4. Try the same `rollNumber` twice and observe the `409` response.
5. Delete one student and verify it is gone with `GET`.
6. Add a `GET /api/students/pass` endpoint as the next exercise.
