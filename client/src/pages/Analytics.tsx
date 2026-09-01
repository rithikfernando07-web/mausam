import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts'

const INTEREST_DATA = [
  { name: 'Fitness', count: 342, fill: '#38bdf8' },
  { name: 'Travel', count: 298, fill: '#06b6d4' },
  { name: 'Commuting', count: 267, fill: '#14b8a6' },
  { name: 'Health', count: 234, fill: '#a3e635' },
  { name: 'Outdoor', count: 189, fill: '#fbbf24' },
  { name: 'Agriculture', count: 156, fill: '#34d399' },
  { name: 'Photography', count: 123, fill: '#a78bfa' },
  { name: 'Sports', count: 112, fill: '#f472b6' },
  { name: 'Education', count: 89, fill: '#fb923c' },
  { name: 'General', count: 78, fill: '#94a3b8' },
]

const CARD_VIEWS = [
  { name: 'Current Weather', views: 1247 },
  { name: 'Hourly Forecast', views: 1032 },
  { name: 'AQI', views: 876 },
  { name: 'Rain Forecast', views: 823 },
  { name: 'Daily Forecast', views: 756 },
  { name: 'UV Index', views: 654 },
  { name: 'Activity Rec.', views: 543 },
  { name: 'Wind', views: 432 },
]

const ENGAGEMENT_DATA = [
  { day: 'Mon', opens: 423, alerts: 89 },
  { day: 'Tue', opens: 478, alerts: 67 },
  { day: 'Wed', opens: 512, alerts: 123 },
  { day: 'Thu', opens: 456, alerts: 45 },
  { day: 'Fri', opens: 534, alerts: 78 },
  { day: 'Sat', opens: 398, alerts: 34 },
  { day: 'Sun', opens: 367, alerts: 56 },
]

const PIE_COLORS = ['#38bdf8', '#06b6d4', '#14b8a6', '#fbbf24', '#a78bfa']

const ALERT_DATA = [
  { type: 'Rain', count: 456 },
  { type: 'Heat', count: 234 },
  { type: 'AQI', count: 189 },
  { type: 'Cyclone', count: 34 },
  { type: 'Wind', count: 123 },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-white text-2xl mb-1">Analytics Dashboard</h1>
        <p className="text-slate-400 text-sm">Mausam platform metrics (simulated demo data)</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Users', value: '1,888', change: '+12%', emoji: '👥' },
          { label: 'Active Users', value: '1,247', change: '+8%', emoji: '📱' },
          { label: 'Personalization Score', value: '87%', change: '+5%', emoji: '🎯' },
          { label: 'Notification Opt-in', value: '73%', change: '+3%', emoji: '🔔' },
        ].map(({ label, value, change, emoji }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4"
          >
            <div className="text-xl mb-2">{emoji}</div>
            <div className="font-display font-bold text-white text-2xl">{value}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-slate-400 text-xs">{label}</span>
              <span className="text-green-400 text-xs">{change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interest Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4"
      >
        <h3 className="text-white font-semibold text-sm mb-4">Most Selected Interests</h3>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={INTEREST_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#0f2744', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {INTEREST_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Card Views + Alert Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4"
        >
          <h3 className="text-white font-semibold text-sm mb-4">Most Viewed Cards</h3>
          <div className="space-y-2">
            {CARD_VIEWS.map((card, i) => {
              const percent = (card.views / CARD_VIEWS[0].views) * 100
              return (
                <div key={card.name} className="flex items-center gap-3">
                  <span className="text-slate-500 text-xs w-4">{i + 1}</span>
                  <span className="text-slate-300 text-xs w-28 truncate">{card.name}</span>
                  <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-ocean-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                    />
                  </div>
                  <span className="text-white text-xs font-medium w-10 text-right">{card.views}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-4"
        >
          <h3 className="text-white font-semibold text-sm mb-4">Alert Distribution</h3>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ALERT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="count"
                  nameKey="type"
                  label={({ type }) => type}
                >
                  {ALERT_DATA.map((_entry, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#0f2744', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Engagement trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-4"
      >
        <h3 className="text-white font-semibold text-sm mb-4">Weekly Engagement</h3>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ENGAGEMENT_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#0f2744', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0', fontSize: 12 }}
              />
              <Line type="monotone" dataKey="opens" stroke="#38bdf8" strokeWidth={2} dot={{ fill: '#38bdf8', r: 3 }} name="App Opens" />
              <Line type="monotone" dataKey="alerts" stroke="#fbbf24" strokeWidth={2} dot={{ fill: '#fbbf24', r: 3 }} name="Alert Taps" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
