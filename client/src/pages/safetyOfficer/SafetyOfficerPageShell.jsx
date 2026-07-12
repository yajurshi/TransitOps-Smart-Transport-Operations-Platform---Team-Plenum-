import { Link } from 'react-router-dom';
import { RolePageLayout } from '../../components/RolePageLayout';

const badgeStyles = {
  low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  high: 'bg-rose-50 text-rose-700 border-rose-200',
  cleared: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  review: 'bg-amber-50 text-amber-700 border-amber-200',
  standby: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700',
  open: 'bg-rose-50 text-rose-700 border-rose-200',
  'in progress': 'bg-amber-50 text-amber-700 border-amber-200',
  closed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  delayed: 'bg-orange-50 text-orange-700 border-orange-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'on trip': 'bg-blue-50 text-blue-700 border-blue-200',
};

const getBadgeClass = (value) => badgeStyles[String(value).toLowerCase()] || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700';

export const SectionCard = ({ title, subtitle, children, actions }) => (
  <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm p-6">
    {(title || subtitle || actions) && (
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          {title && <h2 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h2>}
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {actions}
      </div>
    )}
    {children}
  </section>
);

export const Badge = ({ value }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${getBadgeClass(value)}`}>
    {value}
  </span>
);

export const StatGrid = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    {items.map((item) => (
      <div key={item.label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-semibold">{item.label}</p>
        <div className="mt-3 text-3xl font-bold text-slate-800 dark:text-white">{item.value}</div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">{item.note}</p>
      </div>
    ))}
  </div>
);

export const TableCard = ({ rows, columns, rowLinkPrefix }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50 dark:bg-slate-900">
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200 bg-white dark:bg-slate-800">
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700 dark:bg-slate-900/80 transition-colors">
            {columns.map((column) => (
              <td key={column.key} className="px-5 py-4 text-sm text-slate-700 dark:text-slate-200 align-top">
                {column.render ? column.render(row) : row[column.key]}
              </td>
            ))}
            {rowLinkPrefix && (
              <td className="px-5 py-4 text-right">
                <Link to={`${rowLinkPrefix}/${row.id}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View
                </Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const SafetyOfficerPageShell = ({ activeTab, title, subtitle, children, showSearch = false, searchPlaceholder }) => (
  <RolePageLayout activeTab={activeTab} title={title} subtitle={subtitle} showSearch={showSearch} searchPlaceholder={searchPlaceholder}>
    {children}
  </RolePageLayout>
);