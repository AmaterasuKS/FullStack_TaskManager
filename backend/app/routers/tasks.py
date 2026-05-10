from datetime import datetime, timedelta, timezone
from uuid import UUID

from fastapi import APIRouter, HTTPException, status

from app.models import Task, TaskCreate, TaskStatus, TaskUpdate, new_task

router = APIRouter(prefix="/tasks", tags=["tasks"])

tasks_db: dict[UUID, Task] = {}


def _seed_demo() -> None:
    if tasks_db:
        return
    now = datetime.now(timezone.utc)
    demos = [
        Task(
            id=UUID("11111111-1111-1111-1111-111111111111"),
            title="Спроектировать API задач",
            status=TaskStatus.todo,
            created_at=now - timedelta(days=2),
        ),
        Task(
            id=UUID("22222222-2222-2222-2222-222222222222"),
            title="Сверстать прототип досок",
            status=TaskStatus.inprogress,
            created_at=now - timedelta(days=1),
        ),
        Task(
            id=UUID("33333333-3333-3333-3333-333333333333"),
            title="Подключить FastAPI к фронту",
            status=TaskStatus.done,
            created_at=now - timedelta(hours=1),
        ),
    ]
    for t in demos:
        tasks_db[t.id] = t


_seed_demo()


@router.get("", response_model=list[Task])
def list_tasks() -> list[Task]:
    return sorted(tasks_db.values(), key=lambda t: t.created_at)


@router.post("", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate) -> Task:
    task = new_task(payload)
    tasks_db[task.id] = task
    return task


@router.put("/{task_id}", response_model=Task)
def update_task(task_id: UUID, payload: TaskUpdate) -> Task:
    task = tasks_db.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    updated = task.model_copy(update={"status": payload.status})
    tasks_db[task_id] = updated
    return updated


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: UUID) -> None:
    if task_id not in tasks_db:
        raise HTTPException(status_code=404, detail="Task not found")
    del tasks_db[task_id]
