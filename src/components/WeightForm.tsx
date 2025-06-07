'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function WeightForm() {
    // 体重用の箱
    const [weight, setWeight] = useState('');
    // 記録日用の箱
    const [date, setDate] = useState('');
    // 登録中か判別用の箱
    const [loading, setLoading] = useState(false);

    // 日付のフォーマットをYYYY-MM-DDにする関数
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    React.useEffect(() => {
        // 初期値として今日の日付を設定
        setDate(getTodayDate());
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();   // リフレッシュ防止
        setLoading(true);   // ローディング中

        // 入力チェック
        if (isNaN(parseFloat(weight)) || !date) {
            alert('正しい体重と日付を入力してください！');
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase
                .from('weights')
                .insert([{ weight: parseFloat(weight), date }]);

            if (error) {
                console.error('Supabase登録エラー', error);
                throw error;
            }

            console.log("Supabaseにデータが正常に送信されました。");
            alert('体重を登録しました！');
            setWeight('');   // 登録終了後、箱を空に
            setDate(getTodayDate()); // 日付も今日にリセット
        } catch (error: any) {
            console.error("登録処理中にエラーが発生しました:", error);
            alert('登録に失敗しました: ' + error.message);
        } finally {
            setLoading(false);
            console.log("登録処理が終了しました。");
        }
    }
    
    return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">今日の体重を記録</h2>
      <div>
        <label htmlFor="recordDate" className="block text-sm font-medium text-gray-700">日付</label>
        <input
          type="date"
          id="recordDate"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div className="mt-4">
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">体重 (kg)</label>
        <input
          type="number"
          id="weight"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="例: 65.5"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 disabled:bg-green-300 mt-4"
      >
        {loading ? '記録中...' : '記録'}
      </button>
    </form>
  );
}