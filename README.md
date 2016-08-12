# ipv4-peers

An [abstract-encoding](https://github.com/mafintosh/abstract-encoding) compliant encoder for encoding a list of ipv4 peers to buffers.

```
npm install ipv4-peers
```

## Usage

``` js
var peers = require('ipv4-peers')

var buf = peers.encode([{
  host: '127.0.0.1',
  port: 8080
}, {
  host: '127.0.0.1',
  port: 9090
}])

console.log(buf) // 12 byte buffer
console.log(peers.decode(buf)) // the peer list
```

## API

#### `var buf = peers.encode(peerList, [buffer], [offset])`

Encode a list of ipv4 peers into a buffer.

#### `var peers = peers.decode(buffer, [offset], [end])`

Decode a buffer into a list of peers.

#### `var length = peers.encodingLength(peerList)`

Returns the amount of bytes needed to encode the peers into a buffer

## License

MIT