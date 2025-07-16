import hashlib

def get_deterministic_value(key: str, seed: str) -> float:
    """
    Generate a deterministic value based on key and seed.
  
    Returns:
        float: A value between 0.0 and 1.0
    """
    hash_input = f"{key}:{seed}"
    hash_value = int(hashlib.md5(hash_input.encode()).hexdigest(), 16)
    decimal_precision = 4
    
    return (hash_value % (10**decimal_precision)) / (10**decimal_precision)