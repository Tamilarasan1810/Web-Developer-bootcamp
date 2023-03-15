import requests

resp = requests.get(
    "https://api.telegram.org/bot5591428373:AAFKha-HE7gRrNBgbLTGeNMaG-dLqS9U0YU/serverbot")
print(resp.text)
