---
title: Authentication
order: 2
lang: python
code: |
  import logging
  import requests
  from signalrcore.hub_connection_builder import HubConnectionBuilder

  def get_token():
      """Fetch a JWT from your auth endpoint."""
      response = requests.post(
          "https://my-app.com/api/auth/token",
          json={"username": "alice", "password": "secret"},
          verify=False
      )
      if response.status_code == 200:
          return response.json()["token"]
      raise requests.exceptions.ConnectionError()

  hub_connection = HubConnectionBuilder()\
      .with_url("wss://my-app.com/securehub", options={
          "access_token_factory": get_token,
          "headers": {
              "mycustomheader": "mycustomheadervalue"
          }
      })\
      .configure_logging(logging.DEBUG)\
      .with_automatic_reconnect({
          "type": "raw",
          "keep_alive_interval": 10,
          "reconnect_interval": 5,
          "max_attempts": 5
      }).build()

  hub_connection.on_open(lambda: print("Authenticated connection ready"))
  hub_connection.on("SecureData", lambda data: print(f"Data: {data}"))

  hub_connection.start()
---
