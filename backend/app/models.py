import uuid
from datetime import datetime
from enum import Enum
from uuid import UUID

from pydantic import BaseModel
from sqlalchemy import DateTime, String
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class TaskStatus(str, Enum):
    todo = "todo"
    inprogress = "inprogress"
    done = "done"


class Task(BaseModel):
    id: UUID
    title: str
    status: TaskStatus
    created_at: datetime
    owner_username: str


class TaskCreate(BaseModel):
    title: str
    status: TaskStatus = TaskStatus.todo


class TaskUpdate(BaseModel):
    status: TaskStatus


class UserDB(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    username: Mapped[str] = mapped_column(String(128), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )


class TaskDB(Base):
    __tablename__ = "tasks"

    id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    title: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False, default="todo")
    owner_username: Mapped[str] = mapped_column(String(128), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )


def task_from_db(row: TaskDB) -> Task:
    return Task(
        id=row.id,
        title=row.title,
        status=TaskStatus(row.status),
        created_at=row.created_at,
        owner_username=row.owner_username,
    )
