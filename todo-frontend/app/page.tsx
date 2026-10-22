'use client';

import { useState, useEffect } from 'react';

type Task = {
  id: number;
  title: string;
  description: string | null;
  status: boolean;
  created_at: string;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // State cho chế độ sửa
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost:5000/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Lỗi fetch:', err));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề!');
      return;
    }
    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })
      .then((res) => res.json())
      .then(() => {
        setTitle('');
        setDescription('');
        fetchTasks();
      })
      .catch((err) => console.error('Lỗi tạo task:', err));
  };

  const handleToggleStatus = (task: Task) => {
    fetch(`http://localhost:5000/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: !task.status }),
    })
      .then((res) => res.json())
      .then(() => fetchTasks())
      .catch((err) => console.error('Lỗi cập nhật:', err));
  };

  const handleDelete = (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa công việc này?')) return;
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => fetchTasks())
      .catch((err) => console.error('Lỗi xóa:', err));
  };

  // Bật chế độ sửa
  const handleStartEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  // Hủy sửa
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
  };

  // Lưu sửa
  const handleSaveEdit = (id: number) => {
    if (!editTitle.trim()) {
      alert('Vui lòng nhập tiêu đề!');
      return;
    }
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editTitle,
        description: editDescription,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        handleCancelEdit();
        fetchTasks();
      })
      .catch((err) => console.error('Lỗi sửa:', err));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-green-600 text-white text-center py-5">
        <h1 className="text-2xl font-bold">Quản lý Công việc</h1>
      </header>

      <nav className="bg-orange-500 text-white text-center py-2 font-medium">
        Danh sách công việc
      </nav>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="bg-blue-600 text-white md:w-64 p-5">
          <h2 className="text-lg font-semibold mb-3">Thêm công việc mới</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Nhập tiêu đề công việc..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded px-3 py-2 bg-white text-gray-800 border border-blue-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <input
              type="text"
              placeholder="Nhập mô tả (không bắt buộc)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded px-3 py-2 bg-white text-gray-800 border border-blue-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 font-semibold px-4 py-2 rounded w-full hover:bg-blue-50"
            >
              Thêm
            </button>
          </form>
        </aside>

        <section className="flex-1 bg-sky-50 p-5">
          {tasks.length === 0 ? (
            <p className="text-gray-500">Chưa có công việc nào.</p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-white p-4 rounded shadow flex items-start gap-3"
                >
                  <input
                    type="checkbox"
                    checked={task.status}
                    onChange={() => handleToggleStatus(task)}
                    className="mt-1 w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1">
                    {editingId === task.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Mô tả..."
                          className="w-full border border-gray-300 rounded px-2 py-1"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(task.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-400 text-white px-3 py-1 rounded text-sm hover:bg-gray-500"
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3
                          className={`font-semibold text-lg ${
                            task.status ? 'line-through text-red-400' : 'text-gray-700'
                          }`}
                        >
                          {task.title}
                        </h3>
                        {task.description && (
                          <p
                            className={`text-sm mt-1 ${
                              task.status ? 'line-through text-red-400' : 'text-gray-600'
                            }`}
                          >
                            {task.description}
                          </p>
                        )}
                        <p className="text-gray-400 text-xs mt-2">
                          {new Date(task.created_at).toLocaleDateString('vi-VN')}
                        </p>
                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() => handleStartEdit(task)}
                            className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          >
                            Xóa
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <footer className="bg-slate-700 text-white text-center py-4 text-sm">
        Footer
      </footer>
    </div>
  );
}