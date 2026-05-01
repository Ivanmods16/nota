const path = require('path');
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_DIR = __dirname;
const MAX_USERNAME_LENGTH = 28;
const MAX_MESSAGE_LENGTH = 500;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: false,
  },
});

const pages = [
  { routes: ['/', '/index.html'], fileName: 'index.html' },
  { routes: ['/chat', '/chat.html'], fileName: 'chat.html' },
  { routes: ['/casino', '/casino.html'], fileName: 'casino.html' },
  { routes: ['/casino-en-vivo', '/casino-en-vivo.html'], fileName: 'casino-en-vivo.html' },
  { routes: ['/js', '/js.html'], fileName: 'js.html' },
  { routes: ['/love', '/love.html'], fileName: 'love.html' },
  { routes: ['/sky', '/sky.html'], fileName: 'sky.html' },
];

function cleanText(value, maxLength) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=(self)');
  next();
});

for (const page of pages) {
  app.get(page.routes, (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, page.fileName));
  });
}

app.use((req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('join', (rawUsername) => {
    const username = cleanText(rawUsername, MAX_USERNAME_LENGTH);

    if (!username) {
      socket.emit('chat message', {
        username: 'Sistema',
        message: 'Ingresa un nombre para participar en el chat.',
        type: 'system',
      });
      return;
    }

    socket.data.username = username;

    io.emit('chat message', {
      username: 'Sistema',
      message: `${username} se ha unido al chat`,
      type: 'system',
    });
  });

  socket.on('chat message', (rawMessage) => {
    const username = socket.data.username;
    const message = cleanText(rawMessage, MAX_MESSAGE_LENGTH);

    if (!username || !message) {
      return;
    }

    io.emit('chat message', {
      username,
      message,
      sentAt: Date.now(),
    });
  });

  socket.on('disconnect', () => {
    const username = socket.data.username;

    if (!username) {
      return;
    }

    io.emit('chat message', {
      username: 'Sistema',
      message: `${username} ha salido del chat.`,
      type: 'system',
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
  console.log(`Red local: http://TU_IP_LOCAL:${PORT}`);
});
