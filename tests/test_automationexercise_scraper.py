"""
Tests for AutomationExercise Scraper
input: https://automationexercise.com/
"""
import unittest
from unittest.mock import patch
from src.automationexercise_scraper import fetch_homepage, parse_categories

class TestAutomationExerciseScraper(unittest.TestCase):
    @patch('src.automationexercise_scraper.requests.get')
    def test_fetch_homepage(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.text = '<html></html>'
        html = fetch_homepage()
        self.assertEqual(html, '<html></html>')

    def test_parse_categories(self):
        html = '''<div class="panel-group category-products">
            <div class="panel-title"><a>Men</a></div>
            <div class="panel-title"><a>Women</a></div>
        </div>'''
        cats = parse_categories(html)
        self.assertEqual(cats, ['Men', 'Women'])

if __name__ == "__main__":
    unittest.main()
