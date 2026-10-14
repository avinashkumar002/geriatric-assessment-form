# Geriatric Care Assessment Form

A one-page form a visiting nurse fills in when checking on an elderly patient at home.
Built with React 19, TypeScript, Mantine, `@mantine/form` and Zod 4.

**Live demo:** https://geriatric-assessment-form-ks6b27j98-avinashkumar002s-projects.vercel.app/

All data is invented. No real patient names, record numbers or phone numbers are used
anywhere in the repo.

## Run it

yarn install      # the template uses Yarn 4
yarn dev          # http://localhost:5173
yarn test         # typecheck, lint, format check, tests, build

## How it works

- All validation comes from the supplied Zod schema in `src/features/assessment/schema.ts`,
  wired in through `schemaResolver`. No rules are re-implemented in the components.
- Form values are typed as an input shape (`AssessmentFormValues` in `types.ts`), because an
  empty form cannot satisfy `Assessment`. On submit, the schema parses the values and the
  parsed output is what gets saved and displayed.
- Validation runs on blur and on submit. Untouched fields stay quiet. An empty form gives
  exactly 9 errors, one per required field.
- A valid submit fakes an ~800ms save with a loading button, then shows a success Alert with
  the Zod-parsed values in a Code block.
- Mobility options are built from the `MOBILITY` array, so adding a value there adds it to
  the dropdown with no other edit.
- **Load sample patient** fills the form from `fixtures.ts`.

## Tests

- `schema.test.ts`: date of birth exactly 60 on the assessment date is accepted, one day
  short is rejected with the error on `dateOfBirth`.
- `AssessmentForm.test.tsx`: loads the sample patient, submits, and asserts the save handler
  receives the Zod-parsed values.

## Notes

- The JS bundle is over 500 kB (mostly Mantine), which triggers a build warning. Code-splitting
  would be a future optimization.

## Time spent

About 2 hours in total. Roughly 1h 40m went on building and testing (first commit 18:54,
last code commit 20:12), and about 35 minutes on the Vercel deployment. Vercel first used
Yarn 1, then hit a Corepack ESM error, which I fixed by vendoring the Yarn release with
`yarnPath` (`chore: vendor yarn release for vercel`).