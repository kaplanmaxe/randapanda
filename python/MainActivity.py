#Imports
from Vimeo import *
from Youtube import *
from DocActions import *

#PARAMATER IS HOW MANY VIDEO_IDs YOU WANT TO CHECK
Vimeo=Vimeo(20)
Vimeo.populate()

# Youtube=Youtube(10)
# Youtube.populate()

#Instantiate
# DocsYoutube=DocActions(0)
DocsVimeo=DocActions(1)

# DocsYoutube.getAll()
# DocsVimeo.getAll()

#Creates Unique Index
# DocsVimeo.createUniqueIndex()

#Delete all docs
# DocsVimeo.deleteAll()