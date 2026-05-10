"""Database URL for future SQLAlchemy / Alembic setup."""

import os

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://user:password@localhost:5432/taskmanager",
)
