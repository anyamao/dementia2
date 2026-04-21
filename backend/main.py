# backend/main.py


from dotenv import load_dotenv
import os
load_dotenv(".env.production")  # Or .env based on NODE_ENV

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
import bcrypt
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./users.db")
# --- Database Setup ---
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
SECRET_KEY = os.getenv("SECRET_KEY", "dev-fallback")
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./users.db")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")


# --- Model ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)


# Create tables
Base.metadata.create_all(bind=engine)


# --- Dependency ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Schemas ---
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


# --- Auth Helpers ---
SECRET_KEY = "dev-secret-change-in-prod"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# --- FastAPI App ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Routes ---
@app.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(400, "Username taken")
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(400, "Email already registered")

    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"msg": "User created", "id": db_user.id}


@app.post("/signin", response_model=Token)
def signin(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(401, detail="Invalid credentials")

    token = create_access_token(data={"sub": db_user.username})
    return {"access_token": token, "token_type": "bearer"}


@app.get("/me")
def me(db: Session = Depends(get_db), token: str = Depends(lambda: None)):
    # Simplified for now - we'll add real JWT verification next
    return {"msg": "Protected route works!"}
