import numpy as np
import pandas as pd

def normalize_features(df: pd.DataFrame, numerical_cols: list) -> pd.DataFrame:
    df_copy = df.copy()
    for col in numerical_cols:
        if col in df_copy.columns:
            mean = df_copy[col].mean()
            std = df_copy[col].std()
            df_copy[col] = (df_copy[col] - mean) / (std if std != 0 else 1.0)
    return df_copy

def encode_categorical_features(df: pd.DataFrame, categorical_cols: list) -> pd.DataFrame:
    return pd.get_dummies(df, columns=categorical_cols, drop_first=False)
