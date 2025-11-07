import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi import FastAPI
import uvicorn

app = FastAPI()

# For demo: load from CSV or DB
# id, title, description
books = pd.read_csv("/Users/kevinbratt/bookapp/recommender/app/data/books.csv")

tfidf = TfidfVectorizer(stop_words="english")
matrix = tfidf.fit_transform(books["description"].fillna(""))
similarity = cosine_similarity(matrix)


@app.get("/similar/{book_id}")
def get_similar(book_id: int, top_k: int = 5):
    idx = books.index[books["id"] == book_id].tolist()[0]
    scores = list(enumerate(similarity[idx]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)
    top_indices = [i for i, _ in scores[1:top_k+1]]
    return books.iloc[top_indices].to_dict(orient="records")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
