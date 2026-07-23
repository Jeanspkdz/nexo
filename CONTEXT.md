# Domain glossary

## Booking opportunity research

**Booking automation opportunity**:
A specific combination of a local-service sector, recurring operational booking problem, reachable buyer, and automation workflow that can plausibly support monthly recurring revenue.

**Booking leakage**:
A customer inquiry or existing appointment that fails to become an attended appointment because of delayed response, scheduling error, avoidable cancellation, failed rescheduling, or preventable no-show. It excludes demand the business could not serve profitably.

**Booking receptionist**:
An automation layer that handles defined scheduling conversations through an existing customer channel, updates authoritative availability, and hands uncertain cases to a person. It does not provide professional advice or act as a general-purpose chatbot.

**Paid validation**:
Evidence that a qualified business commits money to test the proposed outcome. Verbal willingness to pay is customer discovery, not paid validation.

**Qualified business**:
A business matching the current ideal-customer screening criteria and experiencing the workflow the opportunity is intended to improve.

**Recovered booking**:
An attended appointment attributable to the automation that otherwise would probably have been lost, with the attribution rule agreed before the pilot.

**Voice automation**:
Inbound or outbound telephone interaction performed by an automated audio agent. Voice automation is distinct from transactional WhatsApp or SMS messaging because it has different trust, cost, consent, and reliability constraints.

## Event venue

**Event venue**:
A business that operates one or more physical spaces for contracted social or corporate events and may bundle personnel or external services.
_Avoid_: Catering company, event planner

**Event space**:
The physical area whose date and time availability is committed by an event contract.
_Avoid_: Event, venue administrator, service package

**Space occupancy**:
The interval covering an event's preparation, execution, and cleanup during which its event space cannot be committed to an overlapping confirmed event.
_Avoid_: Event duration only, mandatory full-day booking

**Availability conflict alert**:
A factual notice that another active opportunity requests an overlapping space occupancy while the space remains unreserved.
_Avoid_: Reservation, repeated pressure, false urgency

**Venue administrator**:
The person representing an Event venue who evaluates opportunities, commits the venue, and secures the personnel required to deliver an event.
_Avoid_: Event customer, worker

**Venue account**:
The venue's workspace containing its opportunities, events, catalog, and private worker network.
_Avoid_: Worker account, event customer account

**Event customer**:
The person or organization negotiating and contracting an event with a venue.
_Avoid_: Venue administrator, event worker

**Customer event**:
The event a User account is organizing, including its shared planning details and the services selected from one or more Event providers.
_Avoid_: Provider contract, Quotation request, Event venue's Confirmed event

**Event opportunity**:
The commercial record that tracks a prospective event from its minimum information through quotation, negotiation, loss, or confirmation.
_Avoid_: Confirmed event, casual greeting

**Opportunity follow-up**:
A limited contextual reminder sent while an Event opportunity awaits the customer's response.
_Avoid_: Marketing campaign, indefinite messaging

**Venue catalog**:
The venue-specific collection of service packages, pricing, additions, advance requirements, and staffing suggestions used to calculate quotations.
_Avoid_: Shared marketplace catalog, unrestricted customer pricing

## Event marketplace

**Event marketplace**:
Nexo's commercial environment where customers discover, compare, contract, and pay companies that provide event-related services.
_Avoid_: Venue-only directory, public worker marketplace

**Event provider**:
A company that offers one or more services used to plan or deliver events, such as venues, catering, decoration, photography, entertainment, furniture, transport, or event personnel.
_Avoid_: Event venue only, individual event worker, Event customer

**Event type**:
The customer occasion being organized, such as a marriage, birthday, graduation, or corporate event; it contextualizes discovery without describing what a provider sells.
_Avoid_: Provider category, service package, company type

**Provider category**:
A customer-facing classification of the event service an Event provider offers. One provider may belong to multiple categories.
_Avoid_: Event type, individual service package

**Category service comparison**:
A side-by-side view of competing services within the same Provider category using that category's standardized attributes.
_Avoid_: Whole-company comparison, cross-category price ranking, price-only ranking

**Contextual provider rating**:
An organic rating for one provider's service within a relevant event type, kept distinct from paid visibility and from unrelated services offered by the same provider.
_Avoid_: Company-wide universal score, sponsored rank, rating for an event itself

**Top-rated providers section**:
The organic home-page section titled “Empresas mejor valoradas para tu evento,” shown after the separately labeled sponsored block for the selected event type.
_Avoid_: Sponsored carousel, “best events,” paid ranking

**Provider portfolio**:
Promotional photos and videos, including TikTok-style content, published by an Event provider to demonstrate its work.
_Avoid_: Customer review, verified reputation, sponsored rank

**Verified customer review**:
A rating and optional written or audiovisual account submitted by a customer after the associated Provider contract has been completed. Each contract permits at most one review of its provider.
_Avoid_: Provider-authored testimonial, portfolio content, unverified rating

