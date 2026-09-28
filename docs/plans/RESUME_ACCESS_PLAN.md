---
title: Resume Access Plan
status: complete
createdAt: 2026-08-23
updatedAt: 2026-08-23
---

# Resume Access Plan

## Project position

- **Completed:** The Experience route presents the approved professional-content projection with chronology, contribution boundaries, responsive styling, and accessibility regression coverage.
- **Current:** Milestone 2 — Core Professional Experience is in progress. The `/resume` route exists but still renders placeholder copy; the approved PDF and typed resume metadata already exist.
- **Next outcome:** Recruiters and hiring managers can reach the current CV directly from the Resume route and existing site entry points.
- **Workflow stage:** Approved implementation plan; `implement-task` is the current stage.

## Product and roadmap objective

Complete the Resume outcome in Milestone 2. The task supports job applications by making the CV—the primary hiring artefact—directly available, while exercising semantic React, TypeScript, accessibility, responsive CSS, testing, and deployable static-asset handling.

## Objective and repository evidence

Replace the placeholder Resume page with a concise, production-ready access point for the approved current CV.

Verified repository evidence:

- `public/davi-naizer-santos-resume.pdf` exists, is tracked, and is a four-page PDF.
- `professionalContent.resume` provides the label `Download Resume`, URL `/davi-naizer-santos-resume.pdf`, and updated date `2026-08-13`.
- The Home route already links to the PDF through the typed content projection.
- The shared navigation and `/resume` route are already configured.
- `src/pages/ResumePage.tsx` currently renders placeholder content.

## Scope

- Update `src/pages/ResumePage.tsx` to consume `professionalContent.resume`.
- Render a clear heading, concise context, an accessible link using the typed label and URL, and the optional updated date using semantic time markup.
- Add route-owned responsive styling in `src/pages/ResumePage.css`, following the existing route-style colocation decision.
- Add `src/pages/ResumePage.test.tsx` covering rendered content, link destination and label, updated-date rendering, and automated accessibility checks.
- Verify that the existing PDF is included in the production build at the expected root URL.

## Exclusions

- Do not regenerate, edit, or redesign the PDF.
- Do not introduce PDF embedding, a viewer, a download service, an API, a CMS, or a new dependency.
- Do not change routing, primary navigation, the professional-content contract, or unrelated routes.
- Do not add Contact implementation or broader navigation integration.

## Assumptions and decisions

- `public/davi-naizer-santos-resume.pdf` is the approved current public CV. This task exposes the existing artefact rather than changing its editorial content.
- Native browser PDF handling is sufficient. Use a standard same-origin anchor based on `professionalContent.resume.url`; do not embed a custom viewer.
- No architecture, dependency, or documentation decision is unresolved for this task.

If the PDF is not the approved current public CV, implementation must pause for the developer to resolve that content decision rather than changing the asset autonomously.

## Completion criteria and evidence

1. The `/resume` route no longer displays placeholder text and renders a meaningful semantic page.
   - Evidence: rendered route inspection and focused component test.
2. The page exposes an accessible `Download Resume` link sourced from `professionalContent.resume` and resolving to `/davi-naizer-santos-resume.pdf`.
   - Evidence: component assertion and browser activation.
3. The approved updated date is rendered without introducing unsupported CV claims.
   - Evidence: semantic DOM assertion and manual visual inspection.
4. The route follows existing semantic HTML, focus, responsive, and styling conventions.
   - Evidence: accessibility test, responsive manual inspection, and code review.
5. The production build includes the PDF at the expected root URL.
   - Evidence: successful build and verification that `dist/davi-naizer-santos-resume.pdf` exists.

## Implementation sequence

1. Replace the placeholder Resume page with content-driven semantic markup.
2. Add colocated route styling for the page layout and action link.
3. Add focused component and accessibility regression tests.
4. Run repository checks and verify the production asset output.
5. Manually verify direct route entry, keyboard focus, representative mobile and desktop layouts, and PDF activation.

## Validation

Run the repository scripts:

```bash
pnpm validate
pnpm build
```

Then verify manually that:

- `/resume` loads through direct navigation;
- the link is keyboard reachable and visibly focused;
- the layout remains readable at mobile and desktop widths;
- activating the link opens or downloads the expected PDF; and
- `dist/davi-naizer-santos-resume.pdf` exists after the production build.
