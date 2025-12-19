# Component Needs Inventory

**Status:** Active  
**Last Updated:** 2025-12-19  
**Purpose:** Track potential Extension components based on real usage patterns, not speculative needs

---

## Overview

This document serves as the single source of truth for identifying and prioritizing Extension component needs. All component additions must be justified through data, not speculation.

**Key Principle:** Quality over quantity. We do NOT chase component count. We add components only when there is clear evidence of need.

---

## Usage Analysis

### Current Status
- [ ] Analyze existing codebase for repeated component patterns
- [ ] Document components built outside library
- [ ] Identify frequency of custom implementations
- [ ] Track workarounds and custom solutions

### Analysis Results

| Component Pattern | Frequency | Location | Current Workaround | Priority |
|-------------------|-----------|----------|-------------------|----------|
| _To be populated from analysis_ | | | | |

### Analysis Script Output
- Run `scripts/analyze-component-needs.ts` regularly
- Review output and update this section
- Link to detailed analysis reports

---

## Pattern Identification

### Common UI Patterns Review

Review common UI patterns in modern design systems and compare against current Extension layer coverage.

#### Missing Patterns (To Be Evaluated)

| Pattern | Status | Architectural Fit | Token Requirements | Notes |
|---------|--------|-------------------|-------------------|-------|
| _To be populated_ | | | | |

#### Coverage Assessment

**Current Extension Layer Coverage:**
- ✅ Layout primitives (Stack, Row, Column, Grid, Flex, Container, Box, Surface)
- ✅ Form components (Input, Textarea, Checkbox, Radio, Switch, Field)
- ✅ Typography components (Text, Heading, Body, Caption, Code, Display, Lead, Label)
- ✅ Navigation components (Breadcrumbs, Pagination, Stepper, SegmentedControl)
- ✅ Data display (Table, DataList, Skeleton, EmptyState)
- ✅ Overlays (Dialog, Portal, Backdrop)
- ✅ Menus (Popover, HoverCard)
- ✅ Visual components (Alert, Badge, Icon, Link, Card, Section)

**Gaps to Evaluate:**
- [ ] Review against common design system patterns
- [ ] Document architectural justification for missing patterns
- [ ] Identify if gaps are intentional (not needed) or actual needs

---

## User Requests

### Request Tracking

Track component requests from team members, users, and GitHub issues.

| Request ID | Component Name | Requestor | Use Case | Frequency | Status | Priority |
|------------|----------------|-----------|----------|-----------|--------|----------|
| _To be populated from GitHub issues_ | | | | | | |

### Request Sources
- GitHub issues with `component-request` label
- Team discussions
- User feedback
- Code review comments

### Request Evaluation Criteria
1. **Use Case Clarity**: Is the use case well-defined?
2. **Frequency**: How often is this pattern needed?
3. **Current Workaround**: What is the current solution?
4. **Architectural Fit**: Does it comply with Extension Authority Contract?
5. **Token Requirements**: Can it use existing tokens?

---

## Priority Matrix

### Priority Levels

| Priority | Criteria | Action |
|----------|----------|--------|
| **P1** | High Impact + High Frequency | Immediate consideration |
| **P2** | High Impact + Low Frequency | Plan for next iteration |
| **P3** | Low Impact + High Frequency | Consider if time permits |
| **P4** | Low Impact + Low Frequency | Defer or reject |

### Impact Assessment

**High Impact:**
- Solves a common problem for many users
- Reduces significant code duplication
- Improves developer experience substantially
- Fills a critical gap in the library

**Low Impact:**
- Solves a niche problem
- Minor convenience improvement
- Nice-to-have feature

### Frequency Assessment

**High Frequency:**
- Requested multiple times
- Pattern appears frequently in codebase
- Common use case across projects

**Low Frequency:**
- Rarely requested
- Appears infrequently
- Edge case or specific domain need

---

## Decision Criteria

### Component Addition Requirements

A component MUST meet ALL of the following criteria to be considered:

1. **Foundation Composition** (if applicable)
   - ✅ Must compose Foundation components internally
   - ✅ Must NOT duplicate Foundation functionality
   - ✅ Must NOT bypass Foundation components

2. **Token System Compliance**
   - ✅ Must use token system exclusively
   - ✅ All visual props must use token unions
   - ✅ Must NOT use raw values (strings, numbers, CSS)

3. **Clear Use Case**
   - ✅ Must have documented, real-world use case
   - ✅ Must NOT be speculative
   - ✅ Must solve an actual problem

4. **Architectural Fit**
   - ✅ Must comply with Extension Authority Contract
   - ✅ Must follow component lifecycle protocol
   - ✅ Must use descriptive, intent-based naming (no Foundation names)

5. **Authority Compliance**
   - ✅ Must respect Foundation layer immutability
   - ✅ Must comply with all Foundation Authority rules
   - ✅ Must NOT override or bypass Authority rules

### Component Rejection Criteria

A component MUST be rejected if it:

- ❌ Duplicates Foundation functionality
- ❌ Uses Foundation component names
- ❌ Violates Extension Authority Contract
- ❌ Requires new token domains (without unlock procedure)
- ❌ Is purely speculative (no real use case)
- ❌ Bypasses Foundation components

---

## Review Process

### Regular Reviews

- **Monthly**: Review new requests and update inventory
- **Quarterly**: Comprehensive review of all tracked items
- **As Needed**: Review when high-priority requests come in

### Review Checklist

- [ ] Review all new user requests
- [ ] Run component needs analysis script
- [ ] Update usage analysis results
- [ ] Re-evaluate priorities based on new data
- [ ] Make decisions on pending requests
- [ ] Communicate decisions to requestors

### Decision Communication

- Update request status in this document
- Comment on GitHub issues
- Update Component Needs Inventory
- Document decisions in review notes

---

## Notes

### Historical Decisions

| Date | Component | Decision | Reason |
|------|----------|----------|--------|
| _To be populated_ | | | |

### Patterns to Avoid

- Adding components "just because" other libraries have them
- Speculative components without use cases
- Components that violate architectural constraints
- Duplicate Foundation functionality

---

## Related Documents

- [Extension Authority Contract](../architecture/EXTENSION_AUTHORITY_CONTRACT.md)
- [Extension Canonical State](../architecture/EXTENSION_STATE.md)
- [Component Creation Checklist](./COMPONENT_CREATION_CHECKLIST.md)
- [Usage Feedback Process](./FEEDBACK_COLLECTION_PROCESS.md)

---

**Last Review:** 2025-12-19  
**Next Review:** 2026-01-19 (Monthly)

