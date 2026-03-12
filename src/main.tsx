import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <AuthProvider>
            <DataProvider>
                <App />
            </DataProvider>
        </AuthProvider>
    );
}
