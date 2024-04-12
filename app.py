from flask import Flask
from youtube_transcript_api import YoutubeTranscriptApi
# from datetime import datetime

# define a variable to hold you app
app = Flask(__name__)

# define your resource endpoints
app.route('/')
def index_page():
    return "Hello world"

def formatTranscript(transcript):
    formatted = []
    for speech in transcript:
        formatted.append(speech['text'])
        formatted.append(' ')
    return "".join(formatted)


def getTranscript(id):
    '''
        Returns full parsed transcript from Youtube video id
    '''
    transcript = formatTranscript(YoutubeTranscriptApi.get_transcript(id))
    return transcript

def summarize(transcript):
    '''
        Returns the summary of the transcript
    '''



# server the app when this file is run
if __name__ == '__main__':
    app.run()