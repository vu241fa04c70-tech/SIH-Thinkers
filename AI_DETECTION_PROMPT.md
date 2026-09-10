# AI-Generated Content Detection System - Complete Implementation Prompt

## Project Overview
Build a production-ready **AI Content Detection System** that can accurately identify whether text, code, images, or other content is AI-generated or human-created. This should be a complete web application with trained ML models, interactive UI, and real-world usability.

---

## Core Concept
**"Detect AI. Trust Authenticity."**

A powerful platform where users can:
1. Paste text/code or upload files to check if it's AI-generated
2. Get detailed analysis with confidence scores
3. See highlighted suspicious sections
4. Access API for integration with other systems
5. Batch process multiple files
6. Train custom models on their own datasets

---

## Target Users & Use Cases

### Primary Users:
1. **Educators & Teachers** - Detect AI-written assignments, essays
2. **Content Publishers** - Verify article authenticity
3. **Recruiters** - Check if code submissions are AI-generated
4. **Researchers** - Analyze dataset authenticity
5. **Journalists** - Verify source content
6. **Developers** - API integration for automated detection

### Key User Journeys:
- **Journey 1:** Teacher pastes student essay → Gets 87% AI-generated score → Sees suspicious paragraphs highlighted
- **Journey 2:** Recruiter uploads code file → System detects GPT-4 patterns → Shows which functions are likely AI-written
- **Journey 3:** Publisher uploads 100 articles via API → Batch processing → CSV report with scores

---

## Technical Stack

### Backend:
- **Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL 15+ (for user data, detection history)
- **Cache:** Redis (for rate limiting, caching results)
- **ML/DL Libraries:**
  - **transformers** (Hugging Face - for BERT, RoBERTa, GPT detectors)
  - **torch** (PyTorch - deep learning)
  - **tensorflow** (alternative DL framework)
  - **scikit-learn** (traditional ML models)
  - **nltk** / **spacy** (text processing)
  - **sentence-transformers** (embeddings)
  - **detoxify** (content analysis)
- **Data Processing:**
  - **pandas** (data manipulation)
  - **numpy** (numerical operations)
  - **datasets** (Hugging Face datasets)
  - **kaggle** API (dataset downloads)
- **Model Training:**
  - **wandb** (experiment tracking)
  - **optuna** (hyperparameter tuning)
  - **mlflow** (model versioning)

### Frontend:
- **Framework:** React 18+ with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand or React Query
- **Charts:** Recharts (for visualization)
- **Code Display:** react-syntax-highlighter
- **File Upload:** react-dropzone
- **Diff View:** react-diff-viewer

### ML Infrastructure:
- **Training:** Jupyter Notebooks → Python scripts
- **Model Storage:** Models saved in `/models` directory
- **Inference:** FastAPI endpoints with model caching
- **GPU Support:** CUDA-enabled for faster inference

### DevOps:
- **Containerization:** Docker + Docker Compose
- **Environment:** .env configuration
- **Logging:** structlog

---

## Dataset Requirements & Sources

### Best Kaggle Datasets to Use:

#### 1. **Text Detection Datasets** (Primary Focus)

**Dataset 1: AI vs Human Text Dataset**
- **Kaggle URL:** `https://www.kaggle.com/datasets/shanegerami/ai-vs-human-text`
- **Size:** ~50,000+ samples
- **Content:** Mix of GPT-3, GPT-4, Claude, and human-written text
- **Use Case:** Primary training data for text detection

**Dataset 2: ChatGPT Generated Text Detection**
- **Kaggle URL:** `https://www.kaggle.com/datasets/sunilthite/chatgpt-generated-text-detection-corpus`
- **Size:** ~20,000+ samples
- **Content:** Questions/answers from ChatGPT vs human
- **Use Case:** Conversational text detection

**Dataset 3: GPT-2 Output Dataset**
- **Kaggle URL:** `https://www.kaggle.com/datasets/carlmcbrideellis/gpt-2-output-dataset`
- **Size:** 250,000+ samples
- **Content:** GPT-2 generated vs human (news, stories)
- **Use Case:** News article detection

**Dataset 4: AI-Generated vs Real Code**
- **Kaggle URL:** Search for "github copilot code detection"
- **Size:** Varies
- **Content:** Python/JavaScript code from GitHub vs AI-generated
- **Use Case:** Code detection

