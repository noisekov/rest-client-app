import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MAP_LANGUAGES } from '@/utils/constants';

type SelectLanguageProps = {
  language?: string;
  onLanguageChange: (language: string) => void;
};

export function SelectLanguage({
  language,
  onLanguageChange,
}: SelectLanguageProps) {
  return (
    <Select
      key={crypto.randomUUID()}
      onValueChange={onLanguageChange}
      value={language}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(MAP_LANGUAGES).map(([key, code]) => {
          return (
            <SelectItem key={crypto.randomUUID()} value={code}>
              {key}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default SelectLanguage;
