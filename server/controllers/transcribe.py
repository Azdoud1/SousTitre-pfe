import speech_recognition as sr
import sys

# create a speech recognition object
r = sr.Recognizer()

# a function to recognize speech in the audio file
def transcribe_audio(path):
    # use the audio file as the audio source
    with sr.AudioFile(path) as source:
        audio_listened = r.record(source)
        # try converting it to text
        text = r.recognize_google(audio_listened, language='fr-FR')
    return text

# transcribe the provided audio file
if __name__ == '__main__':
    audio_path = sys.argv[1]
    transcribed_text = transcribe_audio(audio_path)
    print(transcribed_text.encode('utf-8'))
