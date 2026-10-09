import React, { useState } from 'react';
import { LifeOSProvider, useLifeOS } from './context/LifeOSContext';
import { HeaderBanner } from './components/layout/HeaderBanner';
import { LifePlannerView } from './components/life-planner/LifePlannerView';
import { FinanceOSView } from './components/finance-os/FinanceOSView';
import { ContactsView } from './components/contacts/ContactsView';
import { SubscriptionTrackerView } from './components/subscriptions/SubscriptionTrackerView';
import { AssetsTrackerView } from './components/assets/AssetsTrackerView';
import { SimpleFinanceView } from './components/simple-finance/SimpleFinanceView';
import { DoctorConsultationView } from './components/doctor-consultation/DoctorConsultationView';
import { HouseholdTrackerView } from './components/household/HouseholdTrackerView';
import { WishlistView } from './components/wishlist/WishlistView';
import { GroceryListView } from './components/grocery/GroceryListView';
import { BudgetTrackerView } from './components/budget-tracker/BudgetTrackerView';
import { WeightTrackerView } from './components/weight-tracker/WeightTrackerView';
import { HabitTrackerView } from './components/habit-tracker/HabitTrackerView';
import { NotesView } from './components/notes/NotesView';
import { JournalView } from './components/journal/JournalView';
import { ActionModals } from './components/modals/ActionModals';
import { QuickActions } from './components/life-planner/QuickActions';
import { BudgetsWidget } from './components/life-planner/BudgetsWidget';
import {
  Sun,
  Wallet,
  Users,
  Repeat,
  Landmark,
  DollarSign,
  Stethoscope,
  Home,
  Gift,
  ShoppingCart,
  PieChart,
  Scale,
  Flame,
  FileText,
  BookMarked,
  Plus,
  X,
  CheckSquare,
  Target,
  BookOpen,
  ArrowRightLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    workspace,
    setWorkspace,
    openModal,
    contacts,
    subscriptions,
    assets,
    consultations,
    transactions,
    householdItems,
    wishlist,
    groceryList,
    lifeCanvasBudgets,
    weightLogs,
    habits,
    notes,
    detailedJournals,
  } = useLifeOS();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showFabMenu, setShowFabMenu] = useState(false);

  const workspaceOptions = [
    { id: 'life-planner', label: 'Life Planner', icon: Sun },
    { id: 'finance-os', label: 'Finance OS', icon: Wallet },
    { id: 'simple-finance', label: 'Simple Finance', icon: DollarSign, count: transactions.length },
    { id: 'budget-tracker', label: 'Budget Tracker', icon: PieChart, count: lifeCanvasBudgets.length },
    { id: 'weight-tracker', label: 'Weight Tracker', icon: Scale, count: weightLogs.length },
    { id: 'habit-tracker', label: 'Habit Tracker', icon: Flame, count: habits.filter((h) => !h.completedToday).length },
    { id: 'notes', label: 'Notes by LifeCanvas', icon: FileText, count: notes.length },
    { id: 'journal', label: 'Journal by LifeCanvas', icon: BookMarked, count: detailedJournals.length },
    { id: 'doctor-consultation', label: 'Konsultasi Dokter', icon: Stethoscope, count: consultations.length },
    { id: 'household-items', label: 'Household Items', icon: Home, count: householdItems.length },
    { id: 'wishlist', label: 'Wishlist Tracker', icon: Gift, count: wishlist.length },
    { id: 'grocery-list', label: 'Grocery List', icon: ShoppingCart, count: groceryList.filter((i) => i.status === 'Need to Buy').length },
    { id: 'contacts', label: 'Kontak', icon: Users, count: contacts.length },
    { id: 'subscriptions', label: 'Subscriptions', icon: Repeat, count: subscriptions.length },
    { id: 'assets', label: 'Assets Tracker', icon: Landmark, count: assets.length },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col font-sans-body relative text-[#2F3437]">
      {/* Top Banner & Header */}
      <HeaderBanner
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {workspace === 'life-planner' && <LifePlannerView />}
        {workspace === 'finance-os' && <FinanceOSView />}
        {workspace === 'simple-finance' && <SimpleFinanceView />}
        {workspace === 'budget-tracker' && <BudgetTrackerView />}
        {workspace === 'weight-tracker' && <WeightTrackerView />}
        {workspace === 'habit-tracker' && <HabitTrackerView />}
        {workspace === 'notes' && <NotesView />}
        {workspace === 'journal' && <JournalView />}
        {workspace === 'doctor-consultation' && <DoctorConsultationView />}
        {workspace === 'household-items' && <HouseholdTrackerView />}
        {workspace === 'wishlist' && <WishlistView />}
        {workspace === 'grocery-list' && <GroceryListView />}
        {workspace === 'contacts' && <ContactsView />}
        {workspace === 'subscriptions' && <SubscriptionTrackerView />}
        {workspace === 'assets' && <AssetsTrackerView />}
      </main>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-5 overflow-y-auto space-y-5 flex flex-col z-10">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  {workspace === 'life-planner' && <Sun className="w-4 h-4" />}
                  {workspace === 'finance-os' && <Wallet className="w-4 h-4" />}
                  {workspace === 'simple-finance' && <DollarSign className="w-4 h-4" />}
                  {workspace === 'budget-tracker' && <PieChart className="w-4 h-4" />}
                  {workspace === 'weight-tracker' && <Scale className="w-4 h-4" />}
                  {workspace === 'habit-tracker' && <Flame className="w-4 h-4" />}
                  {workspace === 'notes' && <FileText className="w-4 h-4" />}
                  {workspace === 'journal' && <BookMarked className="w-4 h-4" />}
                  {workspace === 'doctor-consultation' && <Stethoscope className="w-4 h-4" />}
                  {workspace === 'household-items' && <Home className="w-4 h-4" />}
                  {workspace === 'wishlist' && <Gift className="w-4 h-4" />}
                  {workspace === 'grocery-list' && <ShoppingCart className="w-4 h-4" />}
                  {workspace === 'contacts' && <Users className="w-4 h-4" />}
                  {workspace === 'subscriptions' && <Repeat className="w-4 h-4" />}
                  {workspace === 'assets' && <Landmark className="w-4 h-4" />}
                </div>
                <span className="font-serif-title text-xl font-normal text-neutral-900">
                  LifeCanvas OS
                </span>
              </div>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Template Switcher List */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-1">
                Workspaces & Modules
              </span>
              <div className="space-y-1 pt-1">
                {workspaceOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isActive = workspace === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setWorkspace(opt.id as any);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-neutral-900 text-white shadow-xs'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{opt.label}</span>
                      </div>
                      {opt.count !== undefined && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-sm ${isActive ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'}`}>
                          {opt.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {workspace === 'life-planner' && (
              <>
                <QuickActions />
                <div className="pt-2 border-t border-neutral-100">
                  <BudgetsWidget />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Button for Mobile */}
      <div className="fixed right-4 bottom-5 z-40 sm:hidden">
        {showFabMenu ? (
          <div className="mb-2 p-2 bg-white rounded-xl shadow-xl border border-neutral-200/80 space-y-1 animate-in fade-in slide-in-from-bottom-3 duration-150">
            <button
              onClick={() => {
                openModal('task');
                setShowFabMenu(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 rounded-md text-left"
            >
              <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>New Task</span>
            </button>
            <button
              onClick={() => {
                openModal('expense');
                setShowFabMenu(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 rounded-md text-left"
            >
              <DollarSign className="w-3.5 h-3.5 text-rose-600" />
              <span>New Expense</span>
            </button>
            <button
              onClick={() => {
                openModal('income');
                setShowFabMenu(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 rounded-md text-left"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>New Income</span>
            </button>
            <button
              onClick={() => {
                openModal('journal');
                setShowFabMenu(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 rounded-md text-left"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>New Journal</span>
            </button>
          </div>
        ) : null}

        <button
          onClick={() => setShowFabMenu(!showFabMenu)}
          className="w-12 h-12 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          title="Quick Add"
          aria-label="Quick Add Menu"
        >
          {showFabMenu ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </button>
      </div>

      {/* Footer matching Screenshot 2 */}
      <footer className="w-full py-8 border-t border-neutral-200/70 bg-[#FBFBFA] text-center text-xs text-neutral-400 select-none">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © 2026 Lifecanvas. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-neutral-500">
            <span>Clean Notion Architecture</span>
            <span>·</span>
            <span>Responsive Grid</span>
            <span>·</span>
            <span>Client-side Storage</span>
          </div>
        </div>
      </footer>

      {/* Action Modals */}
      <ActionModals />
    </div>
  );
};

export default function App() {
  return (
    <LifeOSProvider>
      <AppContent />
    </LifeOSProvider>
  );
}
