'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Exercise {
  id: string;
  name: string;
  category: string;
}

export default function ExerciseList() {
    // 筋トレ種目のリスト用箱
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Supabaseからデータを取ってくる関数
        const fetchExercises = async () => {
            try {
                const { data, error } = await supabase
                    .from('exercises')
                    .select('*')
                    .order('name', { ascending: true });

                if (error) {
                    console.error('種目の取得に失敗しました:', error.message);
                    throw error;
                }
                setExercises(data || []);
            } catch (error: any) {
                console.error('データの読み込み中にエラーが発生しました:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();

        const channel = supabase
        .channel('exercises_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'exercises' }, (payload) => {
            console.log('Supabaseから変更通知が来ました!', payload);
            fetchExercises();
        })
        .subscribe();

        return () => {
        supabase.removeChannel(channel);
        };
    }, []);

    if (loading) {
        return <p className="p-4 text-center text-gray-600">種目リストを読み込み中...</p>;
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800">登録済み筋トレ種目</h2>
        {exercises.length === 0 ? (
            <p className="text-gray-500">まだ種目が登録されていません。上のフォームから登録してみてね！</p>
        ) : (
            <ul>
            {exercises.map((exercise) => (
                <li key={exercise.id} className="border-b border-gray-200 last:border-b-0 py-3 flex justify-between items-center">
                <span className="font-semibold text-gray-700">{exercise.name}</span> {/* 種目名を表示 */}
                <span className="text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded-full">{exercise.category}</span> {/* カテゴリを表示 */}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}