'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const ExerciseForm = () => {
    // 種目名用の箱
    const [name, setName] = useState('');
    // カテゴリー用の箱
    const [category, setCategory] = useState('');
    // 登録中か判別用の箱
    const [loading, setLoading] = useState(false);

    // 登録処理
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();   // リフレッシュ防止
        setLoading(true);   // ローディング中

        console.log("handleSubmitが呼ばれました。");
        console.log("入力されたデータ:", { name, category });

    try {
        const { error } = await supabase
            .from('exercises')
            .insert([{ name, category}]);

        if (error) {
            console.error('Supabase登録エラー', error);
            throw error;
        }

        console.log("Supabaseにデータが正常に送信されました。");
        alert('種目を登録しました！');
        setName('');   // 登録終了後、箱を空に
        setCategory('');
    } catch (error: any) {
        console.error("登録処理中にエラーが発生しました:", error);
        alert('登録に失敗しました' + error.message);
    } finally {
        setLoading(false);   // 登録終わり
        console.log("登録処理が終了しました。");
    }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-gray-100 rounded-lg">
            <h2>新しい種目を追加</h2>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">種目名</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2"
                    required
                />                
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">カテゴリー</label>
                <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2"
                    placeholder="例：胸, 腕, 脚"
                    required
                />    
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                {loading ? '登録中...' : '登録'}
            </button>    
        </form>
    );
};

export default ExerciseForm;