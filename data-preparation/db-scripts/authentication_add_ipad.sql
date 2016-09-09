USE mol
--
-- Alter table "Authentication"
--
ALTER TABLE Authentication
  ADD COLUMN ipad BOOLEAN DEFAULT false AFTER token;