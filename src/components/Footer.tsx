'use client';

import React from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white p-4 mt-8 shadow-inner">
        <div className="container mx-auto text-center text-sm">
            <p>&copy; {currentYear} Gainventry. All rights reserved.</p>
            <p className="mt-2">Made with ykk</p>
        </div>
        </footer>
    );
}