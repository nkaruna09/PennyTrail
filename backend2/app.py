# main flask app

from flask import Flask, request, jsonify
from models import db, User, Transaction
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Initialize DB
with app.app_context():
    db.create_all()

# ---------- USER AUTH ----------
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username exists"}), 400
    hashed_pw = generate_password_hash(password)
    user = User(username=username, password=hashed_pw)
    db.session.add(user)
    db.session.commit()
    return jsonify({"success": True, "user_id": user.id})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid credentials"}), 401
    return jsonify({"success": True, "user_id": user.id})

# ---------- GIVE COINS ----------
@app.route('/giveCoins', methods=['POST'])
def give_coins():
    data = request.json
    uid = data.get("user_id")
    amount = data.get("amount", 0)
    user = User.query.get(uid)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user.coins += amount
    tx = Transaction(user_id=uid, type="earn", amount=amount)
    db.session.add(tx)
    db.session.commit()
    return jsonify({"success": True, "coins": user.coins})

# ---------- SPEND COINS ----------
@app.route('/spendCoins', methods=['POST'])
def spend_coins():
    data = request.json
    uid = data.get("user_id")
    amount = data.get("amount", 0)
    user = User.query.get(uid)
    if not user:
        return jsonify({"error": "User not found"}), 404
    if user.coins < amount:
        return jsonify({"error": "Not enough coins"}), 400
    user.coins -= amount
    tx = Transaction(user_id=uid, type="spend", amount=amount)
    db.session.add(tx)
    db.session.commit()
    return jsonify({"success": True, "coins": user.coins})

# ---------- SAVE / INVEST COINS ----------
@app.route('/saveCoins', methods=['POST'])
def save_coins():
    data = request.json
    uid = data.get("user_id")
    amount = data.get("amount", 0)
    user = User.query.get(uid)
    if not user:
        return jsonify({"error": "User not found"}), 404
    if user.coins < amount:
        return jsonify({"error": "Not enough coins"}), 400
    user.coins -= amount
    user.saved_coins += amount
    tx = Transaction(user_id=uid, type="save", amount=amount)
    db.session.add(tx)
    db.session.commit()
    return jsonify({"success": True, "coins": user.coins, "saved": user.saved_coins})

# ---------- LEADERBOARD ----------
@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    users = User.query.order_by(User.coins.desc()).limit(10).all()
    return jsonify([{"username": u.username, "coins": u.coins} for u in users])

if __name__ == '__main__':
    app.run(debug=True)
