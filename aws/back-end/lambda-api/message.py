import json

class Message:

    def __init__(self, content, detail):
        self.content = content
        self.detail = detail

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, ensure_ascii=False)