**Dataset 5: Student Essay Dataset**
- **Kaggle URL:** `https://www.kaggle.com/datasets/radek1/llm-detect-ai-generated-text`
- **Size:** 10,000+ essays
- **Content:** Student essays with AI-generated labels
- **Use Case:** Academic writing detection

#### 2. **Augmentation Datasets**

**Dataset 6: Common Crawl / C4**
- **Source:** Hugging Face `c4` dataset
- **Content:** Real human-written web text
- **Use Case:** Negative examples (human text)

**Dataset 7: AI-Generated Essay Dataset (DAIGT)**
- **Kaggle Competition:** Detect AI Generated Text
- **Size:** 14,000+ essays
- **Use Case:** Competition-grade training data

### Dataset Download Strategy:

```python
# Automated dataset download script
import kaggle
import os

datasets_to_download = [
    'shanegerami/ai-vs-human-text',
    'sunilthite/chatgpt-generated-text-detection-corpus',
    'carlmcbrideellis/gpt-2-output-dataset',
    'radek1/llm-detect-ai-generated-text',
]

def download_kaggle_datasets():
    """Download all required datasets from Kaggle"""
    for dataset in datasets_to_download:
        print(f"Downloading {dataset}...")
        kaggle.api.dataset_download_files(
            dataset,
            path=f'data/raw/{dataset.split("/")[1]}',
            unzip=True
        )
    print("All datasets downloaded!")
```

---

## ML Model Architecture

### Multi-Model Ensemble Approach

Train **5 different models** and ensemble them for best results:

#### Model 1: Fine-tuned RoBERTa (Primary - 40% weight)
```python
from transformers import RobertaForSequenceClassification, RobertaTokenizer

model_name = "roberta-base"
model = RobertaForSequenceClassification.from_pretrained(
    model_name,
    num_labels=2  # AI-generated vs Human
)

# Fine-tune on combined dataset
# Expected accuracy: ~94-96%
```

#### Model 2: Fine-tuned BERT (Secondary - 25% weight)
```python
from transformers import BertForSequenceClassification, BertTokenizer

model = BertForSequenceClassification.from_pretrained(
    'bert-base-uncased',
    num_labels=2
)

# Expected accuracy: ~92-94%
```

#### Model 3: DistilBERT (Fast inference - 15% weight)
```python
from transformers import DistilBertForSequenceClassification

model = DistilBertForSequenceClassification.from_pretrained(
    'distilbert-base-uncased',
    num_labels=2
)

# Expected accuracy: ~90-92%
# Advantage: 2x faster inference
```

#### Model 4: Linguistic Feature-based Classifier (10% weight)
```python
from sklearn.ensemble import GradientBoostingClassifier
import nltk

# Extract linguistic features:
features = [
    'avg_word_length',
    'avg_sentence_length',
    'vocabulary_richness',
    'punctuation_frequency',
    'perplexity_score',
    'burstiness_score',
    'repetition_rate',
    'passive_voice_ratio',
    'readability_scores',
    'named_entity_density'
]

# Train traditional ML model
clf = GradientBoostingClassifier(n_estimators=200)

# Expected accuracy: ~85-88%
# Advantage: Explainable features
```

#### Model 5: GPT-2 Perplexity Detector (10% weight)
```python
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

def calculate_perplexity(text):
    """
    AI-generated text typically has LOWER perplexity
    Human text has HIGHER perplexity (more unpredictable)
    """
    model = GPT2LMHeadModel.from_pretrained('gpt2')
    tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
    
    inputs = tokenizer(text, return_tensors='pt')
    with torch.no_grad():
        outputs = model(**inputs, labels=inputs['input_ids'])
        loss = outputs.loss
        perplexity = torch.exp(loss)
    
    return perplexity.item()

# Threshold: perplexity < 50 → likely AI
#           perplexity > 100 → likely human
```

### Ensemble Strategy:
```python
def ensemble_predict(text):
    """Combine all model predictions"""
    
    # Get predictions from all models
    pred_roberta = model_roberta.predict(text)  # 40%
    pred_bert = model_bert.predict(text)        # 25%
    pred_distilbert = model_distilbert.predict(text)  # 15%
    pred_features = model_features.predict(text)  # 10%
    pred_perplexity = perplexity_detector(text)   # 10%
    
    # Weighted average
    final_score = (
        0.40 * pred_roberta +
        0.25 * pred_bert +
        0.15 * pred_distilbert +
        0.10 * pred_features +
        0.10 * pred_perplexity
    )
    
    return {
        'ai_probability': final_score,
        'verdict': 'AI-Generated' if final_score > 0.5 else 'Human-Written',
        'confidence': abs(final_score - 0.5) * 2,  # 0 to 1
        'model_breakdown': {
            'roberta': pred_roberta,
            'bert': pred_bert,
            'distilbert': pred_distilbert,
            'features': pred_features,
            'perplexity': pred_perplexity
        }
    }
```

