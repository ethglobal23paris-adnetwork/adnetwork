from ai import save_rating, do_magic_ranking, get_all_ads, save_cid, UploadRequest
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

@app.get("/ads")
async def all_the_ads():
    ads = get_all_ads(limit=100)
    return ads 

@app.post("/upload")
async def upload(params: UploadRequest):
    save_cid(params)
    return {"uploaded": params}

app = cors_app
