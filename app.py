from flask import Flask, render_template, request, redirect, url_for
from tzlocal import get_localzone
from flask_sqlalchemy import SQLAlchemy
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from flask import jsonify


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///links.db'
db = SQLAlchemy(app)

# Obtener la zona horaria local del sistema
local_tz = get_localzone()

class Link(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(300), nullable=False)
    thumbnail = db.Column(db.String(300), nullable=True)
    comment = db.Column(db.String(300), nullable=True)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.now(local_tz))

    def __repr__(self):
        return f"<Link {self.url}>"


def get_thumbnail(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        thumbnail_url = soup.find('meta', property='og:image')['content']
        return thumbnail_url
    except:
        return None

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        url = request.form['url']
        comment = request.form['comment']
        thumbnail = get_thumbnail(url)
        new_link = Link(url=url, thumbnail=thumbnail, comment=comment)
        db.session.add(new_link)
        db.session.commit()
        return redirect(url_for('index'))
    else:
        search_query = request.args.get('search', '')
        if search_query:
            links = Link.query.filter(Link.comment.contains(search_query)).all()
        else:
            links = Link.query.all()
        return render_template('index.html', links=links)


@app.route('/delete/<int:id>', methods=['POST'])
def delete_link(id):
    link_to_delete = Link.query.get_or_404(id)
    db.session.delete(link_to_delete)
    db.session.commit()
    return redirect(url_for('index'))

@app.route('/links')
def get_links():
    links = Link.query.all()
    links_dict = {}
    for link in links:
        links_dict[link.id] = {
            'url': link.url,
            'thumbnail': link.thumbnail,
            'comment': link.comment,
            'timestamp': link.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        }
    return jsonify(links_dict)

def create_db():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    create_db()
    app.run(host='0.0.0.0', port=5001)

