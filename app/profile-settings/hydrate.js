import React from 'react';
import {hydrate} from 'react-dom';
import SettingsPage from './index';

export function pageHydrate(elem) {
    hydrate(SettingsPage, elem);
}
