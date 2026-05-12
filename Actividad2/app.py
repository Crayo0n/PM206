from flask import Flask, render_template, request, session, redirect, url_for
import os
import json

app = Flask(__name__)
app.secret_key = 'pm206_secret_key'

def cargar_secciones():
    ruta_datos = os.path.join(os.path.dirname(__file__), 'datos.json')
    with open(ruta_datos, 'r', encoding='utf-8') as f:
        return json.load(f)

SECCIONES = cargar_secciones()

@app.route('/')
def index():
    if 'secciones_desbloqueadas' not in session:
        primer_seccion = SECCIONES[0]['id'] if SECCIONES else 'reglas'
        session['secciones_desbloqueadas'] = [primer_seccion]
        session['preguntas_respondidas'] = {}
        session['compromisos'] = []

    secciones = []
    for i, sec in enumerate(SECCIONES):
        estado = 'bloqueada'
        if sec['id'] in session['secciones_desbloqueadas']:
            estado = 'desbloqueada'
        elif i > 0 and SECCIONES[i-1]['id'] in session['compromisos']:
            estado = 'casi_lista'

        preguntas_respondidas = session['preguntas_respondidas'].get(sec['id'], 0)
        secciones.append({
            'id': sec['id'],
            'nombre': sec['nombre'],
            'descripcion': sec['descripcion'],
            'estado': estado,
            'preguntas_respondidas': preguntas_respondidas
        })

    return render_template('index.html', secciones=secciones)

@app.route('/seccion/<seccion_id>')
def ver_seccion(seccion_id):
    if seccion_id not in session['secciones_desbloqueadas']:
        return redirect(url_for('index'))

    seccion = next((s for s in SECCIONES if s['id'] == seccion_id), None)
    if not seccion:
        return redirect(url_for('index'))

    return render_template('seccion.html', seccion=seccion)

@app.route('/pregunta/<seccion_id>')
def hacer_pregunta(seccion_id):
    if seccion_id not in session['secciones_desbloqueadas']:
        return redirect(url_for('index'))

    seccion = next((s for s in SECCIONES if s['id'] == seccion_id), None)
    if not seccion:
        return redirect(url_for('index'))

    respondidas = session['preguntas_respondidas'].get(seccion_id, 0)
    return render_template('pregunta.html', seccion=seccion, respondidas=respondidas)

@app.route('/responder/<seccion_id>', methods=['POST'])
def responder(seccion_id):
    if seccion_id not in session['secciones_desbloqueadas']:
        return redirect(url_for('index'))

    seccion = next((s for s in SECCIONES if s['id'] == seccion_id), None)
    if not seccion:
        return redirect(url_for('index'))

    correctas = 0
    total = len(seccion['preguntas'])
    
    for i, pregunta in enumerate(seccion['preguntas']):
        respuesta_usuario = request.form.get(f'respuesta_{i}')
        if respuesta_usuario is not None and int(respuesta_usuario) == pregunta['respuesta_correcta']:
            correctas += 1

    es_correcta = (correctas == total)

    if es_correcta:
        session['preguntas_respondidas'][seccion_id] = total
        session.modified = True

    return render_template('resultado.html', seccion=seccion, es_correcta=es_correcta, correctas=correctas, total=total)

@app.route('/compromiso/<seccion_id>', methods=['POST'])
def marcar_compromiso(seccion_id):
    if seccion_id not in session['compromisos']:
        session['compromisos'].append(seccion_id)
        session.modified = True

        seccion_idx = next((i for i, s in enumerate(SECCIONES) if s['id'] == seccion_id), None)
        if seccion_idx is not None and seccion_idx + 1 < len(SECCIONES):
            siguiente = SECCIONES[seccion_idx + 1]['id']
            if siguiente not in session['secciones_desbloqueadas']:
                session['secciones_desbloqueadas'].append(siguiente)
                session.modified = True

    return redirect(url_for('index'))

@app.route('/reset-cuestionarios')
def reset_cuestionarios():
    primer_seccion = SECCIONES[0]['id'] if SECCIONES else 'reglas'
    session['preguntas_respondidas'] = {}
    session['compromisos'] = []
    session['secciones_desbloqueadas'] = [primer_seccion]
    session.modified = True
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)