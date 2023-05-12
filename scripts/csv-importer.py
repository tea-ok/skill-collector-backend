import os
import pandas as pd
import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="skill_collector",
    user="postgres",
    password=""
)

cur = conn.cursor()

# Check if the CSV file exists in the same directory as the script
csv_file = os.path.join(os.path.dirname(__file__), 'sfia_skills.csv')
if not os.path.exists(csv_file):
    print("Could not find 'sfia_skills.csv' file in the same directory as the script. Please make sure the file exists and try again.")
    exit()

df = pd.read_csv(csv_file)

# Drops first row if it's empty, happens sometimes when converting from Excel to CSV
if df.iloc[0].isna().all():
    df = df.drop(0)

expected_columns = ['skill_name', 'skill_code', 'skill_description']
if not all(column in df.columns for column in expected_columns):
    print("The CSV file must have the columns 'skill_name', 'skill_code', and 'skill_description' in that order.")
    exit()

for index, row in df.iterrows():
    skill_name = row['skill_name']
    skill_code = row['skill_code']
    skill_description = row['skill_description']
        
    # Check if the skill already exists in the database
    cur.execute("SELECT * FROM skills WHERE skill_name = %s AND skill_type = 'SFIA'", (skill_name,))
    existing_skill = cur.fetchone()
        
    if existing_skill:
        print(f"Skill '{skill_name}' already exists in the database, skipping.")
    else:
        cur.execute("INSERT INTO skills (skill_code, skill_name, skill_type, skill_description) VALUES (%s, %s, %s, %s)", (skill_code, skill_name, 'SFIA', skill_description))
        print(f"Inserted skill '{skill_name}' into the database.")

conn.commit()
cur.close()
conn.close()