---

## Feature Engineering

### Text Analysis Features:

```python
def extract_linguistic_features(text):
    """Extract 50+ features for detection"""
    
    features = {}
    
    # 1. Basic Statistics
    features['word_count'] = len(text.split())
    features['char_count'] = len(text)
    features['avg_word_length'] = np.mean([len(w) for w in text.split()])
    features['sentence_count'] = len(sent_tokenize(text))
    features['avg_sentence_length'] = features['word_count'] / max(features['sentence_count'], 1)
    
    # 2. Vocabulary Richness
    words = text.lower().split()
    unique_words = set(words)
    features['unique_word_ratio'] = len(unique_words) / max(len(words), 1)
    features['type_token_ratio'] = len(unique_words) / max(len(words), 1)
    
    # 3. Punctuation Analysis
    features['comma_frequency'] = text.count(',') / max(features['char_count'], 1)
    features['period_frequency'] = text.count('.') / max(features['char_count'], 1)
    features['exclamation_frequency'] = text.count('!') / max(features['char_count'], 1)
    
    # 4. Syntactic Complexity
    features['avg_clause_length'] = calculate_avg_clause_length(text)
    features['subordinate_clause_ratio'] = count_subordinate_clauses(text)
    
    # 5. Semantic Features
    features['named_entity_density'] = count_named_entities(text) / max(features['word_count'], 1)
    features['proper_noun_ratio'] = count_proper_nouns(text) / max(features['word_count'], 1)
    
    # 6. Readability Scores
    features['flesch_reading_ease'] = textstat.flesch_reading_ease(text)
    features['flesch_kincaid_grade'] = textstat.flesch_kincaid_grade(text)
    features['gunning_fog'] = textstat.gunning_fog(text)
    
    # 7. Stylistic Features
    features['passive_voice_ratio'] = detect_passive_voice(text)
    features['transition_word_density'] = count_transition_words(text)
    features['hedging_word_density'] = count_hedging_words(text)
    
    # 8. AI-Specific Patterns
    features['repetition_score'] = calculate_repetition(text)
    features['burstiness'] = calculate_burstiness(text)  # Variation in sentence length
    features['perplexity'] = calculate_perplexity(text)
    
    # 9. Emotional Markers
    features['sentiment_polarity'] = TextBlob(text).sentiment.polarity
    features['sentiment_subjectivity'] = TextBlob(text).sentiment.subjectivity
    
    # 10. Structural Patterns
    features['paragraph_count'] = text.count('\n\n') + 1
    features['avg_paragraph_length'] = features['word_count'] / features['paragraph_count']
    features['opening_phrase_commonality'] = check_common_ai_openings(text)
    
    return features


def check_common_ai_openings(text):
    """Check for common AI-generated opening phrases"""
    ai_phrases = [
        "as an ai", "as a language model", "i'm sorry, but",
        "in today's world", "in this article", "it's important to note",
        "in conclusion", "to summarize", "first and foremost",
        "it is worth noting", "one of the most", "in recent years"
    ]
    
    text_lower = text.lower()[:200]  # Check first 200 chars
    matches = sum(1 for phrase in ai_phrases if phrase in text_lower)
    return matches


def calculate_burstiness(text):
    """
    Burstiness measures variation in sentence length
    Human text: HIGH burstiness (varied sentences)
    AI text: LOW burstiness (uniform sentences)
    """
    sentences = sent_tokenize(text)
    lengths = [len(s.split()) for s in sentences]
    
    if len(lengths) < 2:
        return 0
    
    return np.std(lengths) / (np.mean(lengths) + 1e-10)
```

---

## Training Pipeline

### Complete Training Script Structure:

