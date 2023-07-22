import requests
from ai import save_rating, do_magic_ranking
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import w3storage

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

WEB3_STORAGE_API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ4NjcxQTNlRkMwQWNiOWJCOGRlMTkxRTU3ZjczNGZGYjExRUI4YTgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTAwMjgwMTE0MzYsIm5hbWUiOiJ6YXAifQ.w7Y43yX2S0etFLtbzthh3duoO6FYokHvmX-r9_ddElA'

cors_app = CORSMiddleware(
    app,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hack": "ETHGlobal Paris 2023"}

@app.post("/")
async def relay(text):
    try:
        return {"ok": save_rating(text)}

    except Exception:
        return {"oops": "something went wrong"}

@app.get("/ad")
async def ranking():
    return {"ad_id": do_magic_ranking()}

# This is the endpoint that will be called by the ad server, but it's
# better to upload from the frontend directly
# if that is done, this can be deleted.
@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    w3 = w3storage.API(token=WEB3_STORAGE_API_TOKEN)
    cid = w3.post_upload(file.file)
    # add the record to the database
    return {"cid": cid}

app = cors_app
