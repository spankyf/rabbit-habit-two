from flask import Flask           # import flask
from make_graph import graph_data
app = Flask(__name__)             # create an app instance

# https://stackoverflow.com/questions/20107414/passing-a-matplotlib-figure-to-html-flask


app.add_url_rule("/", "hello", graph_data)
app.run()                     # run the flask app
