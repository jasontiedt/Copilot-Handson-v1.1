-- Seed data for Module 07 (Automation: MCP, PR Review & Issues).
-- Creates a small grocery sales DB the SQLite MCP server can query.
-- Run: sqlite3 scratch/grocery.db < scripts/seed-grocery-db.sql

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS stores;
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    sku        TEXT PRIMARY KEY,
    name       TEXT NOT NULL,
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
    sold_by_weight INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE stores (
    store_id INTEGER PRIMARY KEY,
    name     TEXT NOT NULL,
    region   TEXT NOT NULL
);

CREATE TABLE sales (
    id         INTEGER PRIMARY KEY,
    sku        TEXT NOT NULL REFERENCES products(sku),
    store_id   INTEGER NOT NULL REFERENCES stores(store_id),
    sold_at    TEXT NOT NULL,        -- ISO-8601 UTC
    units      NUMERIC NOT NULL CHECK (units > 0),
    line_total NUMERIC NOT NULL CHECK (line_total >= 0)
);

CREATE INDEX idx_sales_sold_at ON sales(sold_at);
CREATE INDEX idx_sales_sku     ON sales(sku);
CREATE INDEX idx_sales_store   ON sales(store_id);

-- Catalog (matches sample-app catalogs for cross-lab consistency)
INSERT INTO products(sku, name, unit_price, sold_by_weight) VALUES
    ('MILK-1G',  'Whole Milk 1gal',    3.49, 0),
    ('BANANA',   'Bananas (per lb)',   0.59, 1),
    ('BREAD-WW', 'Whole Wheat Bread',  2.99, 0),
    ('EGGS-12',  'Large Eggs Dozen',   4.29, 0),
    ('COFFEE-12','Ground Coffee 12oz', 8.99, 0),
    ('APPLE',    'Apples (per lb)',    1.29, 1),
    ('CHKN-BR',  'Chicken Breast lb',  3.79, 1),
    ('CEREAL',   'Bran Cereal Box',    4.49, 0),
    ('PASTA',    'Spaghetti 1lb',      1.79, 0),
    ('SAUCE',    'Marinara Sauce 24oz',2.59, 0);

INSERT INTO stores(store_id, name, region) VALUES
    (101, 'Lakeland #1',    'Central FL'),
    (202, 'Tampa Westshore','West FL'),
    (303, 'Orlando Maitland','Central FL'),
    (404, 'Miami Brickell', 'South FL'),
    (505, 'Atlanta Buckhead','GA');

-- 100 deterministic sales rows distributed over the last 14 days.
WITH RECURSIVE seq(n) AS (
    SELECT 1 UNION ALL SELECT n + 1 FROM seq WHERE n < 100
),
expanded AS (
    SELECT
        n,
        (SELECT sku FROM products ORDER BY sku LIMIT 1 OFFSET (n * 7) % 10) AS sku,
        (SELECT store_id FROM stores ORDER BY store_id LIMIT 1 OFFSET (n * 3) % 5) AS store_id,
        ROUND(((n * 13) % 8 + 1) * 0.5, 2) AS units,
        datetime('now', '-' || ((n * 5) % 14) || ' days', '-' || ((n * 11) % 24) || ' hours') AS sold_at
    FROM seq
)
INSERT INTO sales(sku, store_id, sold_at, units, line_total)
SELECT
    e.sku,
    e.store_id,
    e.sold_at,
    e.units,
    ROUND(e.units * p.unit_price, 2) AS line_total
FROM expanded e
JOIN products p ON p.sku = e.sku;

SELECT 'products' AS table_name, COUNT(*) AS rows FROM products
UNION ALL SELECT 'stores', COUNT(*) FROM stores
UNION ALL SELECT 'sales',  COUNT(*) FROM sales;
