import { test } from 'node:test';
import assert from 'node:assert/strict';
import { embedUrl, fileUrl, isPdf } from './media.ts';

test('embedUrl', () => {
  assert.equal(embedUrl('https://youtu.be/Bs_d1cUWr8E?si=x&t=2181'), 'https://www.youtube-nocookie.com/embed/Bs_d1cUWr8E?start=2181');
  assert.equal(embedUrl('https://www.youtube.com/watch?v=4ImaeQ2UR-A'), 'https://www.youtube-nocookie.com/embed/4ImaeQ2UR-A');
  assert.equal(embedUrl('https://drive.google.com/file/d/1tK1z/view?usp=sharing'), 'https://drive.google.com/file/d/1tK1z/preview');
  assert.equal(embedUrl('https://speakerdeck.com/x'), null);
  assert.equal(embedUrl('not a url'), null);
});

test('fileUrl / isPdf', () => {
  assert.equal(fileUrl("/assets/presentations/202503 - OWASP's #1: x.pdf"), "/assets/presentations/202503%20-%20OWASP's%20%231%3A%20x.pdf");
  assert.equal(fileUrl('https://speakerdeck.com/a b'), 'https://speakerdeck.com/a b');
  assert.ok(isPdf('/assets/a.PDF'));
  assert.ok(!isPdf('https://x.com/a.pdf'));
});
