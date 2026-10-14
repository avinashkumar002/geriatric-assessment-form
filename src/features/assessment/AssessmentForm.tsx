import {
  Button,
  Checkbox,
  Container,
  NumberInput,
  Paper,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { assessmentSchema, MOBILITY } from './schema';
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

export function AssessmentForm() {
  const form = useForm<AssessmentFormValues>({
    mode: 'uncontrolled',
    initialValues,
    validate: schemaResolver(assessmentSchema, { sync: true }),
    validateInputOnBlur: true,
  });

  return (
    <Container size="sm" py="xl">
      <Paper withBorder shadow="sm" p="lg">
        <Title order={2} mb="md">
          Geriatric Care Assessment
        </Title>
        <form
          onSubmit={form.onSubmit(() => {
            // save handler comes in the next step
          })}
        >
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
            <Button type="submit">Save assessment</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
