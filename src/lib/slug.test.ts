import { test } from 'node:test';
import assert from 'node:assert/strict';
import { eventSlug } from './slug.ts';

test('eventSlug', () => {
  assert.equal(eventSlug(new Date('2026-09-23')), 'owasp-sofia-september-2026-meetup');
  assert.equal(eventSlug(new Date('2019-05-09')), 'owasp-sofia-may-2019-meetup');
  assert.equal(eventSlug(new Date('2021-07-21'), true), 'owasp-sofia-july-21-2021-meetup');
});
