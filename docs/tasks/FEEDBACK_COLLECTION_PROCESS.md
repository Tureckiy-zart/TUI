# Usage Feedback Process

**Status:** Active  
**Last Updated:** 2025-12-19  
**Purpose:** Define how to collect, process, and act on usage feedback

---

## Overview

This document defines the process for collecting, tracking, and acting on feedback about component usage, pain points, and improvement suggestions.

**Key Principle:** Feedback drives controlled library growth. We respond to real needs, not speculation.

---

## Feedback Sources

### 1. Component Usage Patterns

**How to Report:**
- Document repeated patterns in codebase
- Note workarounds and custom implementations
- Track frequency of specific needs

**Collection Method:**
- Run `scripts/analyze-component-needs.ts` regularly
- Review analysis output
- Update Component Needs Inventory

### 2. User Requests

**How to Report:**
- Use GitHub issue template: `.github/ISSUE_TEMPLATE/component-request.md`
- Label issue with `component-request`
- Provide use case, frequency, and current workaround

**Collection Method:**
- Monitor GitHub issues with `component-request` label
- Track in Component Needs Inventory
- Link to usage patterns

### 3. Pain Points

**How to Report:**
- Create GitHub issue with `feedback` label
- Describe specific pain point
- Provide examples and context

**Collection Method:**
- Review GitHub issues with `feedback` label
- Categorize by component or area
- Track in Component Usage Tracking document

### 4. Improvement Suggestions

**How to Report:**
- Create GitHub issue with `enhancement` label
- Describe suggested improvement
- Provide rationale and examples

**Collection Method:**
- Review GitHub issues with `enhancement` label
- Evaluate against architectural constraints
- Track in Component Usage Tracking document

---

## Feedback Collection

### Automated Collection

**Scripts:**
- `scripts/analyze-component-needs.ts` - Analyzes codebase for patterns
- `scripts/collect-usage-feedback.ts` - Parses GitHub issues and generates report

**Frequency:**
- Run analysis scripts monthly
- Review output and update tracking documents
- Identify trends and patterns

### Manual Collection

**Process:**
1. Monitor GitHub issues
2. Review code reviews for patterns
3. Collect team feedback
4. Track user discussions

**Frequency:**
- Weekly review of new issues
- Monthly comprehensive review
- Quarterly trend analysis

---

## Feedback Processing

### Categorization

**Categories:**
- **Component Request**: Request for new component
- **Component Enhancement**: Improvement to existing component
- **Pain Point**: Issue with current component
- **Usage Pattern**: Repeated pattern in codebase
- **Documentation**: Request for better documentation

### Prioritization

**Priority Levels:**
- **P1**: High impact, high frequency, architectural fit
- **P2**: High impact, low frequency, or medium impact, high frequency
- **P3**: Medium impact, medium frequency
- **P4**: Low impact, low frequency

**Factors:**
- Frequency of need
- Impact on developer experience
- Architectural fit
- Effort required
- User demand

### Evaluation

**Evaluation Criteria:**
1. **Use Case Clarity**: Is the use case well-defined?
2. **Frequency**: How often is this needed?
3. **Current Workaround**: What is the current solution?
4. **Architectural Fit**: Does it comply with Extension Authority Contract?
5. **Token Requirements**: Can it use existing tokens?

**Decision Process:**
1. Review feedback against criteria
2. Check Component Needs Inventory
3. Evaluate architectural fit
4. Make decision (approve, defer, reject)
5. Communicate decision

---

## Feedback Tracking

### Component Needs Inventory

**Location:** `docs/tasks/COMPONENT_NEEDS_INVENTORY.md`

**Tracks:**
- Component requests
- Usage patterns
- Priority matrix
- Decision history

**Update Frequency:**
- Monthly review
- Quarterly comprehensive update
- As needed for high-priority items

### Component Usage Tracking

**Location:** `docs/tasks/COMPONENT_USAGE_TRACKING.md`

**Tracks:**
- Component usage frequency
- Workarounds and custom implementations
- User complaints
- Adoption rates

**Update Frequency:**
- Monthly review
- Quarterly comprehensive update

### GitHub Issues

**Labels:**
- `component-request` - Request for new component
- `enhancement` - Improvement suggestion
- `feedback` - General feedback
- `pain-point` - Specific pain point

**Tracking:**
- Link issues to Component Needs Inventory
- Update status based on decisions
- Close with clear rationale

---

## Feedback Response

### Response Time

**Targets:**
- High priority (P1): Within 1 week
- Medium priority (P2): Within 1 month
- Low priority (P3-P4): Quarterly review

### Communication

**Response Format:**
- Acknowledge feedback
- Provide evaluation status
- Explain decision rationale
- Link to relevant documents

**Channels:**
- GitHub issue comments
- Component Needs Inventory updates
- Documentation updates

### Action

**Approved Feedback:**
- Add to Component Needs Inventory
- Create implementation task
- Assign priority
- Track progress

**Deferred Feedback:**
- Document reason for deferral
- Set review date
- Track in Component Needs Inventory

**Rejected Feedback:**
- Document rejection reason
- Reference architectural constraints
- Close issue with explanation

---

## Review Process

### Regular Reviews

**Monthly Review:**
- Review new feedback
- Update tracking documents
- Evaluate priorities
- Make decisions on pending items

**Quarterly Review:**
- Comprehensive review of all feedback
- Trend analysis
- Priority reassessment
- Process improvement

### Review Checklist

- [ ] Review all new feedback
- [ ] Update Component Needs Inventory
- [ ] Update Component Usage Tracking
- [ ] Evaluate priorities
- [ ] Make decisions on pending items
- [ ] Communicate decisions
- [ ] Update documentation

---

## Related Documents

- [Component Needs Inventory](./COMPONENT_NEEDS_INVENTORY.md)
- [Component Usage Tracking](./COMPONENT_USAGE_TRACKING.md)
- [Feedback Review Process](./FEEDBACK_REVIEW_PROCESS.md)
- [Extension Authority Contract](../architecture/EXTENSION_AUTHORITY_CONTRACT.md)

---

**Last Review:** 2025-12-19  
**Next Review:** 2026-01-19 (Monthly)

