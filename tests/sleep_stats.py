# -*- coding: utf-8 -*-
"""
Created on Sat Jul 25 14:36:51 2020

@author: dean.flanagan
"""

import psycopg2
import datetime


def sleep_stats():
    conn = psycopg2.connect(
        "postgres://aanqlgeiyzwajd:00dfd79fc1796e59fbd0d6e78140a8cca4dbe300a3ffa00448cf831d46de5607@ec2-54-91-178-234.compute-1.amazonaws.com:5432/d2ipc50hqn81fu")
    cur = conn.cursor()
    cur.execute('SELECT * FROM public."Sleep"')
    data = cur.fetchall()
    ttl = datetime.timedelta()
    for r in data:
        print(r[4])
        print(r[3])
        ttl += r[4] - r[3]
    print(round((ttl/len(data)).seconds / 3600, 2))
    # return round((ttl/len(data)).seconds / 3600, 2)


if __name__ == "__main__":
    sleep_stats()
