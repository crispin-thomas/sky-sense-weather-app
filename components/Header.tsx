"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, RefreshCw, Sun, Moon, Loader2 } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  handleLocationRequest: () => void;
  handleRefresh: () => void;
  isLoading: boolean;
}

const Header = ({
  isDark,
  setIsDark,
  searchQuery,
  setSearchQuery,
  handleSearch,
  handleLocationRequest,
  handleRefresh,
  isLoading,
}: HeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      <div className="flex items-center gap-4">
        <h1 className={`text-3xl font-bold drop-shadow-lg ${isDark ? "text-white" : "text-white"}`}>
          Weather Dashboard
        </h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className={`${isDark ? "text-white hover:bg-white/10" : "text-white hover:bg-white/20"} rounded-full`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${isDark ? "bg-white/10 border-white/20 text-white placeholder:text-white/60" : "bg-white/20 border-white/30 text-white placeholder:text-white/70"} backdrop-blur-sm`}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className={`${isDark ? "text-white hover:bg-white/10" : "text-white hover:bg-white/20"}`}
          >
            <Search className="w-4 h-4" />
          </Button>
        </form>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleLocationRequest}
          className={`${isDark ? "text-white hover:bg-white/10" : "text-white hover:bg-white/20"}`}
        >
          <MapPin className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          disabled={isLoading}
          className={`${isDark ? "text-white hover:bg-white/10" : "text-white hover:bg-white/20"}`}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};

export default Header;