```python
# train_detector.py

import os
import pandas as pd
import torch
from transformers import (
    RobertaTokenizer, RobertaForSequenceClassification,
    Trainer, TrainingArguments
)
from sklearn.model_selection import train_test_split
from datasets import Dataset
import wandb

# 1. Data Loading & Preprocessing
def load_and_combine_datasets():
    """Load all Kaggle datasets and combine them"""
    
    all_data = []
    
    # Dataset 1: AI vs Human
    df1 = pd.read_csv('data/raw/ai-vs-human-text/data.csv')
    df1 = df1.rename(columns={'text': 'content', 'label': 'is_ai'})
    all_data.append(df1)
    
    # Dataset 2: ChatGPT Detection
    df2 = pd.read_csv('data/raw/chatgpt-generated-text/data.csv')
    df2 = df2.rename(columns={'text': 'content', 'generated': 'is_ai'})
    all_data.append(df2)
    
    # Dataset 3: GPT-2 Output
    df3 = pd.read_csv('data/raw/gpt-2-output/data.csv')
    df3['is_ai'] = df3['label'].apply(lambda x: 1 if x == 'generated' else 0)
    df3 = df3.rename(columns={'text': 'content'})
    all_data.append(df3)
    
    # Dataset 4: Student Essays
    df4 = pd.read_csv('data/raw/llm-detect/train_essays.csv')
    df4 = df4.rename(columns={'text': 'content', 'generated': 'is_ai'})
    all_data.append(df4)
    
    # Combine all datasets
    combined_df = pd.concat(all_data, ignore_index=True)
    
    # Remove duplicates
    combined_df = combined_df.drop_duplicates(subset=['content'])
    
    # Clean text
    combined_df['content'] = combined_df['content'].apply(clean_text)
    
    # Remove very short/long texts
    combined_df = combined_df[
        (combined_df['content'].str.split().str.len() >= 10) &
        (combined_df['content'].str.split().str.len() <= 1000)
    ]
    
    print(f"Total samples: {len(combined_df)}")
    print(f"AI-generated: {combined_df['is_ai'].sum()}")
    print(f"Human-written: {(1 - combined_df['is_ai']).sum()}")
    
    return combined_df


def clean_text(text):
    """Clean and normalize text"""
    import re
    
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)
    
    # Remove URLs
    text = re.sub(r'http\S+|www\S+', '', text)
    
    # Remove special characters (keep basic punctuation)
    text = re.sub(r'[^\w\s.,!?;:\-\'"()]', '', text)
    
    return text.strip()


# 2. Data Augmentation
def augment_data(df, augmentation_factor=2):
    """Apply data augmentation techniques"""
    from nlpaug.augmenter.word import SynonymAug, ContextualWordEmbsAug
    
    aug_synonym = SynonymAug(aug_src='wordnet')
    
    augmented_data = []
    
    for idx, row in df.iterrows():
        # Original text
        augmented_data.append(row)
        
        # Augmented versions
        if augmentation_factor > 1:
            try:
                aug_text = aug_synonym.augment(row['content'])
                augmented_data.append({
                    'content': aug_text,
                    'is_ai': row['is_ai']
                })
            except:
                pass
    
    return pd.DataFrame(augmented_data)


# 3. Model Training Function
def train_roberta_detector(train_df, val_df):
    """Train RoBERTa-based AI detector"""
    
    # Initialize model and tokenizer
    model_name = 'roberta-base'
    tokenizer = RobertaTokenizer.from_pretrained(model_name)
    model = RobertaForSequenceClassification.from_pretrained(
        model_name,
        num_labels=2
    )
    
    # Tokenize datasets
    def tokenize_function(examples):
        return tokenizer(
            examples['content'],
            padding='max_length',
            truncation=True,
            max_length=512
        )
    
    train_dataset = Dataset.from_pandas(train_df)
    val_dataset = Dataset.from_pandas(val_df)
    
    train_dataset = train_dataset.map(tokenize_function, batched=True)
    val_dataset = val_dataset.map(tokenize_function, batched=True)
    
    train_dataset = train_dataset.rename_column('is_ai', 'labels')
    val_dataset = val_dataset.rename_column('is_ai', 'labels')
    
    # Training arguments
    training_args = TrainingArguments(
        output_dir='./models/roberta-ai-detector',
        num_train_epochs=3,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=32,
        warmup_steps=500,
        weight_decay=0.01,
        logging_dir='./logs',
        logging_steps=100,
        evaluation_strategy='steps',
        eval_steps=500,
        save_steps=1000,
        save_total_limit=3,
        load_best_model_at_end=True,
        metric_for_best_model='eval_loss',
        report_to='wandb'
    )
    
    # Define metrics
    from sklearn.metrics import accuracy_score, precision_recall_fscore_support
    
    def compute_metrics(pred):
        labels = pred.label_ids
        preds = pred.predictions.argmax(-1)
        precision, recall, f1, _ = precision_recall_fscore_support(
            labels, preds, average='binary'
        )
        acc = accuracy_score(labels, preds)
        return {
            'accuracy': acc,
            'precision': precision,
            'recall': recall,
            'f1': f1
        }
    
    # Initialize Trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        compute_metrics=compute_metrics
    )
    
    # Train
    print("Starting training...")
    trainer.train()
    
    # Save model
    model.save_pretrained('./models/roberta-ai-detector-final')
    tokenizer.save_pretrained('./models/roberta-ai-detector-final')
    
    # Evaluate
    results = trainer.evaluate()
    print(f"Final evaluation results: {results}")
    
    return model, tokenizer, results


# 4. Main Training Pipeline
def main():
    # Initialize W&B for experiment tracking
    wandb.init(project='ai-content-detector', name='roberta-ensemble')
    
    # Load datasets
    print("Loading and combining datasets...")
    df = load_and_combine_datasets()
    
    # Split data
    train_df, temp_df = train_test_split(df, test_size=0.3, random_state=42, stratify=df['is_ai'])
    val_df, test_df = train_test_split(temp_df, test_size=0.5, random_state=42, stratify=temp_df['is_ai'])
    
    print(f"Train: {len(train_df)}, Val: {len(val_df)}, Test: {len(test_df)}")
    
    # Optional: Augment training data
    # train_df = augment_data(train_df, augmentation_factor=2)
    
    # Train RoBERTa model
    model, tokenizer, results = train_roberta_detector(train_df, val_df)
    
    # Train other models (BERT, DistilBERT, Feature-based)
    # ... (similar process)
    
    # Evaluate on test set
    print("\nEvaluating on test set...")
    test_results = evaluate_on_test_set(model, tokenizer, test_df)
    print(f"Test Results: {test_results}")
    
    wandb.finish()


if __name__ == '__main__':
    main()
```

