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
  const [salesPerUser, setSalesPerUser] = useState<{ username: string; sold: number }[]>([]);

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

    fetch('/api/stats/sales-per-user')
      .then(res => res.json())
      .then(setSalesPerUser);
  }, []);

  return (
    <section id="stats" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto py-10 space-y-12">
        <div>
            <h2 className="text-2xl font-bold mb-4">Tickets verkauft über die Zeit</h2>
            <Line
            data={{
                labels: salesOverTime.map(d => 
                  // Only show the date part (assumes ISO string, e.g. "2024-06-01T12:00:00Z")
                  d.date.split('T')[0]
                ),
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
              x: { title: { display: true, text: 'Uhrzeit' } },
              y: { title: { display: true, text: 'Eintritte' }, beginAtZero: true },
            },
          }}
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Tickets verkauft pro Benutzer</h2>
        <Bar
          data={{
            labels: salesPerUser.map(d => d.username),
            datasets: [
              {
                label: 'Tickets verkauft',
                data: salesPerUser.map(d => d.sold),
                backgroundColor: salesPerUser.map((_, idx) =>
                  idx === 0 ? '#f59e42' : '#6366f1' // Highlight top seller
                ),
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `Tickets verkauft: ${context.parsed.y}`;
                  }
                }
              }
            },
            scales: {
              x: { title: { display: true, text: 'Benutzer' } },
              y: { title: { display: true, text: 'Tickets verkauft' }, beginAtZero: true },
            },
          }}
        />
        {salesPerUser.length > 0 && (
          <div className="mt-2 text-center font-semibold text-orange-500">
            🏆 Top Verkäufer: {salesPerUser[0].username} ({salesPerUser[0].sold} Tickets)
          </div>
        )}
      </div>
        </div>
    </section>
  );
};

export default StatsDashboard;
