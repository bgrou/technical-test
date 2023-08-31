import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import ReactMapGl from "react-map-gl";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'WindFlow';

createInertiaApp({
    title: (title) => `${title} - WindFlow`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
