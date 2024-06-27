import { useState } from 'react';
import { Dropdown, DropdownButton, DropdownMenu, DropdownItem } from './dropdown';

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
type Tab = {
  name: string;
  id: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs({
  tabs,
  selectedTab,
  setSelectedTab,
}: {
  tabs: Tab[];
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
}) {
  const handleTabSelect = (tab: Tab) => {
    setSelectedTab(tab);
  };
  return (
    <div>
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <Dropdown>
          <DropdownButton
            as='button'
            className='block mx-auto px-4 py-1 bg-gray-900 rounded-md border border-gray-300 focus:border-bright-yellow focus:ring-bright-yellow'
          >
            {selectedTab.name}
          </DropdownButton>
          <DropdownMenu className='w-full bg-white dark:bg-gray-900 rounded-md shadow-lg mt-2'>
            {tabs.map((tab) => (
              <DropdownItem key={tab.id} onClick={() => handleTabSelect(tab)}>
                {tab.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className='hidden sm:block'>
        <nav className='flex space-x-2' aria-label='Tabs'>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setSelectedTab(tab)}
              type='button'
              id={tab.id}
              className={classNames(
                tab.id === selectedTab.id
                  ? 'bg-bright-yellow text-dark-purple'
                  : 'text-gray-50 hover:bg-bright-yellow hover:text-indigo-700',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
              aria-current={tab.id === selectedTab.id ? 'page' : undefined}
            >
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
