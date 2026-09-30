import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\x1b[36m%s\x1b[0m', '=====================================================');
console.log('\x1b[36m%s\x1b[0m', '   🌊 Starting FloodAI Live Intelligence Platform   ');
console.log('\x1b[36m%s\x1b[0m', '=====================================================');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// Spawn Server
const serverProcess = spawn(npmCmd, ['--prefix', 'server', 'run', 'start'], {
  cwd: __dirname,
  stdio: 'pipe',
  shell: true
});

serverProcess.stdout.on('data', (data) => {
  process.stdout.write(`\x1b[34m[SERVER]\x1b[0m ${data}`);
});
serverProcess.stderr.on('data', (data) => {
  process.stderr.write(`\x1b[31m[SERVER ERR]\x1b[0m ${data}`);
});

// Spawn Client
const clientProcess = spawn(npmCmd, ['--prefix', 'client', 'run', 'dev'], {
  cwd: __dirname,
  stdio: 'pipe',
  shell: true
});

clientProcess.stdout.on('data', (data) => {
  process.stdout.write(`\x1b[32m[CLIENT]\x1b[0m ${data}`);
});
clientProcess.stderr.on('data', (data) => {
  process.stderr.write(`\x1b[33m[CLIENT ERR]\x1b[0m ${data}`);
});

const cleanup = () => {
  console.log('\nShutting down FloodAI services...');
  serverProcess.kill();
  clientProcess.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
