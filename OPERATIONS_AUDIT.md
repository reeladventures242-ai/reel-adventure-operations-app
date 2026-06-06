# Reel Adventure Operations App — Architecture and Operations Audit

## Executive assessment

The app is a capable offline-first static PWA, but it has grown horizontally: most capabilities exist, while the core reservation-to-payout path is split across independent CRUD records and many equally prominent navigation destinations. The highest operational risk is not missing functionality; it is inconsistent data created by retyping customer, schedule, and pricing details in bookings, invoices, and trips.

This pass establishes the intended hierarchy in code: **Booking → Invoice → Trip → Calendar / Payroll / Owner Payout**. Booking is now the editable reservation source of truth, linked invoices are financial projections, and linked trips are operational projections. The calendar continues to render trips rather than storing a duplicate calendar record.

## Current architecture

- **Runtime:** static HTML/CSS/JavaScript PWA; no server or multi-user database.
- **Persistence:** one versioned JSON document in browser `localStorage`, plus backup/recovery keys.
- **UI:** route-based single-page shell; most business modules use a generic CRUD renderer.
- **Derived systems:** calendar, dispatch readiness, payroll, owner payouts, dashboards, reports, and notifications are calculated from local records.
- **Operational limitation:** each browser is an isolated database. Demo role controls are visibility controls, not secure authorization.

## Single source of truth and relationship contract

| Domain | Source of truth | Required links | Must not duplicate independently |
|---|---|---|---|
| Customer reservation | Booking | customer profile (future), invoice, trip | Customer/contact, schedule, tour, guests, pickup, pricing, special requests |
| Financial record | Invoice | `bookingId`, optional `tripId` | Booking identity and tour facts |
| Operational record | Trip | `bookingId`, `invoiceId`, vessel and crew selections | Booking financial/customer editing |
| Dispatch visualization | Calendar / Dispatch | Trip ID | Separate calendar events |
| Crew compensation | Payroll derived from completed trip | Trip ID and crew profile | Retyped trip/customer data |
| Vessel compensation | Owner payout derived from completed trip | Trip ID, vessel ID/owner | Retyped trip/revenue data |
| Checklist | Checklist record | Trip ID, submitter | Standalone checklist without a trip |
| Maintenance | Maintenance/service record | Vessel ID/name; only RAT I and RAT II | General vessel notes used as maintenance history |

## Workflow audit

### Navigation and mobile

- **Finding:** desktop navigation exposes every module at one level, obscuring the primary workflow. Mobile previously placed every module in a horizontally scrolling command bar.
- **Implemented:** mobile command bar is limited to Dashboard, Dispatch, Calendar, Bookings, Notifications, and More. Role-authorized secondary modules are in the More sheet.
- **Next:** group desktop navigation into Today, Sales, Operations, People & Assets, Finance, and Administration; remove legacy tool links after migration acceptance.

### Dashboard

- Strong: role-aware command cards, urgent work, readiness and financial summaries.
- Gap: dashboard metrics are derived from records with inconsistent historical statuses; normalize status vocabulary during import/migration.
- Next: make exception queues the first content: conflicts, missing assignments, unpaid trips, incomplete checklists, and maintenance holds.

### Booking → invoice → trip

- **Finding:** booking was an underspecified CRUD record while invoices and trips each asked users to re-enter customer, date/time, tour, guests, and pricing.
- **Implemented:** booking captures the complete reservation dataset and uses the required status lifecycle. Linked invoices synchronize from bookings. Confirmed/scheduled/completed bookings automatically create or update one linked invoice and one linked operational trip.
- **Implemented:** booking rows expose Generate/Open Invoice and Create/Open Trip actions.
- **Guardrail:** linked records are matched by `bookingId`, preventing duplicate projections from normal workflow actions. Linked bookings cannot be hard-deleted; they must be cancelled so financial and operational history remains connected.
- Next: make booking-derived fields read-only in invoice/trip forms and provide an explicit “Edit booking source” action.

### Invoice

- Strong: document preview, sharing, payment controls, and booking/trip link fields exist.
- Gap: standalone invoice creation still permits manual customer/tour entry for legacy workflows.
- Next: split Quote (may precede booking) from Invoice (must originate from booking); add immutable payment transaction records rather than only aggregate deposit/balance fields.

