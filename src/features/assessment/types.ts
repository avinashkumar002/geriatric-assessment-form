import type { z } from 'zod';
import type { assessmentSchema } from './schema';

export type AssessmentInput = z.input<typeof assessmentSchema>;

// Empty form state can't satisfy the schema, so widen only the fields that start blank.
export type AssessmentFormValues = Omit<
  AssessmentInput,
  | 'dateOfBirth'
  | 'assessmentDate'
  | 'followUpDate'
  | 'mobility'
  | 'barthelIndex'
  | 'medicationCount'
  | 'consentObtained'
> & {
  dateOfBirth: string | null;
  assessmentDate: string | null;
  followUpDate: string | null;
  mobility: AssessmentInput['mobility'] | null;
  barthelIndex: number | '';
  medicationCount: number | '';
  consentObtained: boolean;
};
