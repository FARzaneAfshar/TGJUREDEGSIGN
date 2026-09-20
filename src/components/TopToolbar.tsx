import {
  LayoutGrid,
  Bell,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ShieldHalf,
  RefreshCw,
  Upload,
  Copy,
  Plus,
} from 'lucide-react';
import IconButton from './IconButton';

/**
 * Recreates the Figma "Header" frame: a slim browser-chrome-style toolbar that
 * frames the dashboard. Non-essential clusters collapse on smaller screens so
 * the toolbar keeps its purpose (navigation + quick actions) without crowding
 * the viewport.
 */
export default function TopToolbar() {
  return (
    // dir="ltr": this toolbar mimics OS/browser chrome, which conventionally
    // stays left-to-right regardless of the page's own reading direction —
    // matching the fixed left→right icon order from the Figma frame.
    <div
      dir="ltr"
      className="hidden h-[89px] w-full items-center gap-3 border-b border-[#f2f2f2] bg-white px-4 sm:flex lg:px-9"
    >

      {/* Left icon cluster */}
      <div className="flex shrink-0 items-center gap-3">
        <IconButton label="منوی برنامه‌ها">
          <LayoutGrid className="size-5" strokeWidth={2} />
        </IconButton>
        <IconButton label="اعلان‌ها" className="relative">
          <Bell className="size-5" strokeWidth={2} />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-market-negative" />
        </IconButton>
        <IconButton label="تنظیمات" className="hidden md:inline-flex">
          <Settings className="size-5" strokeWidth={2} />
        </IconButton>
        <IconButton label="امنیت حساب" className="hidden md:inline-flex">
          <ShieldCheck className="size-5" strokeWidth={2} />
        </IconButton>
      </div>

      {/* Navigation arrows */}
      <div className="hidden shrink-0 items-center gap-1 md:flex">
        <IconButton label="صفحه قبل">
          <ChevronRight className="size-5" strokeWidth={2} />
        </IconButton>
        <IconButton label="صفحه بعد">
          <ChevronLeft className="size-5" strokeWidth={2} />
        </IconButton>
      </div>

      <ShieldHalf className="hidden size-5 shrink-0 text-gray-500 lg:block" strokeWidth={1.75} />

      {/* Address / search bar */}
      <div className="flex h-[38px] flex-1 items-center rounded-xl bg-surface-searchbar px-4">
        <span className="truncate text-caption text-gray-500">داشبورد بازار</span>
      </div>

      {/* Right icon cluster */}
      <div className="flex shrink-0 items-center gap-1">
        <IconButton label="بروزرسانی">
          <RefreshCw className="size-[18px]" strokeWidth={2} />
        </IconButton>
        <IconButton label="آپلود" className="hidden lg:inline-flex">
          <Upload className="size-[18px]" strokeWidth={2} />
        </IconButton>
        <IconButton label="کپی لینک" className="hidden lg:inline-flex">
          <Copy className="size-[18px]" strokeWidth={2} />
        </IconButton>
        <IconButton label="افزودن ویجت" className="hidden sm:inline-flex">
          <Plus className="size-[18px]" strokeWidth={2} />
        </IconButton>
      </div>
    </div>
  );
}
