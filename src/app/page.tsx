import ExerciseForm from "@/components/ExerciseForm"
import ExerciseList from '@/components/ExerciseList';
import WeightForm from "@/components/WeightForm";
import WeightChart from "@/components/WeightChart";
import Menubar from "@/components/Menubar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Menubar />
      <main className="p-8">
        <h1 className="text-4xl font-bold mb-4">🏋️ Gainventory</h1>
        <div className="max-w-3xl mx-auto space-y-8">
          <section>
            <ExerciseForm />
          </section>

          <section>
            <WeightForm />
          </section>
          
          <section>
            <WeightChart />
          </section>

          <section>
            <ExerciseList />
          </section>
        </div>
      </main>
    </div>
  )
}