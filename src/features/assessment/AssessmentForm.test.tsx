import { render, screen, userEvent, waitFor } from '@test-utils';
import { describe, expect, it, vi } from 'vitest';
import { AssessmentForm } from './AssessmentForm';
import { sampleAssessment } from './fixtures';

describe('AssessmentForm', () => {
  it('saves the parsed values after loading the sample patient', async () => {
    const onSave = vi.fn();
    const user = userEvent.setup();

    render(<AssessmentForm onSave={onSave} saveDelayMs={0} />);

    await user.click(screen.getByRole('button', { name: /load sample patient/i }));
    await user.click(screen.getByRole('button', { name: /save assessment/i }));

    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(onSave).toHaveBeenCalledWith(sampleAssessment);
  });
});