### Training Configuration:

```yaml
# training_config.yaml

model:
  name: "roberta-base"
  max_length: 512
  num_labels: 2

training:
  batch_size: 16
  learning_rate: 2e-5
  num_epochs: 3
  warmup_steps: 500
  weight_decay: 0.01
  gradient_accumulation_steps: 2

data:
  train_split: 0.7
  val_split: 0.15
  test_split: 0.15
  min_text_length: 10
  max_text_length: 1000

ensemble:
  roberta_weight: 0.40
  bert_weight: 0.25
  distilbert_weight: 0.15
  features_weight: 0.10
  perplexity_weight: 0.10
```

---

## Database Schema

```sql
-- Users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255),
    full_name VARCHAR(255),
    api_key VARCHAR(100) UNIQUE,
    subscription_tier VARCHAR(20) DEFAULT 'free', -- free, pro, enterprise
    requests_today INTEGER DEFAULT 0,
    requests_limit INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Detection History
CREATE TABLE detections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    
    -- Input
    content_text TEXT NOT NULL,
    content_type VARCHAR(20) DEFAULT 'text', -- text, code, essay
    content_length INTEGER,
    
    -- Detection Results
    ai_probability DECIMAL(5,4) NOT NULL,
    verdict VARCHAR(20) NOT NULL, -- ai_generated, human_written, uncertain
    confidence_score DECIMAL(5,4),
    
    -- Model Breakdown
    model_scores JSONB, -- scores from individual models
    
    -- Analysis
    linguistic_features JSONB,
    suspicious_sections JSONB, -- array of text spans
    explanation TEXT,
    
    -- Metadata
    processing_time_ms INTEGER,
    model_version VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- API Usage Tracking
CREATE TABLE api_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    api_key VARCHAR(100),
    endpoint VARCHAR(100),
    request_size_bytes INTEGER,
    response_time_ms INTEGER,
    status_code INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Feedback (for model improvement)
CREATE TABLE user_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    detection_id UUID REFERENCES detections(id),
    user_id UUID REFERENCES users(id),
    is_correct BOOLEAN,
    actual_label VARCHAR(20), -- what user says it actually is
    comments TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_detections_user_date ON detections(user_id, created_at DESC);
CREATE INDEX idx_api_requests_user_date ON api_requests(user_id, created_at DESC);
```

---

## API Endpoints

