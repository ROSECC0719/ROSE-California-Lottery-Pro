# Architecture Draft

## Layers
1. ingestion: official draw records + validation
2. canonical store: draw/date/numbers/source/regime metadata
3. research engine: number, pair, triple, structure, transition, burst features
4. walk-forward engine: strict cutoff at t-1 for evaluation of t
5. UI: ROSE-series visual language, mobile-first, chunked workloads
6. cloud: California-only Firebase namespace/configuration
7. snapshots: immutable daily research records

## Initial canonical draw schema
`{ game, drawNumber, drawDate, numbers[5], source, fetchedAt, ruleRegime }`

Validation: exactly five unique integers, each 1..39, sorted only for canonical storage (original source retained if needed).