### Trip, dispatch, and calendar

- Strong: conflict checks, role assignments from dropdowns, recommendations, assignment acceptance, dispatch board, and trip-derived calendar are present.
- **Implemented:** readiness now includes pickup confirmation, guest count, payment recorded, vessel, captain, mate, checklist, acceptance, vessel readiness, and conflicts. Vocabulary is standardized to Not Ready, Partially Ready, Dispatch Ready, Completed.
- Gap: trip edit form still exposes booking and invoice facts.
- Next: replace those controls with a read-only linked-booking summary and keep only vessel, crew, checklists, readiness, completion, fuel, manifest, and operational notes editable.

### Crew and vessels

- Strong: structured crew/vessel selection, availability, assignment history derivation, acceptance lifecycle, capacity checks, out-of-service block, and overlap conflict detection.
- Gap: roles are stored as text and vessel owners are names rather than IDs; renaming can break relationships.
- Next: introduce stable `crewId`, `vesselId`, and `ownerId` foreign keys while retaining display names only for migration compatibility.

### Checklists and maintenance

- Strong: pre/post records link to trips, capture timestamps/accountability/photo notes, and affect readiness. Maintenance is scoped to Reel Adventure Tours I and II.
- Gap: “photo attachments” are largely notes/data placeholders in a local JSON store; browser storage is unsuitable for operational photo retention.
- Next: use object storage and attachment metadata with retention rules; create issues from failed checklist items instead of leaving them only in notes.

### Payroll and owner payouts

- Strong: payout calculations derive from trips and existing payout rules; statements and payment tracking exist.
- Gap: derived entries can change if a completed trip is later edited; there is no locked payout snapshot/approval period.
- Next: on completion, create immutable payout ledger entries linked by trip ID, then use adjustments rather than recalculation after approval.

### Expenses, inventory, reports, notifications, settings

- Expenses and inventory are operationally useful but should link to stable trip/vessel/person IDs.
- Reports are derived correctly in principle but inherit inconsistent source data and status names.
- Notifications are centralized and role-filtered; add deduplication keys and actionable resolution states.
- Settings combines operational setup, demo controls, imports, and recovery. Separate business configuration from technical/admin recovery.

## Database and integrity audit

### Critical findings

1. `localStorage` is a single denormalized document, not a transactional multi-user database. Concurrent devices cannot safely collaborate.
2. Relationships frequently use mutable display names instead of IDs.
3. There are no database-enforced foreign keys, unique constraints, indexes, or orphan cleanup.
4. Payment, payout, and status changes are mutable aggregates rather than append-only ledgers.
5. Attachments embedded in browser storage will exceed quotas and cannot meet reliable retention needs.

### Recommended target schema

- `customers(id, name, phone, email, ...)`
- `bookings(id, customer_id, tour_date, start_time, tour_type_id, guest_count, pickup_location_id, source_id, price, deposit_required, status, notes, ...)`
- `invoices(id, booking_id UNIQUE, status, notes, ...)`
- `payments(id, invoice_id, amount, method, status, received_at, reference, ...)`
- `trips(id, booking_id UNIQUE, invoice_id, vessel_id, captain_id, mate_id, status, ...)`
- `trip_checklists(id, trip_id, type, status, submitted_by, submitted_at, ...)`
- `crew_assignments(id, trip_id, crew_id, role, status, responded_at, ...)`
- `payroll_entries(id, trip_id, crew_id, amount, status, rule_snapshot, UNIQUE(trip_id, crew_id, role))`
- `owner_payouts(id, trip_id UNIQUE, vessel_id, owner_id, amount, status, rule_snapshot, ...)`
- `maintenance_records(id, vessel_id, service_type, engine_hours, due_at_hours/date, status, cost, ...)`
- `notifications(id, recipient_id/role, type, entity_type, entity_id, dedupe_key, read_at, resolved_at, ...)`
- Index every foreign key plus trip date/status, invoice status, assignment status, maintenance due date/status, and notification recipient/read state.

## UX and accessibility audit