```python
# Backend API Structure

# Detection Endpoints
POST   /api/detect/text          # Detect AI in text
POST   /api/detect/file          # Upload file for detection
POST   /api/detect/batch         # Batch detection
GET    /api/detect/result/{id}   # Get detection result

# Analysis Endpoints
POST   /api/analyze/detailed     # Detailed analysis with explanations
POST   /api/analyze/compare      # Compare multiple texts

# History Endpoints
GET    /api/history              # Get user's detection history
GET    /api/history/{id}         # Get specific detection
DELETE /api/history/{id}         # Delete detection

# User Endpoints
POST   /api/auth/register
POST   /api/auth/login
GET    /api/users/me
POST   /api/users/generate-api-key
GET    /api/users/usage-stats

# Feedback
POST   /api/feedback/{detection_id}

# Public
GET    /api/stats                # Public statistics
GET    /api/models/info          # Model information
```

### Sample Detection Endpoint:

```python
# backend/app/api/v1/endpoints/detection.py

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from app.services.detector import AIDetector
from app.models.schemas import TextDetectionRequest, DetectionResponse

router = APIRouter()
detector = AIDetector()

@router.post("/detect/text", response_model=DetectionResponse)
async def detect_ai_text(
    request: TextDetectionRequest,
    current_user = Depends(get_current_user)
):
    """
    Detect if text is AI-generated
    
    Returns detailed analysis with:
    - AI probability score
    - Confidence level
    - Suspicious sections highlighted
    - Linguistic analysis
    - Model breakdown
    """
    
    # Check rate limit
    if current_user.requests_today >= current_user.requests_limit:
        raise HTTPException(
            status_code=429,
            detail="Daily request limit exceeded. Upgrade to Pro for unlimited requests."
        )
    
    # Validate input
    if len(request.text) < 50:
        raise HTTPException(
            status_code=400,
            detail="Text too short. Minimum 50 characters required for accurate detection."
        )
    
    # Run detection
    result = await detector.detect(request.text)
    
    # Save to database
    detection_record = await save_detection(
        user_id=current_user.id,
        content=request.text,
        result=result
    )
    
    # Update usage counter
    await increment_user_requests(current_user.id)
    
    return DetectionResponse(
        id=detection_record.id,
        verdict=result['verdict'],
        ai_probability=result['ai_probability'],
        confidence=result['confidence'],
        suspicious_sections=result['suspicious_sections'],
        linguistic_analysis=result['linguistic_features'],
        model_breakdown=result['model_breakdown'],
        explanation=result['explanation'],
        processing_time_ms=result['processing_time_ms']
    )


@router.post("/detect/file")
async def detect_ai_file(
    file: UploadFile,
    current_user = Depends(get_current_user)
):
    """
    Upload a file (txt, docx, pdf, py, js, etc.) for AI detection
    """
    
    # Read file content
    content = await file.read()
    
    # Extract text based on file type
    if file.filename.endswith('.txt'):
        text = content.decode('utf-8')
    elif file.filename.endswith('.docx'):
        text = extract_text_from_docx(content)
    elif file.filename.endswith('.pdf'):
        text = extract_text_from_pdf(content)
    else:
        text = content.decode('utf-8')  # Assume text file
    
    # Run detection
    result = await detector.detect(text)
    
    return result


@router.post("/detect/batch")
async def detect_ai_batch(
    texts: list[str],
    current_user = Depends(get_current_user_pro)  # Pro users only
):
    """
    Batch detection for multiple texts
    Returns CSV download link
    """
    
    results = []
    
    for idx, text in enumerate(texts):
        result = await detector.detect(text)
        results.append({
            'index': idx,
            'text_preview': text[:100],
            'verdict': result['verdict'],
            'ai_probability': result['ai_probability'],
            'confidence': result['confidence']
        })
    
    # Generate CSV
    csv_path = generate_csv_report(results)
    
    return {
        'total_processed': len(texts),
        'results': results,
        'download_url': f'/api/downloads/{csv_path}'
    }
```

---

## Frontend Implementation

### Key Pages:

#### 1. **Home / Landing Page**
```
┌──────────────────────────────────────────┐
│  🔍 AI Detector                          │
│                                          │
│  Detect AI-Generated Content             │
│  Instantly and Accurately                │
│                                          │
│  [Try It Free →]                         │
│                                          │
│  ✓ 96% Accuracy   ✓ Multi-Model          │
│  ✓ Explainable    ✓ API Access           │
└──────────────────────────────────────────┘
```

