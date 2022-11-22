import json
import os
from flask import Flask, redirect, url_for, render_template
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['UPLOAD_FOLDER'] = 'serverimage'

@app.route("/main", methods=["GET"])
def GETmethodmain():
    with open('data.json', 'r') as f:
        data = json.loads("\n".join(f.readlines()))
    return {"style": " ".join(data['styles']['neutral'])+" ".join(data['styles']['main']), "html": data['html']['main'], "central": data['html']['central'], "buttons": data['buttons']}

@app.route("/canvas", methods=["GET"])
def GETmethodcanvas():
    with open('data.json', 'r') as f:
        data = json.loads("\n".join(f.readlines()))
    return {"style": "".join(data['styles']['neutral'])+"".join(data['styles']['canvas']), "html": data['html']['canvas'], "central": data['html']['central'], "buttons": data['buttons']}

@app.route("/serverimage")
def display():
    return redirect(url_for('static', filename='serverimage/texture.jpg'), code=301)
app.run(debug=True)