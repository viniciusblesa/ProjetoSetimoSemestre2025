import os
from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

FAQ = (
    (
        ("adotar", "adoção", "adocao", "adotar um pet", "processo"),
        "Para adotar, use o botão “Fazer download” e acesse o sistema do Paraíso Patinhas. Lá você poderá conhecer os animais disponíveis e iniciar o processo de forma responsável.",
    ),
    (
        ("download", "baixar", "sistema", "aplicativo"),
        "O sistema pode ser baixado pelo botão verde na seção “Comece sua história”. Ele leva você ao local oficial dos arquivos no Google Drive.",
    ),
    (
        ("horário", "horario", "contato", "telefone", "email", "e-mail"),
        "Você pode conhecer nosso trabalho pelo site e baixar o sistema de adoção. Para atendimento específico, consulte as informações disponíveis no sistema oficial.",
    ),
    (
        ("animal", "pet", "cachorro", "gato", "filhote"),
        "Temos cães e gatos aguardando uma família. No sistema de adoção você encontra fotos, histórias e informações sobre cada animal disponível.",
    ),
    (
        ("ajudar", "ajuda", "voluntário", "voluntario", "doar", "doação", "doacao"),
        "Você pode ajudar oferecendo um lar responsável, divulgando os animais ou entrando em contato com a equipe para participar das ações de cuidado e resgate.",
    ),
)


@app.route("/")
def index():
    return render_template("index.html")


@app.post("/chat")
def chat():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify(error="Envie uma mensagem em formato JSON."), 400

    message = data.get("message")
    if not isinstance(message, str):
        return jsonify(error="A mensagem é obrigatória."), 400

    message = " ".join(message.strip().lower().split())
    if not message:
        return jsonify(error="A mensagem não pode estar vazia."), 400
    if len(message) > 500:
        return jsonify(error="A mensagem deve ter no máximo 500 caracteres."), 400

    for keywords, answer in FAQ:
        if any(keyword in message for keyword in keywords):
            return jsonify(response=answer)

    return jsonify(response="Desculpe, não consegui entender sua pergunta. Poderia reformular?")


@app.errorhandler(404)
def not_found(_error):
    return jsonify(error="Página não encontrada."), 404


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=os.getenv("FLASK_DEBUG") == "1")