#### 2. **Detection Page (Main Feature)**
```
┌──────────────────────────────────────────┐
│  Paste Text or Upload File               │
├──────────────────────────────────────────┤
│  ┌────────────────────────────────────┐  │
│  │ Enter or paste your text here...   │  │
│  │                                    │  │
│  │                                    │  │
│  └────────────────────────────────────┘  │
│                                          │
│  [📎 Upload File]  [Analyze Text →]      │
└──────────────────────────────────────────┘

After analysis:
┌──────────────────────────────────────────┐
│  🚨 Detection Result                     │
├──────────────────────────────────────────┤
│  ┌─────────────────────────────────────┐ │
│  │  AI-GENERATED CONTENT DETECTED      │ │
│  │  Probability: 87.3%                 │ │
│  │  Confidence: High (0.74)            │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  📊 Model Breakdown:                     │
│  ━━━━━━━━━━━━━━━━━━━━━ 92% RoBERTa      │
│  ━━━━━━━━━━━━━━━━━━━ 88% BERT           │
│  ━━━━━━━━━━━━━━━━ 79% DistilBERT        │
│                                          │
│  🔍 Suspicious Sections:                 │
│  [Text with highlighted paragraphs]      │
│                                          │
│  💡 Why? Low perplexity, uniform         │
│  sentence structure, common AI phrases   │
│                                          │
│  [Export Report] [Share] [Give Feedback] │
└──────────────────────────────────────────┘
```

#### 3. **History Page**
```
┌──────────────────────────────────────────┐
│  Detection History                       │
├──────────────────────────────────────────┤
│  📅 Today                                │
│  ┌────────────────────────────────────┐  │
│  │ Essay about climate change          │  │
│  │ 87% AI | 2:45 PM        [View →]   │  │
│  └────────────────────────────────────┘  │
│  ┌────────────────────────────────────┐  │
│  │ Python code submission              │  │
│  │ 23% AI | 1:30 PM        [View →]   │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

#### 4. **API Dashboard**
```
┌──────────────────────────────────────────┐
│  Your API Key                            │
│  ┌────────────────────────────────────┐  │
│  │ sk-1234567890abcdef       [Copy]   │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Usage Today: 45 / 100 requests          │
│  [━━━━━━━━━────────] 45%                │
│                                          │
│  [Upgrade to Pro for Unlimited]          │
│                                          │
│  📖 API Documentation                    │
│  curl -X POST https://api.aidetector...  │
└──────────────────────────────────────────┘
```

---

## Project Structure

```
ai-content-detector/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   ├── detection.py
│   │   │       │   ├── auth.py
│   │   │       │   ├── history.py
│   │   │       │   └── users.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── logging.py
│   │   ├── models/
│   │   │   ├── database/
│   │   │   │   ├── user.py
│   │   │   │   └── detection.py
│   │   │   └── schemas/
│   │   │       └── detection_schema.py
│   │   ├── services/
│   │   │   ├── detector.py           # Main AI detector
│   │   │   ├── ensemble_model.py     # Ensemble logic
│   │   │   ├── feature_extractor.py  # Linguistic features
│   │   │   ├── explainer.py          # SHAP/explanations
│   │   │   └── highlighter.py        # Suspicious section detection
│   │   └── main.py
│   ├── ml/
│   │   ├── models/
│   │   │   ├── roberta-ai-detector/
│   │   │   ├── bert-ai-detector/
│   │   │   └── feature-classifier.pkl
│   │   ├── training/
│   │   │   ├── train_roberta.py
│   │   │   ├── train_bert.py
│   │   │   ├── train_features.py
│   │   │   └── evaluate.py
│   │   └── notebooks/
│   │       ├── 01_data_exploration.ipynb
│   │       ├── 02_model_training.ipynb
│   │       └── 03_evaluation.ipynb
│   ├── data/
│   │   ├── raw/                      # Downloaded Kaggle datasets
│   │   ├── processed/                # Cleaned and combined data
│   │   └── scripts/
│   │       ├── download_datasets.py
│   │       └── preprocess_data.py
│   ├── tests/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── detection/
│   │   │   │   ├── TextInput.tsx
│   │   │   │   ├── FileUpload.tsx
│   │   │   │   ├── ResultDisplay.tsx
│   │   │   │   ├── HighlightedText.tsx
│   │   │   │   └── ModelBreakdown.tsx
│   │   │   ├── history/
│   │   │   │   └── HistoryList.tsx
│   │   │   └── common/
│   │   │       ├── Layout.tsx
│   │   │       └── Header.tsx
│   │   ├── services/
│   │   │   └── detectionService.ts
│   │   ├── types/
│   │   │   └── detection.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Step-by-Step Implementation Guide

