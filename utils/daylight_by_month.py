import pandas as pd
import os
import calendar
# https://toronto.weatherstats.ca/charts/sun-monthly.html


def monthly_sun_dict():
    print(os.getcwd())
    df = pd.read_csv('utils/data/daylight_by_hours.csv')

    df['average_hours'] = df[df.columns[3:5]].sum(
        axis=1)/2 - df[df.columns[1:3]].sum(axis=1)/2
    months = {v: k for k, v in enumerate(calendar.month_abbr)}
    df['month_number'] = df['Month starting on'].apply(lambda x: months[x[3:]])

    return pd.Series(df.average_hours.values, index=df.month_number).to_dict()


if __name__ == "__main__":
    monthly_sun_dict()
