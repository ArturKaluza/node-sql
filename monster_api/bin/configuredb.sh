#!/bin/bash
echo "Configuring database: monsterdb"

dropdb -U node_user monsterdb

createdb -U node_user monsterdb

psql -U node_user monsterdb < ./bin/sql/monsters.sql

echo "monsterdb configured"