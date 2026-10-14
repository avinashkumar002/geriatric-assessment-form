import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { sampleAssessment } from './fixtures';
import { assessmentSchema, MOBILITY, type Assessment } from './schema';
import type { AssessmentFormValues } from './types';

const toLabel = (value: string) => {
  const text = value.replace(/[_-]/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const mobilityOptions = MOBILITY.map((value) => ({ value, label: toLabel(value) }));

const initialValues: AssessmentFormValues = {
  mrn: '',
  patientName: '',
  dateOfBirth: null,
  assessmentDate: null,
  mobility: null,
  barthelIndex: '',
  medicationCount: '',
  pharmacistReviewRequested: false,
  followUpDate: null,
  consentObtained: false,
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type AssessmentFormProps = {
  onSave?: (values: Assessment) => void;
  saveDelayMs?: number;
};

export function AssessmentForm({ onSave, saveDelayMs = 800 }: AssessmentFormProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState<Assessment | null>(null);

  const form = useForm<AssessmentFormValues>({
    mode: 'uncontrolled',
    initialValues,
    validate: schemaResolver(assessmentSchema, { sync: true }),
    validateInputOnBlur: true,
  });

  const handleSubmit = async (values: AssessmentFormValues) => {
    const parsed = assessmentSchema.parse(values); // what Zod returns, not raw form state
    setSaved(null);
    setSaving(true);
    await wait(saveDelayMs);
    setSaving(false);
    setSaved(parsed);
    onSave?.(parsed);
  };

  const loadSample = () => {
    form.setValues(sampleAssessment);
    form.clearErrors();
    setSaved(null);
  };

  return (
    <Container size="sm" py="xl">
      <Paper withBorder shadow="sm" p="lg">
        <Title order={2} mb="md">
          Geriatric Care Assessment
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Medical record number"
              placeholder="MRN-004821"
              key={form.key('mrn')}
              {...form.getInputProps('mrn')}
            />
            <TextInput
              label="Patient name"
              key={form.key('patientName')}
              {...form.getInputProps('patientName')}
            />
            <DateInput
              label="Date of birth"
              key={form.key('dateOfBirth')}
              {...form.getInputProps('dateOfBirth')}
            />
            <DateInput
              label="Assessment date"
              maxDate={new Date()}
              key={form.key('assessmentDate')}
              {...form.getInputProps('assessmentDate')}
            />
            <Select
              label="Mobility"
              data={mobilityOptions}
              key={form.key('mobility')}
              {...form.getInputProps('mobility')}
            />
            <NumberInput
              label="Barthel Index"
              step={5}
              min={0}
              max={100}
              key={form.key('barthelIndex')}
              {...form.getInputProps('barthelIndex')}
            />
            <NumberInput
              label="Regular medications"
              min={0}
              max={30}
              key={form.key('medicationCount')}
              {...form.getInputProps('medicationCount')}
            />
            <Checkbox
              label="Pharmacist review requested"
              key={form.key('pharmacistReviewRequested')}
              {...form.getInputProps('pharmacistReviewRequested', { type: 'checkbox' })}
            />
            <DateInput
              label="Next review date"
              key={form.key('followUpDate')}
              {...form.getInputProps('followUpDate')}
            />
            <Checkbox
              label="Patient or representative has given consent"
              key={form.key('consentObtained')}
              {...form.getInputProps('consentObtained', { type: 'checkbox' })}
            />
            <Group>
              <Button type="submit" loading={saving}>
                Save assessment
              </Button>
              <Button type="button" variant="default" onClick={loadSample} disabled={saving}>
                Load sample patient
              </Button>
            </Group>
          </Stack>
        </form>
        {saved && (
          <Alert color="green" title="Assessment saved" mt="md">
            <Code block>{JSON.stringify(saved, null, 2)}</Code>
          </Alert>
        )}
      </Paper>
    </Container>
  );
}
