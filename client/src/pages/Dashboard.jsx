import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  CheckCircle,
  Clock,
  ListTodo,
  X,
  Filter,
} from "lucide-react";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../features/tasks/taskApi";
import { logout } from "../features/auth/authSlice";

const categories = ["Work", "Personal", "Health"];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* UI STATE */
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const [showFilters, setShowFilters] = useState(false);

  const [statusFilter, setStatusFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  /* FETCH TASKS */
  const { data = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  /* MUTATIONS */
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      toast.success("Task added");
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted");
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  /* LOGOUT */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  /* ADD / EDIT */
  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editingTask) {
      updateMutation.mutate({
        _id: editingTask._id,
        title,
        description,
        category,
      });
    } else {
      createMutation.mutate({ title, description, category });
    }

    setShowModal(false);
    setEditingTask(null);
    setTitle("");
    setDescription("");
    setCategory("Work");
  };

  /* FILTERED TASKS */
  const filteredTasks = useMemo(() => {
    return data.filter((task) => {
      if (statusFilter === "completed" && !task.completed) return false;
      if (statusFilter === "pending" && task.completed) return false;

      const created = new Date(task.createdAt);
      if (monthFilter && created.getMonth() !== Number(monthFilter)) return false;
      if (yearFilter && created.getFullYear() !== Number(yearFilter)) return false;

      return true;
    });
  }, [data, statusFilter, monthFilter, yearFilter]);

  /* STATS */
  const total = data.length;
  const completed = data.filter((t) => t.completed).length;
  const pending = total - completed;

  /* YEARS */
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2024 }, (_, i) => 2025 + i);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a15] via-[#0f0f1a] to-[#1a0a1f] text-white p-3 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-4 md:mb-6"
        >
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
            >
              Welcome, {user?.name} 👋
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-xs sm:text-sm mt-1"
            >
              Manage your tasks efficiently
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 bg-linear-to-r from-purple-600 to-pink-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
            >
              <Plus size={16} className="sm:w-4 sm:h-4" /> 
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 text-red-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-red-500/30 transition-all"
            >
              <LogOut size={16} className="sm:w-4 sm:h-4" /> 
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
            
            <a href="/"><motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }} className="bg-linear-to-r from-purple-600 to-pink-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all">Home</motion.button></a>
          </motion.div>
        </motion.div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 md:mb-6">
          <StatCard 
            title="Total" 
            value={total} 
            icon={<ListTodo className="w-4 h-4 sm:w-5 sm:h-5" />} 
            delay={0.1}
            linear="from-blue-500/20 to-cyan-500/20"
            color="text-blue-400"
          />
          <StatCard 
            title="Done" 
            value={completed} 
            icon={<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />} 
            delay={0.2}
            linear="from-green-500/20 to-emerald-500/20"
            color="text-green-400"
          />
          <StatCard 
            title="Pending" 
            value={pending} 
            icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5" />} 
            delay={0.3}
            linear="from-orange-500/20 to-amber-500/20"
            color="text-orange-400"
          />
        </div>

        {/* FILTERS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-white/10 transition-all mb-3"
          >
            <Filter size={14} className="sm:w-4 sm:h-4" />
            <span>Filters</span>
            <motion.span
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-2 overflow-hidden"
              >
                <select 
                  onChange={(e) => setStatusFilter(e.target.value)} 
                  value={statusFilter}
                  className="backdrop-blur-sm border border-white/10 px-3  bg-[#1a0a1f] py-1.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>

                <select 
                  onChange={(e) => setMonthFilter(e.target.value)} 
                  value={monthFilter}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                >
                  <option value="" >All Months</option>
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i} className="bg-[#1a0a1f]">{m}</option>
                  ))}
                </select>

                <select 
                  onChange={(e) => setYearFilter(e.target.value)} 
                  value={yearFilter}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                >
                  <option value="">All Years</option>
                  {years.map((y) => <option key={y} className="bg-[#1a0a1f]">{y}</option>)}
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* TASKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {filteredTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-2 sm:space-y-3">
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task, index) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    index={index}
                    onEdit={() => {
                      setEditingTask(task);
                      setTitle(task.title);
                      setDescription(task.description || "");
                      setCategory(task.category);
                      setShowModal(true);
                    }}
                    onDelete={() => deleteMutation.mutate(task._id)}
                    onToggleComplete={() =>
                      updateMutation.mutate({ _id: task._id, completed: true })
                    }
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-linear-to-br from-[#1a1a2e] to-[#16162b] p-5 sm:p-6 md:p-8 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Background Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {editingTask ? "Edit Task" : "Create Task"}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowModal(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">Title</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter task title..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter task description..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:border-purple-500/50 transition-all resize-none placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base focus:outline-none focus:border-purple-500/50 transition-all"
                    >
                      {categories.map((c) => <option key={c} value={c} className="bg-black">{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit} 
                    className="bg-linear-to-r from-purple-600 to-pink-500 px-5 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-medium shadow-lg shadow-purple-500/30"
                  >
                    {editingTask ? "Update" : "Create"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;

/* ANIMATED BACKGROUND */
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg className="w-full h-full opacity-30">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.3 }} />
        </linearGradient>
      </defs>
      
      <motion.circle
        cx="10%"
        cy="20%"
        r="150"
        fill="url(#grad1)"
        initial={{ scale: 0.8, opacity: 0.2 }}
        animate={{ 
          scale: [0.8, 1.2, 0.8],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.circle
        cx="90%"
        cy="80%"
        r="200"
        fill="url(#grad1)"
        initial={{ scale: 1, opacity: 0.1 }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </svg>
  </div>
);

/* STAT CARD */
const StatCard = ({ title, value, icon, delay, linear, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className={`bg-linear-to-br ${linear} backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 shadow-lg hover:shadow-xl transition-all`}
  >
    <motion.div 
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
      className={`p-2 sm:p-2.5 bg-white/10 rounded-lg ${color}`}
    >
      {icon}
    </motion.div>
    <div className="text-center sm:text-left">
      <p className="text-gray-400 text-[10px] sm:text-xs">{title}</p>
      <motion.p 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, type: "spring" }}
        className="text-lg sm:text-xl md:text-2xl font-bold"
      >
        {value}
      </motion.p>
    </div>
  </motion.div>
);

/* TASK CARD */
const TaskCard = ({ task, index, onEdit, onDelete, onToggleComplete }) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20, scale: 0.9 }}
    transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
    whileHover={{ scale: 1.01 }}
    className={`bg-linear-to-r from-white/5 to-white/2 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 hover:border-purple-500/30 transition-all ${
      task.completed ? 'opacity-60' : ''
    }`}
  >
    <div className="flex items-start gap-3">
      {/* Checkbox */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-0.5"
      >
        <input
          type="checkbox"
          checked={task.completed}
          disabled={task.completed}
          onChange={onToggleComplete}
          className="w-4 h-4 sm:w-5 sm:h-5 accent-green-500 cursor-pointer disabled:cursor-not-allowed"
        />
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm sm:text-base font-medium mb-1 ${
          task.completed ? 'line-through text-gray-500' : 'text-white'
        }`}>
          {task.title}
        </h3>
        
        {task.description && (
          <p className="text-xs sm:text-sm text-gray-400 mb-2 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-gray-500">
          <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
            {task.category}
          </span>
          <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
          {task.completionDate && (
            <span>Done: {new Date(task.completionDate).toLocaleDateString()}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1.5 sm:gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={task.completed}
          onClick={onEdit}
          className="p-1.5 sm:p-2 hover:bg-purple-500/20 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Pencil size={14} className="sm:w-4 sm:h-4 text-purple-400" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onDelete}
          className="p-1.5 sm:p-2 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Trash2 size={14} className="sm:w-4 sm:h-4 text-red-400" />
        </motion.button>
      </div>
    </div>
  </motion.div>
);

/* EMPTY STATE */
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-12 sm:py-16"
  >
    <motion.div
      animate={{ 
        y: [0, -10, 0],
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <ListTodo size={48} className="sm:w-16 sm:h-16 mx-auto text-gray-600 mb-4" />
    </motion.div>
    <h3 className="text-base sm:text-lg font-medium text-gray-400 mb-2">No tasks found</h3>
    <p className="text-xs sm:text-sm text-gray-600">Create your first task to get started</p>
  </motion.div>
);

/* LOADING SKELETON */
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-linear-to-br from-[#0a0a15] via-[#0f0f1a] to-[#1a0a1f] p-4 sm:p-6 md:p-8">
    <div className="max-w-7xl mx-auto space-y-4">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            delay: i * 0.1 
          }}
          className="h-16 sm:h-20 bg-white/5 rounded-xl"
        />
      ))}
    </div>
  </div>
);