import pandas as pd
import psycopg2
import os
import warnings

# Filtering psycopg2 + pandas warning
warnings.filterwarnings("ignore")

conn = psycopg2.connect(
    host="localhost",
    database="skill_collector",
    port="5432",
    user="postgres",
    password=""
)

query = """SELECT user_skills.user_id, users.user_hash, skills.skill_code, skills.skill_name, skills.skill_type, user_skills.importance_level
           FROM users
           JOIN user_skills ON users.user_id = user_skills.user_id
           JOIN skills ON user_skills.skill_id = skills.skill_id
           ORDER BY user_skills.user_id"""

df = pd.read_sql(query, conn)

file_path = "user_skills.csv"
df.to_csv(file_path, index=False)

print("Data exported to " + os.path.abspath(file_path))

conn.close()

