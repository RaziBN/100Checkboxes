-- Create the checkbox_states table if it doesn't already exist
CREATE TABLE IF NOT EXISTS checkbox_states (
  id INTEGER PRIMARY KEY,
  state TEXT NOT NULL
);

-- Create users table if it does not exist
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

-- Create federated_credentials table if it does not exist
CREATE TABLE IF NOT EXISTS federated_credentials (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  provider TEXT NOT NULL,
  subject TEXT NOT NULL,
  UNIQUE(user_id, provider)
);

-- Insert default values if the table is empty
INSERT OR IGNORE INTO checkbox_states (id, state) VALUES (
  1,
  '[
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false
  ]'
);