**Starting price**:
The lowest valid price Nexo derives from an Event provider's active Service packages or minimum Unit-priced service configuration and shows while a customer explores the marketplace.
_Avoid_: Final quotation, arbitrary promotional price, universal price range

**Service package**:
A provider-defined, contractable combination of one or more included services with a base price and explicit limits or conditions.
_Avoid_: Provider category, final quotation, unpriced promotional description

**Provider service**:
One published, contractable offering from an Event provider in a Provider category. It can be quoted independently and can contain Service packages, Unit-priced services, or both.
_Avoid_: Provider category, whole company, Quotation request

**Unit-priced service**:
A provider offering priced by a declared unit such as person, hour, table, or vehicle, with a minimum contractable quantity.
_Avoid_: Service package, unspecified starting price, final quotation

**Cross-provider event selection**:
The set of services a customer chooses for one event from one or more Event providers. Selecting one provider's service does not require selecting that provider's other services.
_Avoid_: Mandatory company package, single-provider event

**Provider contract**:
An agreement between the Event customer and one Event provider for that provider's accepted services. Each provider has an independent contract even when several Provider contracts belong to the same customer event.
_Avoid_: One contract covering every provider, quotation, entire customer event

**Provider payment schedule**:
The advance requirement, installments, amounts, and due dates agreed for one Provider contract. Each Event provider defines its own schedule, while Nexo presents the schedules together within the customer event.
_Avoid_: Marketplace-wide installment plan, combined provider debt

**Payment installment**:
One full amount due on a specified date within a Provider payment schedule. In the current prototype, it is paid as a whole and does not accept partial payments.
_Avoid_: Operational phase, partial payment, combined marketplace payment

## V1 accounts and quotation

**User account**:
The platform account of a person who explores an available company and requests a quotation for an event.
_Avoid_: Event customer without an account, Venue administrator

**Company account**:
The platform account through which an Event provider publishes its offering, receives quotation requests, and responds to them.
_Avoid_: Venue account with internal operational modules, User account, Event provider itself

**Available company**:
A discoverable Event provider that a User account can inspect before requesting a quotation.
_Avoid_: Previous connection, confirmed supplier

**Quotation request**:
The event information a User account sends to a Company account so that the company can prepare an economic proposal.
_Avoid_: Reservation, contract, quotation

**Requested schedule**:
The approximate interval between the requested start and end times of the event.
_Avoid_: Confirmed Space occupancy, full-day reservation

**Requested service**:
A service the User account wants the company to consider when preparing its quotation.
_Avoid_: Contracted service, catalog package

**Quotation**:
The economic proposal a Company account sends in response to a Quotation request.
_Avoid_: Contract, reservation, payment

**Detailed quotation**:
A Quotation whose required common and category-specific line items expose quantities, units, unit prices, inclusions, exclusions, adjustments, payment terms, and total price.
_Avoid_: Undifferentiated total, marketplace estimate, service description without prices

**Custom quotation item**:
An exceptional line item used when the standardized category catalog does not represent a requested service; it still requires a description, quantity, unit, unit price, and subtotal.
_Avoid_: Primary catalog entry, unexplained extra charge, free-form total

**Quotation validity**:
The period during which a company maintains the terms of its Quotation; it does not reserve the Event space.
_Avoid_: Reservation period, guaranteed availability

**Quotation status**:
The shared commercial stage of a Quotation request: pending, quoted, accepted, rejected, declined, withdrawn, or expired.
_Avoid_: Reservation status, payment status

**Declined quotation request**:
A Quotation request that the Company account closes without issuing a Quotation, together with a factual reason.
_Avoid_: Rejected quotation, cancelled event

**Expired quotation**:
A Quotation whose validity ended before the User account accepted or rejected it.
_Avoid_: Rejected quotation, unavailable Event space

**Withdrawn quotation request**:
A pending Quotation request that the User account closes before the company issues a Quotation.
_Avoid_: Rejected quotation, Event cancellation, demo reset

**Accepted quotation opportunity**:
An Event opportunity whose current Quotation was accepted and is ready for a later contracting step; it is not yet a reservation or Confirmed event.
_Avoid_: Confirmed event, reserved Event space

**Quotation timeline**:
The chronological record of the main commercial changes to one Quotation request.
_Avoid_: Chat history, multiple-quotation history

## Marketplace monetization

**Total contracted event price**:
The current value of all event services accepted by the Event customer, including additions agreed after the initial contract. It is the base used to calculate Nexo's Sales commission.
_Avoid_: Initial quotation total, amount paid to date, customer advance

**Average contract value**:
The mean final price of Provider contracts generated through Nexo, used for business research and commission design rather than as a customer-facing feature.
_Avoid_: Total cost of a multi-provider event, individual contract price, invented prototype metric

