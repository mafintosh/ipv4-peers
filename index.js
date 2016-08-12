exports.encodingLength = encodingLength
exports.encode = encode
exports.decode = decode

encode.bytes = decode.bytes = 0

function encodingLength (peers) {
  return peers.length * 6
}

function encode (peers, buf, offset) {
  if (!buf) buf = Buffer(encodingLength(peers))
  if (!offset) offset = 0

  for (var i = 0; i < peers.length; i++) {
    var host = peers[i].host.split('.')
    var port = peers[i].port
    buf[offset++] = parseInt(host[0], 10)
    buf[offset++] = parseInt(host[1], 10)
    buf[offset++] = parseInt(host[2], 10)
    buf[offset++] = parseInt(host[3], 10)
    buf.writeUInt16BE(port, offset)
    offset += 2
  }

  encode.bytes = peers.length * 6
  return buf
}

function decode (buf, offset, end) {
  if (!offset) offset = 0
  if (!end) end = buf.length

  var peers = Array(Math.floor((end - offset) / 6))

  for (var i = 0; i < peers.length; i++) {
    peers[i] = {
      host: buf[offset++] + '.' + buf[offset++] + '.' + buf[offset++] + '.' + buf[offset++],
      port: buf.readUInt16BE(offset)
    }
    offset += 2
  }

  decode.bytes = peers.length * 6
  return peers
}
