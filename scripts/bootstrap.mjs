#!/usr/bin/env node
import { spawn } from 'node:child_process';

const steps = [
  { cmd: 'pipenv', args: ['install'], label: 'pipenv install' },
  { cmd: 'npm', args: ['install'], label: 'npm install' }
];

function runStep(step) {
  return new Promise((resolve, reject) => {
    const child = spawn(step.cmd, step.args, { stdio: 'inherit', shell: true });

    child.on('error', (error) => {
      reject(new Error(`Failed to execute ${step.label}: ${error.message}`));
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${step.label} exited with code ${code}`));
      }
    });
  });
}

async function main() {
  for (const step of steps) {
    console.log(`[bootstrap] Running ${step.label}...`);
    await runStep(step);
  }
  console.log('[bootstrap] All dependencies installed.');
}

main().catch((error) => {
  console.error(`[bootstrap] ${error.message}`);
  process.exit(1);
});