**Sales commission**:
A percentage-based charge calculated on the current Total contracted event price through Marginal commission tiers and collected proportionally from each customer payment. Approved additions or reductions recalculate the charge; any excess already collected is refunded or credited. Its rates and tier boundaries are not yet defined.
_Avoid_: Subscription, lead fee, fixed reservation fee

**Marginal commission tiers**:
A decreasing-rate structure in which each portion of the contracted event price retains the rate of its own tier and only the excess enters the next tier.
_Avoid_: One rate applied retroactively to the entire price, commission cliff

**Platform-managed event payment**:
An advance or remaining-balance payment that the Event customer makes through Nexo so the platform can record the sale and administer its Sales commission.
_Avoid_: Payment reported manually by the company, off-platform payment

**Commission refund**:
The return of Nexo's Sales commission when the Company account causes or initiates the cancellation. A customer-initiated cancellation is not eligible because Nexo already generated and processed the contracting opportunity.
_Avoid_: Customer advance refund, automatic refund for every event cancellation

**Sponsored placement**:
Paid, explicitly identified visibility that gives a relevant Available company a promotional position on the home page or in category-and-location discovery results without changing its reviews or organic rank.
_Avoid_: Organic ranking, hidden advertising, purchased reputation, guaranteed sale

## Staffing

**Preliminary coverage**:
A non-binding indication that enough members of a venue's Private worker network have expressed likely availability for an event.
_Avoid_: Confirmed staffing, guaranteed coverage

**Confirmed coverage**:
The state in which specific workers have accepted assignment to every staffing need currently defined for an event.
_Avoid_: Preliminary coverage, guaranteed attendance

**Confirmed assignment**:
A worker's acceptance of a defined role and time interval for an event.
_Avoid_: Network membership, preliminary availability

**Worker role**:
A type of event work an individual worker has agreed to offer, such as waiter, bartender, cleaning, or security.
_Avoid_: Exclusive occupation, administrator-imposed skill

**Private job alert**:
A request sent after event confirmation to eligible members of one venue's Private worker network for a defined number of roles.
_Avoid_: Public job board, automatic first-come assignment

**Staffing risk**:
The visible difference between an event's staffing needs and its preliminary or confirmed coverage.
_Avoid_: Staffing prohibition

**Staffing cancellation**:
A worker's withdrawal from a Confirmed assignment that preserves history and leaves the role needing a replacement.
_Avoid_: Deleting an assignment, Event cancellation

**Private work history**:
The objective record of a worker's accepted, completed, cancelled, late-cancelled, and missed assignments, with visibility limited by relationship.
_Avoid_: Public reputation, universal score

**Location evidence**:
A worker-initiated, time-stamped location capture at assignment check-in or check-out.
_Avoid_: Live tracking, guaranteed presence

**Unrecorded attendance**:
An assignment whose required check-in or check-out evidence is missing and whose attendance result remains unresolved.
_Avoid_: Confirmed absence, automatic no-show

**Assignment compensation**:
The amount a Venue administrator agrees to pay a worker for a Confirmed assignment outside the platform.
_Avoid_: Platform payout, escrow

**Worker cancellation condition**:
The predeclared compensation owed to a worker if the venue cancels an accepted assignment.
_Avoid_: Customer cancellation policy, automatic platform payout

## Contracting and billing

**Confirmed event**:
An event whose customer contract has been accepted and whose advance payment has been recorded by the Venue administrator.
_Avoid_: Event opportunity, quoted event, fully staffed event

**Usage billing period**:
A monthly period whose charge is based on the venue's Confirmed events during that period.
_Avoid_: Flat subscription, per-worker commission

**Billing grace period**:
The limited period after a failed usage charge during which the venue retains normal access while collection is retried.
_Avoid_: Immediate account lockout

**Contract version**:
An immutable set of event terms presented to the Event customer for acceptance.
_Avoid_: Editable accepted contract, quotation draft

**Contract acceptance**:
The recorded identity, time, and explicit assent of an Event customer to one Contract version.
_Avoid_: Certified digital signature, acceptance of future revisions

**Modification window**:
The period before an event during which its customer may request changes to confirmed terms.
_Avoid_: Unlimited editing, automatic contract modification

**Event cancellation**:
The administrator-confirmed termination of a Confirmed event after a customer request or venue decision.
_Avoid_: Staffing cancellation, deleting an event

**Advance disposition**:
The administrator-recorded division of a cancelled event's customer advance into returned and retained amounts.
_Avoid_: Platform refund, automatic cancellation penalty

## Worker network

**Private worker network**:
The individual workers a Venue administrator already knows or personally adds for staffing consideration.
_Avoid_: Supplier directory, marketplace, public directory

**Shared worker recommendation**:
An eligible worker who has enabled limited shared visibility to help another venue cover a Staffing risk.
_Avoid_: Automatic assignment, guaranteed worker

**Network membership handshake**:
Mutual, revocable confirmation in which a Venue administrator invites a worker and the worker explicitly accepts joining that administrator's Private worker network.
_Avoid_: Contact import, automatic enrollment