### Phase 1: Data Collection & Preparation (Days 1-2)

1. **Setup Kaggle API:**
```bash
pip install kaggle
# Add Kaggle API token to ~/.kaggle/kaggle.json
```

2. **Download Datasets:**
```python
# Run automated download script
python backend/data/scripts/download_datasets.py
```

3. **Explore & Clean Data:**
```python
# Run Jupyter notebook
jupyter notebook backend/ml/notebooks/01_data_exploration.ipynb
```

4. **Combine & Preprocess:**
```python
python backend/data/scripts/preprocess_data.py
# Output: data/processed/combined_dataset.csv
```

### Phase 2: Model Training (Days 3-5)

1. **Train RoBERTa Model:**
```bash
python backend/ml/training/train_roberta.py
# Expected time: 4-6 hours on GPU
```

2. **Train BERT Model:**
```bash
python backend/ml/training/train_bert.py
```

3. **Train Feature-based Model:**
```bash
python backend/ml/training/train_features.py
```

4. **Evaluate All Models:**
```bash
python backend/ml/training/evaluate.py
# Outputs: accuracy, precision, recall, F1 for each model
```

### Phase 3: Backend Development (Days 6-8)

1. **Setup FastAPI Project:**
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. **Implement Core Detector:**
```python
# backend/app/services/detector.py
# Implement ensemble model loading and inference
```

3. **Create API Endpoints:**
```python
# backend/app/api/v1/endpoints/detection.py
# Implement all detection endpoints
```

4. **Setup Database:**
```bash
alembic init alembic
alembic revision --autogenerate -m "Initial schema"
alembic upgrade head
```

### Phase 4: Frontend Development (Days 9-11)

1. **Setup React Project:**
```bash
cd frontend
npm install
```

2. **Build Detection UI:**
```typescript
// src/components/detection/TextInput.tsx
// src/components/detection/ResultDisplay.tsx
```

3. **Connect to API:**
```typescript
// src/services/detectionService.ts
```

### Phase 5: Testing & Optimization (Days 12-13)

1. **Unit Tests**
2. **Integration Tests**
3. **Performance Optimization**
4. **UI/UX Polish**

### Phase 6: Deployment (Day 14)

1. **Dockerize Application**
2. **Deploy to Cloud**
3. **Setup Monitoring**

---

## Success Metrics

### Model Performance:
- **Accuracy:** > 94% on test set
- **Precision:** > 92% (low false positives)
- **Recall:** > 90% (catch most AI content)
- **F1 Score:** > 91%
- **Inference Time:** < 500ms per detection

### User Experience:
- **Response Time:** < 2 seconds for analysis
- **UI Load Time:** < 1 second
- **Mobile Responsive:** Works on all devices
- **Error Rate:** < 1% API errors

---

## Unique Features (Stand Out)

1. **Multi-Model Ensemble** - More accurate than single models
2. **Explainable AI** - Shows WHY content is flagged
3. **Highlight Suspicious Sections** - Visual feedback
4. **Batch Processing** - Upload 100+ files at once
5. **API Access** - Easy integration for developers
6. **Continuous Learning** - Models improve from user feedback
7. **Multiple Content Types** - Text, code, essays, articles
8. **Perplexity Analysis** - Additional detection layer
9. **Linguistic Feature Extraction** - 50+ features analyzed
10. **Real-Time Detection** - Instant results

---

## FINAL INSTRUCTIONS FOR ANTIGRAVITY

**Build a complete AI content detection system with:**

1. ✅ Automated Kaggle dataset downloads (5+ datasets)
2. ✅ Data preprocessing and combining pipeline
3. ✅ Train 3+ models (RoBERTa, BERT, Feature-based)
4. ✅ Ensemble prediction system
5. ✅ FastAPI backend with all endpoints
6. ✅ PostgreSQL database
7. ✅ React TypeScript frontend
8. ✅ Text highlighting for suspicious sections
9. ✅ Model explainability (SHAP values)
10. ✅ Authentication & API keys
11. ✅ History tracking
12. ✅ Responsive UI with Tailwind
13. ✅ Docker containerization
14. ✅ Comprehensive documentation

**Priority: Train high-accuracy models first (>92%), then build UI around them.**

**Expected Training Time: 6-8 hours on GPU or 24-48 hours on CPU**

**Final Deliverable: Production-ready web app that anyone can use to detect AI content with high accuracy.**

Start with data collection and model training - that's the foundation!
