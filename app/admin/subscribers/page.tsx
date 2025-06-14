//file:app/admin/subscribers/page.tsx
"use client";

import { useState } from 'react';

interface Subscriber {
  email: string;
  subscribed_at: string;
  source: string;
}

interface SubscriberData {
  total: number;
  subscribers: Subscriber[];
}

export default function AdminSubscribers() {
  const [data, setData] = useState<SubscriberData | null>(null);
  const [loading, setLoading] = useState(false);
  const [adminSecret, setAdminSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const fetchSubscribers = async () => {
    if (!adminSecret) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/export-subscribers?format=json', {
        headers: {
          'Authorization': `Bearer ${adminSecret}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscribers');
      }

      const result = await response.json();
      setData(result);
      setAuthenticated(true);
    } catch (error) {
      alert('Failed to fetch subscribers. Check your admin secret.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = async () => {
    if (!adminSecret) return;
    
    try {
      const response = await fetch('/api/export-subscribers?format=csv', {
        headers: {
          'Authorization': `Bearer ${adminSecret}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to download CSV');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'maintenance-subscribers.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Failed to download CSV');
      console.error('Error:', error);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Access
          </h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Admin Secret"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={fetchSubscribers}
              disabled={loading || !adminSecret}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              {loading ? 'Loading...' : 'Access Dashboard'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Email Subscribers
            </h1>
            <div className="flex gap-4">
              <button
                onClick={fetchSubscribers}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
              <button
                onClick={downloadCSV}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Download CSV
              </button>
            </div>
          </div>
          
          {data && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-blue-900">
                Total Subscribers: {data.total}
              </h2>
            </div>
          )}
        </div>

        {data && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subscribed Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.subscribers.map((subscriber, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(subscriber.subscribed_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subscriber.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}