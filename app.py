from flask import Flask, request
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import T5ForConditionalGeneration, T5Tokenizer

app = Flask(__name__)

tokenizer = T5Tokenizer.from_pretrained("t5-base")
model = T5ForConditionalGeneration.from_pretrained("t5-base")

@app.route('/api/summarize')
def index_page():
    '''
        Returns the summary after extracting the youtube video id from url
    '''
    url = request.args.get('youtube_url')
    id = ''
    params = url.split('?')[1].split('&')
    for param in params:
        if param[0:2] == 'v=':
            id = param[2:]
            break
    summary = summarize(getTranscript(id))
    return summary

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
    transcript = formatTranscript(YouTubeTranscriptApi.get_transcript(id))
    return transcript

def summarize(transcript):
    '''
        Returns the summary of the transcript
    '''
    input_ids = tokenizer.encode("summarize: " + transcript, return_tensors = "pt", max_length = 512, truncation = True)
    output_ids = model.generate(input_ids, max_length = 150, min_length = 40, length_penalty = 2.0, num_beams = 4, early_stopping = True)
    # print(output_ids)
    summary = tokenizer.decode(output_ids[0])
    # print(summary)
    return summary


if __name__ == '__main__':
    app.run(debug = True)