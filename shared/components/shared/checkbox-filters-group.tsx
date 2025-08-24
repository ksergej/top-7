'use client';

import React from 'react';
import {useSet} from 'react-use';

import {FilterCheckbox, FilterChecboxProps} from './filter-checkbox';
import {Input} from '../ui/input';
import {Skeleton} from "@/shared/components/ui";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  className?: string;
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
                                                        title,
                                                        items,
                                                        defaultItems,
                                                        limit = 5,
                                                        searchInputPlaceholder = 'Поиск...',
                                                        className,
                                                        loading,
                                                        onClickCheckbox,
                                                        selected,
                                                        name,
                                                        defaultValue,
                                                      }) => {

  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const list = showAll
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    : (defaultItems || items).slice(0, limit);

  // 6.08.26
  if (loading) {
    return <div className={className}>
      <p className={"font-bold mb-3 "}>{title}</p>

      {...Array(5).fill(0).map((_, i) => (
        <Skeleton className={"h-6 mb-5 rounded-[8px]"} key={i}/>
      ))}
      <Skeleton className={"w-28 mb-5 rounded-[8px]"}/>
    </div>;
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"/>
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
