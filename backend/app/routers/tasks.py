from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Task, TaskCreate, TaskDB, TaskUpdate, task_from_db

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=list[Task])
def list_tasks(db: Session = Depends(get_db)) -> list[Task]:
    rows = db.scalars(select(TaskDB).order_by(TaskDB.created_at)).all()
    return [task_from_db(r) for r in rows]


@router.post("", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)) -> Task:
    row = TaskDB(
        title=payload.title,
        status=payload.status.value,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return task_from_db(row)


@router.put("/{task_id}", response_model=Task)
def update_task(
    task_id: UUID,
    payload: TaskUpdate,
    db: Session = Depends(get_db),
) -> Task:
    row = db.get(TaskDB, task_id)
    if not row:
        raise HTTPException(status_code=404, detail="Task not found")
    row.status = payload.status.value
    db.commit()
    db.refresh(row)
    return task_from_db(row)


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: UUID, db: Session = Depends(get_db)) -> None:
    row = db.get(TaskDB, task_id)
    if not row:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(row)
    db.commit()
