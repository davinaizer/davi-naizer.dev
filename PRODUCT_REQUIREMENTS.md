---
createdAt: 2026-08-07
updatedAt: 2026-09-25
version: 1.3
status: active
---

# Product Requirements

> This document is the canonical definition of the product.
>
> All other project documentation derives from it.
>
> Document precedence:
>
> Product Requirements
> → Roadmap
> → Architecture
> → Engineering Principles
> → Decisions
> → TODO
>
> When documents conflict, this document takes precedence.

---

# 1. Executive Summary

This project is a production-quality React and TypeScript web application built around a real domain: my professional experience.

It serves five equally important purposes:

1. Support job applications.
2. Maintain and improve modern frontend engineering skills.
3. Prepare for technical and behavioural interviews.
4. Consolidate professional knowledge into reusable evidence.
5. Demonstrate engineering judgement through the product itself.

The application is intentionally **not** built primarily as a portfolio website.

Instead, it is a real software product whose domain happens to be my professional career.

If recruiters or hiring managers visit the site, that is an additional benefit—not the primary reason the project exists.

## Product Definition

The product is a production-quality web application.

The domain is my professional experience.

The purpose is to improve engineering capability while communicating professional evidence.

The website is not the goal.

Building the product is the goal.

## Design Philosophy

The interface should feel:

- calm
- professional
- content-first
- accessible
- restrained

Avoid visual complexity that distracts from the content or implementation.

Design should support comprehension rather than demonstration.

---

# 2. Problem

My recent engineering work has been heavily focused on native iOS development.

While that has strengthened my product engineering experience, it also means I need regular practice with the modern React ecosystem before interviewing for senior frontend and product engineering roles.

At the same time, my professional experience spans more than a decade across multiple companies, products and domains. Much of that experience exists only as:

- CV bullet points;
- interview stories;
- performance reviews;
- personal notes;
- internal documentation that cannot be shared publicly.

This creates several problems.

- My strongest evidence is fragmented.
- Interview preparation requires repeatedly reconstructing the same stories.
- Recent frontend capability is demonstrated less publicly than native iOS work.
- Career knowledge is difficult to reuse consistently across CVs, interviews and networking.

Rather than treating these as separate problems, this project addresses them together through one continuously evolving engineering product.

---

# 3. Product Vision

Build a calm, professional web application that demonstrates thoughtful product engineering through both its implementation and its content.

The application should communicate:

> This engineer understands products, makes deliberate technical decisions, improves systems, and builds maintainable software.

The strongest evidence should come from the application itself.

The website is not merely documentation.

The website is the product.

---

# 4. Product Objectives

Every feature should contribute to at least one of these objectives.

Preferably more than one.

---

## 4.1 Support job applications

Provide recruiters and hiring managers with optional depth beyond the CV.

The application should help explain:

- projects;
- engineering decisions;
- case studies;
- technical judgement;
- career progression.

The CV remains the primary hiring artefact.

The website provides supporting evidence.

---

## 4.2 Maintain frontend engineering fluency

The project should continuously exercise modern frontend engineering.

This includes:

- React
- TypeScript
- modern CSS
- accessibility
- testing
- component architecture
- frontend performance
- tooling
- build systems
- deployment

Learning happens through implementation rather than isolated exercises.

---

## 4.3 Improve interview readiness

The application should naturally reinforce interview preparation.

Building features should revisit:

- architectural decisions;
- product trade-offs;
- workflow improvements;
- leadership examples;
- engineering failures;
- lessons learned;
- communication.

The objective is repeated exposure rather than memorisation.

---

## 4.4 Consolidate professional knowledge

The canonical resume-builder source owns approved professional summary and experience copy. This project publishes a website-specific projection of that content and adds approved project and case-study context without redefining the canonical career record.

Content should be reusable across:

- CV
- LinkedIn
- interviews
- recruiter conversations
- presentations
- future writing

Professional summary and experience changes should be reconciled with the canonical resume-builder content before publication. Website-specific presentation copy may remain local when it does not introduce or contradict professional claims.

---

## 4.5 Demonstrate engineering judgement

The implementation itself should demonstrate:

- maintainability;
- simplicity;
- accessibility;
- production quality;
- testing;
- thoughtful trade-offs;
- sustainable engineering.

These qualities should emerge naturally rather than being explicitly claimed.

---

# 5. Success Criteria

The project is successful if it:

