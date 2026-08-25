import os
from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter(prefix="/api/resume", tags=["resume"])

RESUME_PATH = os.path.join(os.path.dirname(__file__), "..", "assets", "Sonal_Talukdar_Resume.pdf")


@router.get("")
def download_resume():
    return FileResponse(RESUME_PATH, media_type="application/pdf", filename="Sonal_Talukdar_Resume.pdf")