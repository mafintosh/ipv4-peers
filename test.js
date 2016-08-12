var tape = require('tape')
var peers = require('./')

tape('encodes', function (t) {
  t.same(peers.encode([{host: '127.0.0.1', port: 80}]).length, 6)
  t.same(peers.encode([{host: '127.0.0.1', port: 80}, {host: '127.0.0.1', port: 8080}]).length, 12)
  t.end()
})

tape('encodingLength', function (t) {
  t.same(peers.encodingLength([{host: '127.0.0.1', port: 80}]), 6)
  t.same(peers.encodingLength([{host: '127.0.0.1', port: 80}, {host: '127.0.0.1', port: 8080}]), 12)
  t.end()
})

tape('encodes + decodes', function (t) {
  var a = [{host: '127.0.0.1', port: 80}]
  var b = [{host: '127.0.0.1', port: 80}, {host: '127.0.0.1', port: 8080}]
  t.same(peers.decode(peers.encode(a)), a)
  t.same(peers.decode(peers.encode(b)), b)
  t.end()
})

tape('encodes + decodes + offset', function (t) {
  var a = [{host: '127.0.0.1', port: 80}]
  var b = [{host: '127.0.0.1', port: 80}, {host: '127.0.0.1', port: 8080}]
  t.same(peers.decode(peers.encode(a, Buffer(8), 2), 2), a)
  t.same(peers.decode(peers.encode(b, Buffer(14), 2), 2), b)
  t.end()
})

tape('encodes + decodes + offset + end', function (t) {
  var a = [{host: '127.0.0.1', port: 80}]
  var b = [{host: '127.0.0.1', port: 80}, {host: '127.0.0.1', port: 8080}]
  t.same(peers.decode(peers.encode(a, Buffer(100)), 0, 6), a)
  t.same(peers.decode(peers.encode(b, Buffer(100)), 0, 12), b)
  t.end()
})
