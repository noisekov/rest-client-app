'use client';

import { useState } from 'react';
import { Methods } from './types';
import { selectClasses } from './classes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SelectMethod() {
  const [method, setMethod] = useState<Methods>(Methods.GET);

  const onChange = (value: Methods) => {
    setMethod(value);
  };

  return (
    <Select onValueChange={onChange} defaultValue={method}>
      <SelectTrigger className={`${selectClasses[method]} w-[180px]`}>
        <SelectValue placeholder="Select a method" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className={`${selectClasses[method]}`}>
          <SelectLabel>METHODS</SelectLabel>
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
