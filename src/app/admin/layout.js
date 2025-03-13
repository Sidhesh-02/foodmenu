export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-medium mb-4">Admin Panel</h1>
        {children}
      </div>
    </div>
  );
}
