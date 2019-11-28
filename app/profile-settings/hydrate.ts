import React from 'react';
import {hydrate} from 'react-dom';
import SettingsPage from './index.js';

export function pageHydrate(elem) {
    hydrate(SettingsPage, elem);
}
