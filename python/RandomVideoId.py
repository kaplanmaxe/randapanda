import random
class RandomVideoId(object):
	def __init__(self,medium,end_range):
		#0 youtube 1 vimeo
		self.medium=medium
		#end_range is how many characters are in video id (11 youtube, 8 vimeo)
		self.end_range=end_range
	def randomGenerator(self):
		if self.medium==0:
			possible_chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
		elif self.medium==1:
			possible_chars="0123456789"
		characters=[]
		for num in range(0,self.end_range):
			char_option = int(round(random.random() * possible_chars.__len__()))
			characters.append(possible_chars[char_option-1])
		video_id = "".join(characters)
		return video_id