- Strengths: responsive cards, status badges, sticky mobile saves, touch-sized controls, collapsible form sections, and offline status.
- Issues: generic wide tables require horizontal scrolling; large forms remain cognitively heavy; destructive Delete is adjacent to routine Edit; emoji iconography is inconsistent across platforms; many actions rely on inline handlers.
- Recommendations: mobile card views for all tables, confirmation/archival instead of hard delete, side panels for linked details, consistent SVG icon system, keyboard focus management, and field-level validation/error summaries.

## Performance and operational audit

- Many renders scan all arrays repeatedly (`filter`, `find`, `JSON.stringify`) and rebuild full route HTML. This is acceptable for demo data but will degrade with real history.
- The complete store is serialized to localStorage after many actions, increasing write amplification.
- Inline handlers and a 4,000+ line application file make regression isolation difficult.
- Recommended sequence: move to a server database/API, add indexed selectors, split domain services/renderers, debounce persistence/search, paginate history, and add workflow integration tests.

## Validation acceptance path

The required happy path should assert one booking, one linked invoice, one linked trip, trip-derived calendar visibility, completed checklist records, and one payout record per eligible recipient. It should also assert that editing the booking updates linked projections without creating additional records. The static validator remains the current regression suite; a browser E2E suite should be added before production rollout.

## Prioritized roadmap (no feature expansion)

1. **Data integrity:** migrate from localStorage to a relational backend with stable IDs, foreign keys, unique constraints, and ledgers.
2. **Workflow consolidation:** make booking-derived invoice/trip fields read-only and remove standalone duplicate entry paths.
3. **Operational control:** lock completed trips and approved payout snapshots; resolve rather than delete records.
4. **Navigation simplification:** group desktop modules and retire accepted legacy screens.
5. **Mobile/accessibility:** replace wide tables with cards and complete keyboard/screen-reader testing.
6. **Performance/testing:** split domains, add indexed queries, and automate the full booking-to-payout acceptance path.

## 2026 modernization audit and consolidation pass

### Experience findings addressed

- **Navigation hierarchy:** The desktop sidebar previously presented every authorized destination as one long, equally weighted list. It is now grouped into Command center, Sales & guests, Operations, Finance & insights, and Tools & administration. The role-aware visibility contract remains unchanged, and the focused mobile command bar still keeps the daily operating path one tap away.
- **Dashboard prioritization:** The customizable dashboard contained useful detail but did not begin with a clear exception-oriented operating summary. It now opens with a live command hero, six operational KPI/exception cards, and quick actions for booking, dispatch, assignment, and payment workflows.
- **Calendar dispatch workflow:** Calendar trips previously opened the full Trip edit form immediately, which made quick dispatch review inefficient. Trips now open in a slide-out dispatch panel that summarizes customer, vessel, crew, payment, readiness, notes, and conflicts before users choose to open the linked source records.
- **Calendar filtering:** Calendar filtering was limited to trip status. Dispatchers can now combine status with Vessel, Captain, Mate, Tour Type, and Payment filters across monthly, weekly, daily, and agenda views.
- **Mobile field operations:** The new command KPI layout, horizontally scrollable quick actions/filters, sticky view controls, bottom-sheet style trip detail panel, larger controls, and existing sticky form saves reduce navigation and scrolling during dockside use.
- **Visual consistency:** A final design-system layer standardizes elevation, radii, focus states, spacing, navigation treatment, status colors, dashboard widgets, calendar cards, and responsive behavior without replacing or deleting existing module implementations.

### Workflow and data integrity verification

The source-of-truth hierarchy remains **Booking → Invoice → Trip → Calendar / Payroll / Owner Payout**. Confirmed bookings continue to synchronize exactly one linked invoice and trip through `bookingId`; the calendar remains derived from trips rather than creating duplicate calendar records; payroll and owner payouts remain derived from completed trips. No stored record shape was removed or renamed in this modernization pass, so existing browser data remains compatible.

### Remaining platform constraints

- The app remains a local-first static PWA. It does not provide a shared multi-user database, server-side authorization, or cross-device synchronization.
- Legacy standalone invoice and trip creation remains available for backward compatibility. The preferred operating workflow is to create the booking first and use its linked workflow actions.
- Native searchable select controls are used for crew and vessel assignment. A future server-backed release can enhance these with remote search and inline record creation without changing the relationship model.
