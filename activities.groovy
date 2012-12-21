// REST service for resource Activities
import groovy.json.JsonBuilder

//def json = "{activity: {id: 2, type: 'running', duration: '00:39:45', date: '20121102'}}"
//print json

class Activity {
	def id
	def type
	def duration
	def date
}

def act1 = new Activity(id: 1, type: 'running', duration: '00:39:45', date: '20121102')

def builder = new JsonBuilder()
builder.setContent(act1)
//JsonBuilder(act1AsJson: act1)

print(builder.toString())