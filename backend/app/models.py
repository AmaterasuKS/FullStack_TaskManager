from datetime import datetime, timezone
from enum import Enum
from uuid import UUID, uuid4

from pydantic import BaseModel


class TaskStatus(str, Enum):
    todo = "todo"
    inprogress = "inprogress"
    done = "done"


class Task(BaseModel):
    id: UUID
    title: str
    status: TaskStatus
    created_at: datetime


class TaskCreate(BaseModel):
    title: str
    status: TaskStatus = TaskStatus.todo


class TaskUpdate(BaseModel):
    status: TaskStatus


def new_task(payload: TaskCreate) -> Task:
    return Task(
        id=uuid4(),
        title=payload.title,
        status=payload.status,
        created_at=datetime.now(timezone.utc),
    )
