import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Header } from '@/types/restAPI';

interface HeadersListProps {
  headers: Header[];
  onAddHeader: () => void;
  onUpdateHeader: (id: string, field: keyof Header, value: string) => void;
  onRemoveHeader: (id: string) => void;
}

export function HeadersList({
  headers,
  onAddHeader,
  onUpdateHeader,
  onRemoveHeader,
}: HeadersListProps) {
  const t = useTranslations('Restful');

  return (
    <fieldset className="border p-4 rounded">
      <legend className="px-2 font-medium">{t('headers')}</legend>
      <Button
        onClick={onAddHeader}
        type="button"
        className="cursor-pointer mb-2"
      >
        {t('add_header')}
      </Button>
      <div
        className="grid grid-cols-2 gap-2 mb-2 font-medium"
        style={{ gridTemplateColumns: '1fr 1fr 100px' }}
      >
        <Label>{t('key')}</Label>
        <Label>{t('value')}</Label>
      </div>
      {headers.map((header) => (
        <div
          key={header.id}
          className="grid gap-2 mb-2"
          style={{ gridTemplateColumns: '1fr 1fr 100px' }}
        >
          <Input
            type="text"
            value={header.key}
            placeholder={t('key')}
            onChange={(e) => onUpdateHeader(header.id, 'key', e.target.value)}
          />
          <Input
            type="text"
            value={header.value}
            onChange={(e) => onUpdateHeader(header.id, 'value', e.target.value)}
            placeholder={t('value')}
          />
          <Button
            variant="destructive"
            onClick={() => onRemoveHeader(header.id)}
            type="button"
            className="cursor-pointer"
          >
            {t('remove')}
          </Button>
        </div>
      ))}
    </fieldset>
  );
}
