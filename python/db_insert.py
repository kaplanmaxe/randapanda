
from RandomVideoId import *
from DBConnect import *
from HTTPRequest import *

random=RandomVideoId()
print(random.randomGenerator())

db=DBConnect("meteor")
cursor = db.connect().randa_videos.find()
for document in cursor:
	print(document)

http=HTTPRequest('D7Qgbs8RpN4')
embed_info = http.httpGet()
print(embed_info)

