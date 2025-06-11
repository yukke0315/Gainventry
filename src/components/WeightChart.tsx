'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 体重データの型
interface WeightData {
    date: string;
    weight: number;
}

export default function WeightChart() {
    // 体重データのリスト箱
    const [weights, setWeights] = useState<WeightData[]>([]);
    // 登録中か判別用の箱
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Supabaseから体重データを取得する関数
        const fetchWeights = async () => {
            try {
                const { data, error } = await supabase
                    .from('weights')
                    .select('date, weight')
                    .order('date', { ascending: true });

                if (error) {
                    console.error('体重データの取得に失敗しました:', error.message);
                    throw error;
                }

                // データ整形
                const formattedData: WeightData[] = data ? data.map(item => ({
                    date: item.date,
                    weight: parseFloat(item.weight)
                })) : [];

                setWeights(formattedData);
            } catch (error: any) {
                console.error('データの読み込み中にエラーが発生しました:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeights();
    }, []);

    return ( 
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">体重推移グラフ</h2>
      {weights.length === 0 ? (
        <p className="text-gray-500">まだ体重が記録されていません。上のフォームから記録してね！</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weights} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" /> 
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}