import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MapPin, Search } from "lucide-react";

interface SearchLocationProps {
  onSearch: (city: string) => void;
  onUseCurrentLocation: () => void;
  className?: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchLocation = ({
  onSearch,
  onUseCurrentLocation,
  className,
  searchTerm,
  setSearchTerm,
}: SearchLocationProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4"
          />
        </div>
        <Button type="submit" size="sm">
          Search
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onUseCurrentLocation}
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default SearchLocation;
