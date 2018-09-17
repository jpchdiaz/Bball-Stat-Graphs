import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/NBATOP10STATS_v3.sqlite"
db = SQLAlchemy(app)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
NBATOP = Base.classes.nbatop

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/names")
def names():
    """Return a list of players' names."""
    # Use Pandas to perform the sql query and create a DataFrame
    stmt = db.session.query(NBATOP).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the Player names
    return jsonify(list(df.Player.unique()))

@app.route("/stats/<playerName>")
def samples(playerName):
    """Career Stats Information"""
    stmt = db.session.query(NBATOP).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Filter data to hone down on player name and return certain stats
    sample_data = df.loc[df["Player"] == playerName, ["Player", "Year", "Team", "FGM", "FG%", "FTM", "FT%"]]
    
    # # Format the data to send as json
    data = {
        "year": sample_data.Year.values.tolist(),
        "field_goals_made": sample_data.FGM.values.tolist(),
        "free_throws_made": sample_data.FTM.values.tolist()
    }
    return jsonify(data)


@app.route("/news/<playerName>")
def sample_metadata(playerName):
    """News"""
    # sel = [
    #     Samples_Metadata.sample,
    #     Samples_Metadata.ETHNICITY,
    #     Samples_Metadata.GENDER,
    #     Samples_Metadata.AGE,
    #     Samples_Metadata.LOCATION,
    #     Samples_Metadata.BBTYPE,
    #     Samples_Metadata.WFREQ,
    # ]
    #
    # results = db.session.query(*sel).filter(Samples_Metadata.sample == sample).all()
    #
    # # Create a dictionary entry for each row of metadata information
    # sample_metadata = {}
    # for result in results:
    #     sample_metadata["sample"] = result[0]
    #     sample_metadata["ETHNICITY"] = result[1]
    #     sample_metadata["GENDER"] = result[2]
    #     sample_metadata["AGE"] = result[3]
    #     sample_metadata["LOCATION"] = result[4]
    #     sample_metadata["BBTYPE"] = result[5]
    #     sample_metadata["WFREQ"] = result[6]
    #
    print(sample_metadata)
    return jsonify(sample_metadata)


if __name__ == "__main__":
    app.run()
