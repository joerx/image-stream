image-stream
============

Demo app to illustrate streaming of binary data via HTTP without resorting to memory-hogging 
workarounds via base64 and friends. 

Keep it simple, stupid!

backend
-------
- `node index.js`
- Runs server on http://localhost:3000/
- Two endpoints to illustrate how to handle data: 
  - `POST /` simply pipes input to file system
  - `POST /buffered` illustrates how to stream into a Buffer for further processing (e.g. mime)

client node
-----------
- `node index.js` - pipes a sample image to the server via POST

client java
-----------
- Import Maven project into IntelliJ 
- Run home.joerx.imagestream.client.Main
- Will upload sample file via `InputStreamEntity` and chunked transfer
