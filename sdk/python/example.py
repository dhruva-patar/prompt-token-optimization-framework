from client import PTOFClient


client = PTOFClient()

print("\n=== OPTIMIZE ===")
print(client.optimize("Compare GPT and Claude for code review"))

print("\n=== CLASSIFY ===")
print(client.classify("Compare GPT and Claude for code review"))

print("\n=== BENCHMARK ===")
print(client.benchmark(False))