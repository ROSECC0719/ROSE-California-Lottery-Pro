# ROSE California Lottery Pro V1.0

Independent research project for California Lottery Fantasy 5.

Status: V1.0 foundation/specification package (no production Firebase writes).

## Locked game
- Official game: California Lottery Fantasy 5
- Number field: 1-39
- Draw: 5 numbers, order irrelevant
- Frequency: daily, after draw entry closes at 6:30 p.m. California time
- Official top-prize odds: 1 in 575,757

## Research principles
1. Walk-forward evaluation may use only information available before each evaluated draw.
2. Model scores are research scores, never represented as true winning probabilities.
3. Historical performance is reported as-is.
4. Research includes combinations and structures, not only single-number rankings.
5. Heavy computation must be chunked/non-blocking for mobile use.
6. Version, UI version, README, Service Worker cache name, and ZIP filename move together.
7. JavaScript syntax and ZIP integrity are checked for every release.
8. California data is isolated from all Taiwan 539 production data.

## Data isolation
Proposed Firebase root namespace: `roseCaliforniaLotteryPro/fantasy5/v1/`
Do not reuse any Taiwan 539 collection, document, storage prefix, cache key, or service worker scope.

## V1 modules planned
- Official historical draw database
- Paper Research Mode
- Number / combination / structure research
- Carry/transition relationships
- Rule research and regime tracking
- Hit statistics
- Strict walk-forward blind testing
- Independent GPT research layer
- Combination burst research
- Daily research snapshots
- Firebase cloud sync (separate namespace/project configuration)

No claim is made that historical patterns predict future random draws.
