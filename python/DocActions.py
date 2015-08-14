from DBConnect import *
class DocActions(object):
	def __init__(self,medium):
		#0 youtube 1 vimeo
		self.medium=medium
	def getAll(self):
		db=DBConnect("meteor")
		if self.medium==0:
			cursor = db.connect().randa_youtube_videos.find()
		elif self.medium==1:
			cursor = db.connect().randa_vimeo_videos.find()
		for document in cursor:
			print(document)
	def deleteAll(self):
		db=DBConnect("meteor")
		if self.medium==0:
			db.connect().randa_youtube_videos.remove({})
		elif self.medium==1:
			db.connect().randa_vimeo_videos.remove({})
	def createUniqueIndex(self):
		db=DBConnect("meteor")
		if self.medium==0:
			db.connect().randa_youtube_videos.create_index([("randa_id", 1)], unique=True)
		elif self.medium==1:
			db.connect().randa_vimeo_videos.create_index([("randa_id", 1)], unique=True)