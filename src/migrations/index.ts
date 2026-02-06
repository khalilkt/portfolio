import * as migration_20260203_201458_optional_name_here from './20260203_201458_optional_name_here';
import * as migration_20260206_164638 from './20260206_164638';

export const migrations = [
  {
    up: migration_20260203_201458_optional_name_here.up,
    down: migration_20260203_201458_optional_name_here.down,
    name: '20260203_201458_optional_name_here',
  },
  {
    up: migration_20260206_164638.up,
    down: migration_20260206_164638.down,
    name: '20260206_164638'
  },
];
