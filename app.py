from crypt import methods
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_nomes', methods=['POST'])
def get_nomes():
    dados = request.get_json()
    turma = dados['turma']
    nomes = []
    with open('data/' + turma + '.csv') as f:
        nomes = f.read().splitlines()
    return nomes


