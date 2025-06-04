import React from 'react';

const ExerciseForm = () => {
    return (
        <form>
            <h2>新しい種目を追加</h2>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">種目名</label>
                <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2"
                />                
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">カテゴリー</label>
                <input
                    type="text"
                    id="category"
                    className="mt-1 block w-full border border-gray-300 shadow-sm rounded-md p-2"
                    placeholder="例：胸, 腕, 脚"
                />    
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                登録
            </button>    
        </form>
    );
};

export default ExerciseForm;