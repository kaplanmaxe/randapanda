from RandomVideoId import *
from DBConnect import *
from HTTPRequest import *
import datetime

class Vimeo(object):
	def __init__(self,loops):
		self.loops=loops
	def populate(self):
		count_found=0;
		count_unfound=0
		db=DBConnect("meteor")
		connection = db.connect()
		for count in range(0,self.loops):
			#Generate Video ID

			random=RandomVideoId(1,8)
			video_id = random.randomGenerator()

			#Perform HTTP Request

			http=HTTPRequest(video_id,1)
			embed_info = http.httpGet()

			#Connect and Insert Into DB if a Video Exists

			#If a video is found
			key = connection.randa_vimeo_videos.count() + 1
			if embed_info!=404:
				data = {"key": key,
						"randa_id": video_id,
						"date": datetime.datetime.utcnow()}
				try:
					inserted = connection.randa_vimeo_videos.insert_one(data).inserted_id
					count_found+=1
					print video_id + " was inserted: " + str(count+1)
				except pymongo.errors.DuplicateKeyError:
					print video_id + "is already in the collection."
			else:
				print video_id + " does not exist: " + str(count+1)
				count_unfound+=1
		#Print Results of Script
		print str(count_found) + " videos found and " + str(count_unfound) + " videos not found."	
		#Show Output of DB After
		# db=DBConnect("meteor")
		# cursor = db.connect().randa_vimeo_videos.find()
		# for document in cursor:
		# 	print(document)

		#Debug Stuff To Use To Troubleshoot If Necessary

		# EMPTY DATABASE
		# db=DBConnect("meteor")
		# db.connect().randa_videos.remove({})

		#KNOWN VIDEO THAT WORKS
		# http=HTTPRequest("D7Qgbs8RpN4")

		# print(video_id)
		# print(embed_info)