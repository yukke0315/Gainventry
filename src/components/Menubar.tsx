'use client';

import Link from 'next/link';

export default function Menubar() {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/" className="text-white hover:text-gray-300">ホーム</Link>
                </li>
                <li>
                    <Link href="/exercises" className="text-white hover:text-gray-300">筋トレ種目</Link>
                </li>
                <li>
                    <Link href="/weights" className="text-white hover:text-gray-300">体重管理</Link>
                </li>
            </ul>
        </nav>
    );
}