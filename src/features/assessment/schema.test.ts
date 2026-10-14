import { describe, expect, it } from 'vitest';
import { sampleAssessment } from './fixtures';
import { assessmentSchema } from './schema';

describe('assessmentSchema age rule', () => {
  // Assessment date is 2026-08-07, so 60 years earlier is 1966-08-07.
  it('accepts a patient turning 60 on the assessment date and rejects one day short', () => {
    const exactly60 = assessmentSchema.safeParse({
      ...sampleAssessment,
      dateOfBirth: '1966-08-07',
    });
    expect(exactly60.success).toBe(true);

    const oneDayShort = assessmentSchema.safeParse({
      ...sampleAssessment,
      dateOfBirth: '1966-08-08',
    });
    expect(oneDayShort.success).toBe(false);
    expect(oneDayShort.error?.issues.map((issue) => issue.path)).toEqual([['dateOfBirth']]);
  });
});
