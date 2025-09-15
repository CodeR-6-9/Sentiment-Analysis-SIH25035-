# sentiment_analysis_tokenizer

This folder stores the **saved tokenizer** for the sentiment analysis model.

## Contents
When the tokenizer is saved, you will typically find:
- `vocab.txt` → vocabulary file
- `tokenizer_config.json` → tokenizer configuration
- `special_tokens_map.json` → mapping for special tokens (e.g., [CLS], [SEP], [PAD])
- (optional) `added_tokens.json` → any custom tokens you added

## Notes
- These files are created automatically using Hugging Face’s `tokenizer.save_pretrained()` method.
- The tokenizer must always match the model used in `sentiment_analysis_model/`.
- Do **not** edit these files manually; they are required for consistent tokenization.
