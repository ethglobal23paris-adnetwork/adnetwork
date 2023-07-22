import json


def foobar(text):
    obj = json.loads(text)
    print(obj)
    return {"ok": obj}