async function requestWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    return response;
  } finally {
    clearTimeout(timeout);
  }
}

export class PTOFClient {
  constructor({
    baseUrl = "http://127.0.0.1:3000/v1",
    timeoutMs = 10000,
  } = {}) {
    this.baseUrl = baseUrl;
    this.timeoutMs = timeoutMs;
  }

  async optimize(prompt, options = {}) {
    const response = await requestWithTimeout(
      `${this.baseUrl}/optimize`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          options,
        }),
      },
      this.timeoutMs

    );

    if (!response.ok) {
      throw new Error(
        `Optimize request failed: ${response.status}`
      );
    }

    return response.json();
  }

  async classify(prompt) {
    const response = await requestWithTimeout(
      `${this.baseUrl}/classify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      },
      this.timeoutMs
    );

    if (!response.ok) {
      throw new Error(
        `Classify request failed: ${response.status}`
      );
    }

    return response.json();
  }

  async benchmark(includeCases = false) {
    const response = await requestWithTimeout(
      `${this.baseUrl}/benchmark`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          includeCases,
        }),
      },
      this.timeoutMs
    );

    if (!response.ok) {
      throw new Error(
        `Benchmark request failed: ${response.status}`
      );
    }

    return response.json();
  }



}

export default PTOFClient;