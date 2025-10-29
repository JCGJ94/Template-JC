#!/usr/bin/env node
import { spawn } from 'node:child_process';

const commands = [
  { label: 'api', command: 'pipenv run dev' },
  { label: 'front', command: 'npm run dev:front' },
];

const children = [];
let shuttingDown = false;

const shutdown = (code = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (child && !child.killed) {
      child.kill('SIGTERM');
    }
  }
  process.exit(code);
};

for (const { label, command } of commands) {
  const child = spawn(command, {
    stdio: 'inherit',
    shell: true,
    env: process.env,
  });
  children.push(child);

  child.on('error', (error) => {
    console.error(`[dev-full] Failed to start ${label}:`, error);
    shutdown(1);
  });

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    if (signal) {
      console.log(`[dev-full] ${label} exited with signal ${signal}`);
      shutdown(signal === 'SIGINT' ? 0 : 1);
      return;
    }

    if (code && code !== 0) {
      console.log(`[dev-full] ${label} exited with code ${code}`);
      shutdown(code);
      return;
    }

    console.log(`[dev-full] ${label} stopped. Shutting down remaining services...`);
    shutdown(0);
  });
}

process.on('SIGINT', () => {
  console.log('[dev-full] Caught SIGINT, terminating child processes...');
  shutdown(0);
});

process.on('SIGTERM', () => {
  console.log('[dev-full] Caught SIGTERM, terminating child processes...');
  shutdown(0);
});
