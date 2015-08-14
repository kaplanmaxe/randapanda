import urllib2
# import json
class HTTPRequest(object):
	def __init__(self,video_id,medium):
		self.video_id=video_id
		#0 youtube 1 vimeo
		self.medium = medium
	def httpGet(self):
		if self.medium==0:
			url = "http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=" + self.video_id + "&format=json"
		elif self.medium==1:
			url="https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + self.video_id
		try:
			#makes the HTTP request
			http_request = urllib2.urlopen(url)
			#Reads the data in an understandable manner
			http_data = http_request.read()
			# json.loads(http_request)
			http_request.close()

		except urllib2.HTTPError:
			#give 404 error
			http_data = 404
		#return data
		return http_data