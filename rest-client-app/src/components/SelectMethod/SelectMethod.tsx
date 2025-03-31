import { Methods } from '@/types/restAPI';
import { selectClasses } from './classes';
import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectMethodProps = {
  method: Methods;
  onMethodChange: (method: Methods) => void;
}

export function SelectMethod({ method, onMethodChange }: SelectMethodProps) {
  const t = useTranslations('Restful');

  return (
    <Select onValueChange={onMethodChange} defaultValue={method}>
      <SelectTrigger className={`${selectClasses[method]} w-[180px] mb-2`}>
        <SelectValue placeholder={t('select_method')} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className={`${selectClasses[method]}`}>
          <SelectLabel>{t('methods_label')}</SelectLabel>
          {Object.values(Methods).map((method) => {
            return (
              <SelectItem
                key={method}
                className={selectClasses[method]}
                value={method}
              >
                {method}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
