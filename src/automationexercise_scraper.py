"""
AutomationExercise Scraper
input: https://automationexercise.com/

This module provides basic scraping functionality for https://automationexercise.com/.
"""
import requests
from bs4 import BeautifulSoup

BASE_URL = "https://automationexercise.com/"

def fetch_homepage():
    """Fetches the homepage HTML content."""
    response = requests.get(BASE_URL)
    response.raise_for_status()
    return response.text

def parse_categories(html):
    """Parses product categories from homepage HTML."""
    soup = BeautifulSoup(html, "html.parser")
    categories = []
    for cat in soup.select(".panel-group.category-products .panel-title a"):
        categories.append(cat.text.strip())
    return categories

if __name__ == "__main__":
    html = fetch_homepage()
    cats = parse_categories(html)
    print("Categories:", cats)
