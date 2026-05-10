from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import create_access_token, hash_password, verify_password
from app.database import get_db
from app.models import UserDB

router = APIRouter(prefix="/auth", tags=["auth"])


class RegisterBody(BaseModel):
    username: str = Field(..., min_length=1, max_length=128)
    password: str = Field(..., min_length=1, max_length=256)


class LoginBody(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserPublic(BaseModel):
    username: str


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def register(data: RegisterBody, db: Session = Depends(get_db)) -> UserPublic:
    existing = db.scalar(select(UserDB).where(UserDB.username == data.username))
    if existing:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )
    user = UserDB(
        username=data.username,
        hashed_password=hash_password(data.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return UserPublic(username=user.username)


@router.post("/login", response_model=TokenResponse)
def login(data: LoginBody, db: Session = Depends(get_db)) -> TokenResponse:
    user = db.scalar(select(UserDB).where(UserDB.username == data.username))
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    token = create_access_token(username=user.username)
    return TokenResponse(access_token=token)
