# backend/main_minimal.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import sqlite3, bcrypt

app = FastAPI()

# Init DB
conn = sqlite3.connect("test.db", check_same_thread=False)
conn.execute(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, email TEXT UNIQUE, password TEXT)"
)


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


@app.post("/signup")
def signup(u: UserCreate):
    try:
        hashed = bcrypt.hashpw(u.password.encode(), bcrypt.gensalt()).decode()
        conn.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            (u.username, u.email, hashed),
        )
        conn.commit()
        return {"msg": "OK", "username": u.username}
    except sqlite3.IntegrityError:
        raise HTTPException(400, "Username or email exists")
    except Exception as e:
        raise HTTPException(500, str(e))  # Now you'll see the real error
