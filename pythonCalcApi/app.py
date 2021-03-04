from flask import Flask, request, jsonify
import time
import math
app = Flask(__name__)


@app.route('/calc', methods=['GET', 'POST'])
def receber():
    data = request.json
    print(data)
    jsonify(data)

    result = str
    if(data.get('c1') != '' and data.get('c2') != '' and data.get('h') != ''):
        result = ("Digite apenas dois números")
    elif(data.get('c1') == '' and data.get('c2') == '' and data.get('h') == ''):
        result = ('digite um numero')
    elif (data.get('h') == ''):
        hypot = math.hypot(float(data.get('c1')), float(data.get('c2')))
        result = ("Hipotenusa: ") + str(hypot)
        print(hypot)
    elif (data.get('c1') == ''):
        catetoB = math.pow(int(data.get('c2')), 2)
        hip = math.pow(int(data.get('h')), 2)
        result = ("Cateto 1: ") + str(math.sqrt(hip - catetoB))
    elif(data.get('c2') == ''):
        catetoA = math.pow(int(data.get('c1')), 2)
        hip = math.pow(int(data.get('h')), 2)
        result = ("Cateto 2: ") + str(math.sqrt(hip - catetoA))
    return result
