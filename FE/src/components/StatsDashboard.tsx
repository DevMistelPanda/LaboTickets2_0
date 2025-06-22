import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatsDashboard = () => {
  const [salesOverTime, setSalesOverTime] = useState<{ date: string; sold: number }[]>([]);
  const [salesPerClass, setSalesPerClass] = useState<{ class_number: string; sold: number }[]>([]);
  const [enteredOverTime, setEnteredOverTime] = useState<{ hour: string; entered: number }[]>([]);

  useEffect(() => {
    fetch('/api/stats/sales-over-time')
      .then(res => res.json())
      .then(setSalesOverTime);

    fetch('/api/stats/sales-per-class')
      .then(res => res.json())
      .then(setSalesPerClass);

    fetch('/api/stats/entered-over-time')
      .then(res => res.json())
      .then(setEnteredOverTime);
  }, []);

  return (
    <section id="stats" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto py-10 space-y-12">
        <div>
            <h2 className="text-2xl font-bold mb-4">Tickets verkauft über die Zeit</h2>
            <Line
            data={{
                labels: salesOverTime.map(d => d.date),
                datasets: [
                {
                    label: 'Tickets verkauft',
                    data: salesOverTime.map(d => d.sold),
                    fill: false,
                    borderColor: '#7c3aed',
                    backgroundColor: '#a78bfa',
                    tension: 0.2,
                },
                ],
            }}
            options={{
                responsive: true,
                plugins: {
                legend: { display: true },
                title: { display: false },
                },
            }}
            />
        </div>
        <div>
            <h2 className="text-2xl font-bold mb-4">Tickets verkauft pro Klasse</h2>
            <Bar
            data={{
                labels: salesPerClass.map(d => d.class_number),
                datasets: [
                {
                    label: 'Tickets verkauft',
                    data: salesPerClass.map(d => d.sold),
                    backgroundColor: '#7c3aed',
                },
                ],
            }}
            options={{
                responsive: true,
                plugins: {
                legend: { display: false },
                title: { display: false },
                },
                scales: {
                x: { title: { display: true, text: 'Klasse' } },
                y: { title: { display: true, text: 'Tickets verkauft' }, beginAtZero: true },
                },
            }}
            />
        </div>
        <div>
        <h2 className="text-2xl font-bold mb-4">Eintritte nach Uhrzeit</h2>
        <Bar
          data={{
            labels: enteredOverTime.map(d => `${d.hour}:00`),
            datasets: [
              {
                label: 'Eintritte',
                data: enteredOverTime.map(d => d.entered),
                backgroundColor: '#10b981',
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false },
            },
            scales: {
              x: { title: { display: true, text: 'Uhrzeit' } },
              y: { title: { display: true, text: 'Eintritte' }, beginAtZero: true },
            },
          }}
        />
      </div>
        </div>
    </section>
  );
};

export default StatsDashboard;
