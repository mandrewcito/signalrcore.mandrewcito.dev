---
title: Basic connection
order: 1
lang: python
code: |
  import logging
  from signalrcore.hub_connection_builder import HubConnectionBuilder

  hub_connection = HubConnectionBuilder()\
      .with_url("wss://my-app.com/chathub")\
      .configure_logging(logging.DEBUG)\
      .with_automatic_reconnect({
          "type": "raw",
          "keep_alive_interval": 10,
          "reconnect_interval": 5,
          "max_attempts": 5
      }).build()

  # Lifecycle hooks
  hub_connection.on_open(lambda: print("Connection opened"))
  hub_connection.on_close(lambda: print("Connection closed"))
  hub_connection.on_error(lambda data: print(f"Error: {data.error}"))

  # Handle incoming messages from the server
  hub_connection.on("ReceiveMessage", lambda data: print(f"Message: {data}"))

  hub_connection.start()

  # Send a message to the server hub method
  hub_connection.send("SendMessage", ["Alice", "Hello from Python!"])
---
