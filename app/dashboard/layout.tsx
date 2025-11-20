export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Bibliotech</h2>

        <nav className="space-y-4">
          <a href="/dashboard" className="block text-gray-700 hover:text-teal-600">🏠 Início</a>
          <a href="/dashboard/livros" className="block text-gray-700 hover:text-teal-600">📚 Livros</a>
          <a href="/dashboard/usuarios" className="block text-gray-700 hover:text-teal-600">👤 Usuários</a>
          <a href="/dashboard/emprestimos" className="block text-gray-700 hover:text-teal-600">🔄 Empréstimos</a>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
