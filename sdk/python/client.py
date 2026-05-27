import requests


class PTOFClient:
    def __init__(self, base_url="http://127.0.0.1:3000/v1", timeout=10):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout

    def optimize(self, prompt, options=None):
        payload = {
            "prompt": prompt,
            "options": options or {},
        }

        response = requests.post(
            f"{self.base_url}/optimize",
            json=payload,
            timeout=self.timeout,
        )

        response.raise_for_status()
        return response.json()

    def classify(self, prompt):
        payload = {
            "prompt": prompt,
        }

        response = requests.post(
            f"{self.base_url}/classify",
            json=payload,
            timeout=self.timeout,
        )

        response.raise_for_status()
        return response.json()

    def benchmark(self, include_cases=False):
        payload = {
            "includeCases": include_cases,
        }

        response = requests.post(
            f"{self.base_url}/benchmark",
            json=payload,
            timeout=self.timeout,
        )

        response.raise_for_status()
        return response.json()