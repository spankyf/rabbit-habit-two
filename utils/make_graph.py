# -*- coding: utf-8 -*-
"""
Created on Sat Jul 25 14:36:51 2020

@author: dean.flanagan
"""

import matplotlib.pyplot as plt
import psycopg2
import seaborn

seaborn.set(style='ticks')


def graph_data():
    try:
        conn = psycopg2.connect(
            "dbname=d2ipc50hqn81fu user=aanqlgeiyzwajd password=00dfd79fc1796e59fbd0d6e78140a8cca4dbe300a3ffa00448cf831d46de5607 host=ec2-54-91-178-234.compute-1.amazonaws.com port=5432")

        cur = conn.cursor()
        cur.execute('SELECT ((EXTRACT(EPOCH FROM (waketime - sleeptime)) + (pee * 10 +  interruptions * 20) )/3600) as "sleepHours", date FROM public."Sleep";')

        data = cur.fetchall()

        dates = []
        sleep_hours = []

        for row in data:
            sleep_hours.append(row[0])
            dates.append(row[1])
        plt.xlabel('Date', fontsize=16)
        plt.ylabel('Sleep Hours', fontsize=16)
        plt.plot_date(dates, sleep_hours, '-')
        #plt.plot_date(dates, biden_values, '-')
        # seaborn.despine(ax=ax, offset=0)
        plt.savefig('public/latestGraph.png', bbox_inches='tight')
        print('I made a graph')
        return plt
    except Exception as e:
        # print('something happend')
        print(e)
        return e


if __name__ == "__main__":
    graph_data()
