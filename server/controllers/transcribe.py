import speech_recognition as sr
import sys
import nltk

r = sr.Recognizer()

def transcribe_audio(path):
    # use the audio file as the audio source
    with sr.AudioFile(path) as source:
        audio_listened = r.record(source)
        # try converting it to text
        text = r.recognize_google(audio_listened, language='fr-FR')

    # split the text into words
    words = nltk.word_tokenize(text)

    # calculate the duration of each word
    average_reading_speed = 0.1026 # average reading speed in characters per second
    word_durations = [len(word) * average_reading_speed for word in words]

    # create a list to store the transcribed text with word durations and metadata
    transcribed_text_with_metadata = []
    total_duration = 0.0
    start_time = 0.0
    # initialize the start time of the first segment
    for i, word in enumerate(words):
        if i % 6 == 0 and i != 0:
            segment = " ".join(words[i-6:i])
            end_time = start_time + total_duration  # calculate the end time based on the total duration
            metadata = {"start_time": start_time, "end_time": end_time}
            transcribed_text_with_metadata.append((segment, metadata))
            start_time = end_time  # update the start time for the next segment
            total_duration = 0.0
        total_duration += word_durations[i]

    # append the remaining words if any
    if total_duration > 0.0:
        segment = " ".join(words[len(words)-6:])
        end_time = start_time + total_duration  # calculate the end time based on the total duration
        metadata = {"start_time": start_time, "end_time": end_time}
        transcribed_text_with_metadata.append((segment, metadata))

    # return the transcribed text with word durations and metadata
    return transcribed_text_with_metadata

if _name_ == '_main_':
    audio_path = sys.argv[1]
    transcribed_text_with_metadata = transcribe_audio(audio_path)

    # print the transcribed text with word durations and metadata
    print("Transcription with Word Durations and Metadata:")
    minutes = 0
    remaining_seconds = 0
    minutesend = 0
    remaining_secondsend = 0
    for segment, metadata in transcribed_text_with_metadata:
        minutes=int(metadata['start_time'] // 60)
        remaining_seconds=int(metadata['start_time'] % 60)
        minutesend=int(metadata['end_time'] // 60)
        remaining_secondsend=int(metadata['end_time'] % 60)
        print(f"{minutes},{remaining_seconds}-")
        print(f"{segment}")
        print(f"-{minutesend},{remaining_secondsend}")
        print()
