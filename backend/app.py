from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import uvicorn
import logging
from utils.config import SERVER_PORT
from utils.router import router
from utils.run_shell_command import run_shell_commands
from utils.data_must_exist_db import data_that_must_exist_in_the_database
from utils.remove_orphaned_files import check_and_remove_orphaned_files
from apscheduler.schedulers.background import BackgroundScheduler
from utils.backup_database import backup_database

# FastAPI instance
app = FastAPI(
    title="App E-Commerce FastAPI",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(router)

# static files
base_dir = os.path.dirname(os.path.abspath(__file__))
uploads_dir = os.path.join(base_dir, "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/api/image", StaticFiles(directory=uploads_dir))

# scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(check_and_remove_orphaned_files, 'interval', hours=1)
scheduler.add_job(data_that_must_exist_in_the_database, 'interval', days=1)
scheduler.add_job(backup_database, 'cron', hour=0, minute=0)
scheduler.start()

# filter loggin terminal
logging.getLogger("uvicorn.access").addFilter(
    lambda record: "/api/image" not in record.getMessage()
)


@app.get("/")
def root():
    data_that_must_exist_in_the_database()
    check_and_remove_orphaned_files()
    backup_database()
    return {"message": app.title}


# run the server
if __name__ == "__main__":
    run_shell_commands()
    data_that_must_exist_in_the_database()
    check_and_remove_orphaned_files()
    backup_database()
    uvicorn.run(
        "app:app", host="0.0.0.0",
        reload=True,
        port=int(SERVER_PORT)  # type: ignore
    )
