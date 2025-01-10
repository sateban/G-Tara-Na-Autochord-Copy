from flask import Flask, request, render_template, jsonify, send_from_directory
import os

# Chord detection imports
import autochord
from scipy.io.wavfile import write
import numpy as np
# End chord detection imports

# App configuration
app = Flask(__name__)
app.config['TEMP_FOLDER'] = 'temp'
app.config['CHORDS_FOLDER'] = 'static/mp3'
app.config['HISTORY_FILE'] = app.config['TEMP_FOLDER'] + "/chord_history.txt"
# End app configuration

# Create temp folder if it doesn't exist
if not os.path.exists(app.config['TEMP_FOLDER']):
    os.makedirs(app.config['TEMP_FOLDER'])
# End create temp folder

# Backend API

# Chord detection
@app.route('/api/detect', methods=['POST'])
def detect():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file:
        filepath = os.path.join(app.config['TEMP_FOLDER'], file.filename)
        file.save(filepath)
        chords = autochord.recognize(filepath)
        chord_names = [chord[2] for chord in chords]  # Extract only the chord names

        # Append detected chords to history file
        with open(app.config['HISTORY_FILE'], 'a') as history_file:
            for chord in chord_names:
                history_file.write(f"{chord}\n")

        return jsonify({'chords': chord_names})
# End chord detection

@app.route('/api/check_chord', methods=['POST'])
def check_chord():
    selected_chord = request.form.get('selected_chord')
    file = request.files['file']
    filepath = os.path.join(app.config['TEMP_FOLDER'], file.filename)
    file.save(filepath)
    chords = autochord.recognize(filepath)
    detected_chord = chords[0][2]  # Assuming the first detected chord is the one to check

    is_correct = selected_chord == detected_chord

    return jsonify({'selected_chord': selected_chord, 'detected_chord': detected_chord, 'is_correct': is_correct})

@app.route('/api/history')
def history():
    if os.path.exists(app.config['HISTORY_FILE']):
        with open(app.config['HISTORY_FILE'], 'r') as history_file:
            history_content = history_file.readlines()
    else:
        history_content = []
    return history_content

# Frontend

# Home page
@app.route('/')
def index():
    return render_template('index.html')
# End home page

# Major
@app.route('/major')
def major():
    return render_template('major.html')
# End major

# Minor
@app.route('/minor')
def minor():
    return render_template('minor.html')
# End minor

# Test frontend

# Home page
@app.route('/test_frontend')
def test_index():
    return render_template('test_frontend/index.html')
# End home page

# Chord detection
@app.route('/test_frontend/detect')
def test_detection():
    return render_template('test_frontend/chord_detection.html')
# End chord detection

# Chord check
@app.route('/test_frontend/check')
def test_check_chord_page():
    return render_template('test_frontend/chord_check.html')
# End chord check

# Chord player
def get_mp3_files(directory):
    mp3_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.mp3'):
                relative_path = os.path.relpath(os.path.join(root, file), directory)
                mp3_files.append(relative_path)
    return mp3_files

@app.route('/test_frontend/player')
def test_index_player():
    mp3_files = get_mp3_files(app.config['CHORDS_FOLDER'])
    return render_template('test_frontend/chord_player.html', mp3_files=mp3_files)

@app.route('/test_frontend/player/play/<path:filename>')
def play(filename):
    return send_from_directory(app.config['CHORDS_FOLDER'], filename)
# End chord player

# Chord history
@app.route('/test_frontend/history')
def test_history_page():
    if os.path.exists(app.config['HISTORY_FILE']):
        with open(app.config['HISTORY_FILE'], 'r') as history_file:
            history_content = history_file.readlines()
    else:
        history_content = []
    return render_template('test_frontend/chord_history.html', history=history_content)
# End chord history

if __name__ == '__main__':
    app.run(debug=False)