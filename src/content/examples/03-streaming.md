---
title: Streaming
order: 3
lang: python
code: |
  from signalrcore.hub_connection_builder import HubConnectionBuilder
  from signalrcore.subject import Subject

  hub_connection = HubConnectionBuilder()\
      .with_url("wss://my-app.com/streaminghub")\
      .build()

  hub_connection.start()

  # --- Server-to-client streaming ---
  # "Counter" streams `count` items with `delay` ms between each
  hub_connection.stream(
      "Counter",
      [10, 500]   # count=10, delay=500ms
  ).subscribe({
      "next":     lambda item: print(f"  received: {item}"),
      "complete": lambda: print("Stream complete!"),
      "error":    lambda err: print(f"Stream error: {err}")
  })

  # --- Client-to-server streaming ---
  subject = Subject()
  hub_connection.send("UploadStream", subject)

  for i in range(5):
      subject.next(f"chunk-{i}")

  subject.complete()
---
