# -*- coding: utf-8 -*-
"""
Created on Sat Jul 25 14:36:51 2020

@author: dean.flanagan
"""

import psycopg2
import datetime
import json
import os
from daylight_by_month import monthly_sun_dict
import numpy as np
import pandas as pd
#import statsmodels.api as sm


with open('config/config.json') as json_file:
    config = json.load(json_file)


def sleep_stats():
    query_string = 'SELECT	public."Drinks".n_drinks,	public."Exercises".exercise, interruptions, pee,waketime, sleeptime, public."Sleep".date FROM public."Sleep" INNER JOIN public."Drinks"     ON public."Drinks".date = public."Sleep".date INNER JOIN public."Exercises"     ON public."Exercises".date = public."Sleep".date;'

    conn = psycopg2.connect(config['development']['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute(query_string)
    data = cur.fetchall()

    df = pd.DataFrame(data, columns=[desc[0] for desc in cur.description])

    df.fillna(method='bfill', inplace=True)
    df['duration'] = pd.to_datetime(df.waketime.values) - pd.to_datetime(
        df.sleeptime.values) - pd.to_timedelta(df.pee * 10+df.interruptions * 20, unit='minute')
    df.duration = df.duration.dt.total_seconds() / 3600

    sunlight_dict = monthly_sun_dict()

    df['average_sunlight_monthly'] = pd.Series(
        [sunlight_dict[x] for x in pd.to_datetime(df.date.values).month])

    feature_columns = ['n_drinks', 'exercise',
                       'average_sunlight_monthly']

    train_target = df.duration.values
    train_features = df[feature_columns].values

    # train_features = sm.add_constant(train_features)

    # res = sm.OLS(train_target, train_features).fit()
    print([7.57548752e+00, 4.10829318, 7.34988, 1.56132896])
    return


if __name__ == "__main__":
    sleep_stats()
