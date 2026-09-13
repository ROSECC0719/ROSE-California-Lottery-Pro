# Strict Walk-forward Protocol

For target draw t:
- Training/features may use draws <= t-1 only.
- Any rolling normalization, threshold selection, feature selection or model tuning must be fit inside the available historical window.
- No future draw may influence parameters, labels, thresholds or candidate selection.
- Results record cutoff draw, candidate set, research scores, realized matches and configuration hash.
- Baselines must be retained and weak/negative results shown without suppression.