- improves confidence during frontend interviews;
- refreshes React and TypeScript fluency;
- improves CSS confidence;
- strengthens career narratives;
- produces reusable professional content;
- demonstrates thoughtful engineering decisions;
- remains enjoyable to evolve over time.

Secondary success indicators include:

- recruiters referencing projects;
- interviewers discussing implementation decisions;
- hiring managers exploring case studies.

Traffic volume is not a success metric.

---

# 6. Target Users

## Primary User

Myself.

The application should make me:

- a better engineer;
- a better interview candidate;
- a better communicator of my own experience.

---

## Recruiters

Need to understand:

- who I am;
- what I specialise in;
- whether I match a role;

within one or two minutes.

---

## Hiring Managers

Need to understand:

- product thinking;
- ownership;
- engineering judgement;
- collaboration;
- decision making.

---

## Engineers

Need to inspect:

- architecture;
- implementation;
- testing;
- technical decisions;
- trade-offs.

---

# 7. Product Principles

## Build a product first

The application should feel like a real software product.

Not a marketing website.

---

## Evidence over claims

Professional statements should be supported by:

- projects;
- decisions;
- code;
- case studies;
- documented outcomes.

Avoid unsupported claims.

---

## Learn by building

Implementation should maximise learning.

The project exists partly to maintain engineering fluency.

Learning through implementation is preferred over artificial exercises.

---

## Production over demonstration

Solve real problems.

Avoid building features solely to showcase technologies.

---

## Sustainable scope

The project should remain intentionally small.

Features must provide meaningful value.

Avoid feature accumulation.

---

## Engineering judgement over technology signalling

Technology choices should solve real problems.

Avoid introducing frameworks or dependencies merely because they appear modern.

---

## Honest boundaries

Clearly distinguish:

- personal contribution;
- team contribution;
- measured outcomes;
- qualitative outcomes;
- production work;
- exploratory work.

---

## Incremental delivery

The product should evolve through small, complete improvements.

Avoid large rewrites.

Maintain a deployable state.

---

# 8. Definition of Done

A feature is complete when:

- its purpose is clear;
- implementation is understandable;
- accessibility has been considered;
- responsive behaviour has been verified;
- TypeScript remains strict;
- tests exist where appropriate;
- documentation is updated if architectural decisions changed;
- it supports at least one product objective.

---

# 9. MVP Scope

The first public release should contain only:

- Home
- Resume, presenting the resume download above the full career timeline
- Work, linking to two distinct evidence areas:
  - Case Studies for detailed professional evidence;
  - Experiments for selected independent projects and builds.
- Contact

Implementation should prioritise quality over quantity.

Every page should justify its existence.

---

# 10. Non-goals

This project is not intended to become:

- a blogging platform;
- a CMS;
- a knowledge management system;
- a SaaS product;
- an AI playground;
- a social platform;
- a design showcase;
- a visual effects demo.

Avoid:

- speculative architecture;
- unnecessary animations;
- excessive dependencies;
- technology chosen only for signalling;
- premature optimisation.

---

# 11. Constraints

## Simplicity

Prefer simple solutions that remain easy to understand.

---

## Maintainability

Optimise for long-term maintainability over short-term cleverness.

---

## Accessibility

Accessibility is a product requirement.

Not an enhancement.

---

## Performance

Performance should be measured rather than assumed.

---

## Progressive Enhancement

Core content should remain available regardless of JavaScript execution where practical.

---

## Sustainable Pace

The project exists alongside an active job search.

Delivery should remain sustainable.

Avoid turning the project into another full-time commitment.

---

# 12. Product Evolution

Future work should emerge from:

- interview feedback;
- recruiter conversations;
- implementation experience;
- repeated maintenance pain;
- demonstrated engineering needs.
- repeated evidence is preferred over isolated ideas.

Avoid implementing hypothetical future requirements.

New capabilities should earn their place through repeated evidence.

---

# 13. Decision Hierarchy

When making implementation decisions, apply this order of authority.

1. Product Requirements
2. Roadmap
3. Architecture
4. Engineering Principles
5. Decisions
6. TODO

Lower-level documents must not contradict higher-level ones.

---

# 14. Guiding Principle

This project should remain valuable even if nobody outside me ever opens it.

If building it:

- strengthens my engineering skills,
- improves my interview performance,
- consolidates my professional knowledge,
- and demonstrates thoughtful software engineering,

then it has already achieved its primary purpose.
